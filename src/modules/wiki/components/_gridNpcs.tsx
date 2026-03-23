import { Text } from '@components/Text';
import { FilterNpc, Npcs } from '@interfaces/npcs';
import { Items } from '@interfaces/items';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MagnifyingGlass } from 'phosphor-react';
import { assetItem, assetNpc } from '@utils/assets';

interface Props {
  npcs: Npcs;
  filter: FilterNpc;
  items?: Items;
}

const PAGE_SIZE = 16;

// ─── NpcSprite ───────────────────────────────────────────────────────────────
// Paperdoll spritesheet 4×4 — frame 0 (topo-esquerdo) = frente/parado

function NpcSprite({ sprite, name, size = 40 }: { sprite: string; name: string; size?: number }) {
  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(\${assetNpc(sprite)})`,
        backgroundPosition: '0 0',
        backgroundSize: `${4 * size}px ${4 * size}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function toNum(v: any, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getStats(stats: any) {
  return {
    atk: toNum(stats?.Attack),
    ap:  toNum(stats?.AbilityPower),
    def: toNum(stats?.Defense),
    mr:  toNum(stats?.MagicResist),
    spd: toNum(stats?.Speed),
  };
}

function getVitals(vitals: any) {
  return {
    hp: toNum(vitals?.Health),
    mp: toNum(vitals?.Mana),
  };
}

function formatSpawn(ms: number): string {
  if (ms <= 0) return '—';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
}

// ─── StatRow ────────────────────────────────────────────────────────────────

function StatRow({ label, value, color = 'text-slate-100' }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <Text className="text-xs text-slate-500">{label}</Text>
      <Text className={`text-xs font-semibold tabular-nums ${color}`}>{value}</Text>
    </div>
  );
}

// ─── NpcModal ───────────────────────────────────────────────────────────────

function NpcModal({
  npc,
  itemsById,
  onClose,
}: {
  npc: any;
  itemsById: Map<string, any>;
  onClose: () => void;
}) {
  const stats  = getStats(npc?.Stats);
  const vitals = getVitals(npc?.MaxVitals);
  const drops: any[] = Array.isArray(npc?.Drops) ? npc.Drops : [];
  const aggressive: boolean = npc?.Aggressive === true;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Enriquece drop com dados do item se disponível
  function resolveItem(drop: any) {
    // Já enriquecido pelo wiki/index.tsx (quando Id estiver disponível)
    if (drop?.ItemName && drop?.Icon) return drop;
    // Fallback: tenta pelo itemsById local
    if (drop?.ItemId && itemsById.size > 0) {
      const found = itemsById.get(drop.ItemId);
      if (found) return { ...drop, ItemName: found.Name, Icon: found.Icon };
    }
    return drop;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl shadow-black/60 my-auto">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-white/8">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80">
            {npc?.Sprite ? (
              <NpcSprite sprite={npc.Sprite} name={npc.Name ?? 'NPC'} size={44} />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-white/5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Text className="text-lg font-extrabold text-slate-50 leading-tight">
              {npc?.Name || 'NPC sem nome'}
            </Text>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-400">
                Nível {toNum(npc?.Level, 1)}
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold ${
                aggressive
                  ? 'border-red-500/30 bg-red-500/10 text-red-300'
                  : 'border-teal-500/30 bg-teal-500/10 text-teal-300'
              }`}>
                {aggressive ? 'Agressivo' : 'Passivo'}
              </span>
              {toNum(npc?.Experience) > 0 && (
                <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-amber-300">
                  {toNum(npc.Experience).toLocaleString('pt-BR')} EXP
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 space-y-5 max-h-[50vh] sm:max-h-[65vh] overflow-y-auto">

          {/* Vitais */}
          <div>
            <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Vitais
            </Text>
            <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
              <StatRow label="HP"  value={vitals.hp.toLocaleString('pt-BR')} color="text-emerald-300" />
              {vitals.mp > 0 && <StatRow label="MP" value={vitals.mp.toLocaleString('pt-BR')} color="text-blue-300" />}
            </div>
          </div>

          {/* Atributos */}
          {(stats.atk > 0 || stats.ap > 0 || stats.def > 0 || stats.mr > 0 || stats.spd > 0) && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Atributos
              </Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {stats.atk > 0 && <StatRow label="Ataque"         value={stats.atk} color="text-red-300" />}
                {stats.ap  > 0 && <StatRow label="Poder Mágico"   value={stats.ap}  color="text-purple-300" />}
                {stats.def > 0 && <StatRow label="Defesa"         value={stats.def} color="text-blue-300" />}
                {stats.mr  > 0 && <StatRow label="Resist. Mágica" value={stats.mr}  color="text-teal-300" />}
                {stats.spd > 0 && <StatRow label="Velocidade"     value={stats.spd} color="text-sky-300" />}
              </div>
            </div>
          )}

          {/* Combate */}
          {(toNum(npc?.Damage) > 0 || toNum(npc?.CritChance) > 0) && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Combate
              </Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {toNum(npc?.Damage) > 0     && <StatRow label="Dano"        value={toNum(npc.Damage)}           color="text-red-300" />}
                {toNum(npc?.CritChance) > 0 && <StatRow label="Chance Crit" value={`${toNum(npc.CritChance)}%`} color="text-orange-300" />}
              </div>
            </div>
          )}

          {/* Spawn */}
          {toNum(npc?.SpawnDuration) > 0 && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Spawn
              </Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                <StatRow label="Tempo de respawn" value={formatSpawn(toNum(npc.SpawnDuration))} color="text-slate-300" />
              </div>
            </div>
          )}

          {/* Drops */}
          <div>
            <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Drops {drops.length > 0 && <span className="text-slate-600">({drops.length})</span>}
            </Text>

            {drops.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-slate-900/40 px-4 py-5 text-center">
                <Text className="text-xs text-slate-600">Este NPC não possui drops.</Text>
              </div>
            ) : (
              <ul className="space-y-2">
                {drops.map((rawDrop: any, i: number) => {
                  const drop = resolveItem(rawDrop);
                  const icon      = typeof drop?.Icon === 'string' ? drop.Icon : null;
                  // Quando o Id do item estiver disponível na API, ItemName virá preenchido.
                  // Por ora, exibe o ItemId como fallback legível.
                  const itemName  = typeof drop?.ItemName === 'string'
                    ? drop.ItemName
                    : `ID: ${String(drop?.ItemId ?? '—').slice(0, 8)}…`;
                  const chance    = toNum(drop?.Chance);
                  const minQ      = toNum(drop?.MinQuantity);
                  const maxQ      = toNum(drop?.MaxQuantity);
                  const qty       = minQ === maxQ ? `x${minQ}` : `x${minQ}–${maxQ}`;

                  // cor da chance
                  const chanceColor =
                    chance >= 75 ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' :
                    chance >= 40 ? 'text-amber-300  border-amber-500/30  bg-amber-500/10'  :
                                   'text-red-300    border-red-500/30    bg-red-500/10';

                  return (
                    <li
                      key={`${drop?.ItemId ?? i}-${i}`}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2.5"
                    >
                      {/* ícone do item */}
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/8 bg-black/40">
                        {icon ? (
                          <Image alt={itemName} src={assetItem(icon)} width={28} height={28} quality={100} />
                        ) : (
                          // placeholder enquanto o Id do item não vem da API
                          <div className="h-7 w-7 rounded-md bg-white/10" />
                        )}
                      </div>

                      {/* nome + quantidade */}
                      <div className="flex-1 min-w-0">
                        <Text className="truncate text-sm font-semibold text-slate-100">
                          {itemName}
                        </Text>
                        <Text className="text-xs text-slate-500">{qty}</Text>
                      </div>

                      {/* chance */}
                      <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold tabular-nums ${chanceColor}`}>
                        {chance}%
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    typeof document !== "undefined" ? document.body : null as any
  );
}

// ─── NpcCard ─────────────────────────────────────────────────────────────────

function NpcCard({ npc, onClick }: { npc: any; onClick: () => void }) {
  const vitals    = getVitals(npc?.MaxVitals);
  const drops     = Array.isArray(npc?.Drops) ? npc.Drops : [];
  const aggressive = npc?.Aggressive === true;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center transition-all duration-200 hover:scale-[1.03] hover:bg-slate-900/90 hover:border-white/20"
    >
      {/* Sprite */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-black/40">
        {npc?.Sprite ? (
          <NpcSprite sprite={npc.Sprite} name={npc?.Name ?? 'NPC'} size={40} />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-white/10" />
        )}
      </div>

      {/* Nome */}
      <Text className="w-full truncate text-xs font-semibold text-slate-100 leading-tight">
        {npc?.Name || 'NPC sem nome'}
      </Text>

      {/* Nível + agressividade */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] text-slate-400">
          Lv {toNum(npc?.Level, 1)}
        </span>
        {aggressive && (
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-semibold text-red-300">
            Agr
          </span>
        )}
      </div>

      {/* HP + drops */}
      <div className="flex items-center gap-3 text-[0.6rem] text-slate-500">
        <span className="text-emerald-400/80">HP {vitals.hp.toLocaleString('pt-BR')}</span>
        {drops.length > 0 && (
          <span className="text-amber-400/70">{drops.length} drop{drops.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      <span className="absolute inset-x-0 bottom-1 text-[0.55rem] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
        clique para detalhes
      </span>
    </button>
  );
}

// ─── GridNPCs ────────────────────────────────────────────────────────────────

export default function GridNPCs({ npcs: allNpcs, filter, items = [] }: Props): ReactElement {
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState<any>(null);

  // Mapa ItemId → item (futuro: quando a API retornar Id no item)
  const itemsById = useMemo(() => {
    const map = new Map<string, any>();
    (items ?? []).forEach((item: any) => {
      if (typeof item?.Id === 'string')     map.set(item.Id, item);
      if (typeof item?.ItemId === 'string') map.set(item.ItemId, item);
    });
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    const q = (filter.search ?? '').trim().toLowerCase();
    if (!q) return allNpcs ?? [];

    return (allNpcs ?? []).filter((npc: any) => {
      const nameMatch = String(npc?.Name ?? '').toLowerCase().includes(q);
      const dropMatch = Array.isArray(npc?.Drops) && npc.Drops.some((d: any) => {
        const resolved = itemsById.get(d?.ItemId);
        return (
          (typeof d?.ItemName === 'string' && d.ItemName.toLowerCase().includes(q)) ||
          (resolved && String(resolved?.Name ?? '').toLowerCase().includes(q))
        );
      });
      return nameMatch || dropMatch;
    });
  }, [allNpcs, filter.search, itemsById]);

  useEffect(() => { setPage(1); }, [filter.search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const pageButtons = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3)                  return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2)     return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [totalPages, page]);

  return (
    <>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <MagnifyingGlass size={32} weight="thin" className="text-slate-600" />
          <Text className="text-sm text-slate-500">Nenhum NPC encontrado.</Text>
          <Text className="text-xs text-slate-600">Tente ajustar a busca.</Text>
        </div>
      ) : (
        <>
          <div className="grid gap-3" style={{gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))"}}>
            {pageItems.map((npc: any, idx: number) => (
              <NpcCard
                key={`${npc?.Name ?? 'npc'}-${idx}`}
                npc={npc}
                onClick={() => setSelected(npc)}
              />
            ))}
          </div>

          {/* Paginação */}
          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
            <Text className="text-[0.7rem] text-slate-500">
              {filtered.length} NPC{filtered.length !== 1 ? 's' : ''}
              {' · '}pág. {page}/{totalPages}
            </Text>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 disabled:opacity-30"
              >
                ‹
              </button>

              {pageButtons.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-8 min-w-[2rem] rounded-lg border px-2 text-xs font-semibold transition ${
                    page === p
                      ? 'border-teal-500/40 bg-teal-500/15 text-teal-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 disabled:opacity-30"
              >
                ›
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {selected && (
        <NpcModal
          npc={selected}
          itemsById={itemsById}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
