import { Text } from '@components/Text';
import { Filter, Items } from '@interfaces/items';
import { Npcs } from '@interfaces/npcs';
import { Crafts } from '@interfaces/crafts';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MagnifyingGlass } from 'phosphor-react';
import { assetItem } from '@utils/assets';

interface Props {
  items: Items;
  filter: Filter;
  npcs?: Npcs;
  crafts?: Crafts;
}

const PAGE_SIZE = 16;

// ─── Helpers ────────────────────────────────────────────────────────────────

function toNum(v: any, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getStats(item: any) {
  const s = Array.isArray(item?.StatsGiven) ? item.StatsGiven : [];
  return {
    atk: toNum(s[0]),
    ap:  toNum(s[1]),
    def: toNum(s[2]),
    mr:  toNum(s[3]),
  };
}

function getVitals(item: any) {
  const v = Array.isArray(item?.VitalsGiven) ? item.VitalsGiven : [];
  return { hp: toNum(v[0]), mp: toNum(v[1]) };
}

function getRegen(item: any) {
  const r = Array.isArray(item?.VitalsRegen) ? item.VitalsRegen : [];
  return { hp: toNum(r[0]), mp: toNum(r[1]) };
}

function hasAnyStat(item: any) {
  const s = getStats(item);
  const v = getVitals(item);
  const r = getRegen(item);
  return (
    s.atk > 0 || s.ap > 0 || s.def > 0 || s.mr > 0 ||
    v.hp > 0  || v.mp > 0 ||
    r.hp > 0  || r.mp > 0 ||
    toNum(item?.Damage) > 0 ||
    toNum(item?.CritChance) > 0
  );
}

const ITEM_TYPE_BY_CATEGORY: Record<number, string | null> = {
  1: 'Equipment',
  2: 'Consumable',
  3: 'Resource',
  4: 'Quest',
  5: 'Event',
  6: 'Backpack',
  0: null,
};

// ─── Rarity ─────────────────────────────────────────────────────────────────

type RarityConfig = { label: string; border: string; bg: string; text: string; glow: string };

function rarityConfig(rarity: number): RarityConfig {
  switch (rarity) {
    case 1: return { label: 'Comum',    border: 'border-slate-500/30',  bg: 'bg-slate-500/10',  text: 'text-slate-300',  glow: '' };
    case 2: return { label: 'Incomum',  border: 'border-green-500/40',  bg: 'bg-green-500/10',  text: 'text-green-300',  glow: 'shadow-[0_0_12px_rgba(34,197,94,0.25)]' };
    case 3: return { label: 'Raro',     border: 'border-blue-500/40',   bg: 'bg-blue-500/10',   text: 'text-blue-300',   glow: 'shadow-[0_0_12px_rgba(59,130,246,0.25)]' };
    case 4: return { label: 'Épico',    border: 'border-purple-500/40', bg: 'bg-purple-500/10', text: 'text-purple-300', glow: 'shadow-[0_0_12px_rgba(168,85,247,0.30)]' };
    case 5: return { label: 'Lendário', border: 'border-amber-500/50',  bg: 'bg-amber-500/10',  text: 'text-amber-300',  glow: 'shadow-[0_0_16px_rgba(251,191,36,0.35)]' };
    default: return { label: '—',      border: 'border-white/10',       bg: 'bg-white/5',       text: 'text-slate-500',  glow: '' };
  }
}

// ─── ItemType label ──────────────────────────────────────────────────────────

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    Equipment: 'Equipamento',
    Consumable: 'Consumível',
    Resource: 'Material',
    Quest: 'Missão',
    Event: 'Evento',
    Backpack: 'Mochila',
    None: '—',
  };
  return map[type] ?? type ?? '—';
}

// ─── StatRow ─────────────────────────────────────────────────────────────────

function StatRow({ label, value, color = 'text-slate-100' }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <Text className="text-xs text-slate-500">{label}</Text>
      <Text className={`text-xs font-semibold tabular-nums ${color}`}>{value}</Text>
    </div>
  );
}

// ─── ItemModal ───────────────────────────────────────────────────────────────

function ItemModal({
  item,
  dropSources,
  craftRecipes,
  onClose,
}: {
  item: any;
  dropSources: Array<{ name: string; sprite: string; chance: number; minQ: number; maxQ: number }>;
  craftRecipes: Array<{ craftName: string; tableName: string; time: number }>;
  onClose: () => void;
}) {
  const rar    = rarityConfig(toNum(item?.Rarity));
  const stats  = getStats(item);
  const vitals = getVitals(item);
  const regen  = getRegen(item);
  const effects: any[] = Array.isArray(item?.Effects) ? item.Effects : [];
  const hasStat = hasAnyStat(item);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-4">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full max-w-md overflow-hidden rounded-2xl border bg-black/90 shadow-2xl my-auto ${rar.border} ${rar.glow}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-white/8">
          <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border ${rar.border} ${rar.bg}`}>
            <Image alt={item.Name ?? 'Item'} src={assetItem(item.Icon)} width={44} height={44} quality={100} />
          </div>

          <div className="flex-1 min-w-0">
            <Text className="text-lg font-extrabold text-slate-50 leading-tight">{item.Name}</Text>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold ${rar.border} ${rar.bg} ${rar.text}`}>
                {rar.label}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-400">
                {typeLabel(item.ItemType)}
              </span>
              {dropSources.length > 0 && (
                <span className="rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-red-300">
                  Drop
                </span>
              )}
              {craftRecipes.length > 0 && (
                <span className="rounded-full border border-teal-500/25 bg-teal-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-teal-300">
                  Craftável
                </span>
              )}
            </div>
          </div>

          <button type="button" onClick={onClose} className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 space-y-5 max-h-[50vh] sm:max-h-[65vh] overflow-y-auto">

          {/* Combate */}
          {(toNum(item?.Damage) > 0 || toNum(item?.CritChance) > 0 || toNum(item?.Speed) > 0) && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Combate</Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {toNum(item?.Damage) > 0     && <StatRow label="Dano"        value={toNum(item.Damage)}          color="text-red-300" />}
                {toNum(item?.CritChance) > 0 && <StatRow label="Chance Crit" value={`${toNum(item.CritChance)}%`} color="text-orange-300" />}
                {toNum(item?.CritMultiplier, 1.5) !== 1.5 && (
                  <StatRow label="Multi. Crit" value={`${toNum(item.CritMultiplier, 1.5)}x`} color="text-orange-300" />
                )}
                {toNum(item?.Speed) > 0 && <StatRow label="Velocidade" value={toNum(item.Speed)} color="text-sky-300" />}
              </div>
            </div>
          )}

          {/* Stats */}
          {(stats.atk > 0 || stats.ap > 0 || stats.def > 0 || stats.mr > 0) && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Atributos</Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {stats.atk > 0 && <StatRow label="Ataque"         value={stats.atk} color="text-red-300" />}
                {stats.ap  > 0 && <StatRow label="Poder Mágico"   value={stats.ap}  color="text-purple-300" />}
                {stats.def > 0 && <StatRow label="Defesa"         value={stats.def} color="text-blue-300" />}
                {stats.mr  > 0 && <StatRow label="Resist. Mágica" value={stats.mr}  color="text-teal-300" />}
              </div>
            </div>
          )}

          {/* Vitais */}
          {(vitals.hp > 0 || vitals.mp > 0 || regen.hp > 0 || regen.mp > 0) && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Vitais</Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {vitals.hp > 0 && <StatRow label="HP"       value={vitals.hp.toLocaleString('pt-BR')} color="text-emerald-300" />}
                {vitals.mp > 0 && <StatRow label="MP"       value={vitals.mp.toLocaleString('pt-BR')} color="text-blue-300" />}
                {regen.hp  > 0 && <StatRow label="Regen HP" value={`${regen.hp}/s`}                   color="text-emerald-400" />}
                {regen.mp  > 0 && <StatRow label="Regen MP" value={`${regen.mp}/s`}                   color="text-blue-400" />}
              </div>
            </div>
          )}

          {/* Efeitos */}
          {effects.length > 0 && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Efeitos</Text>
              <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
                {effects.map((eff: any, i: number) => (
                  <StatRow
                    key={i}
                    label={String(eff.Type ?? '—')}
                    value={eff.Percentage != null ? `${eff.Percentage}%` : eff.Value ?? '—'}
                    color="text-fuchsia-300"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sem stats */}
          {!hasStat && effects.length === 0 && (
            <div className="rounded-xl border border-white/5 bg-slate-900/40 px-4 py-6 text-center">
              <Text className="text-xs text-slate-500">Este item não possui atributos.</Text>
            </div>
          )}

          {/* ─── Obtido por drop ─── */}
          {dropSources.length > 0 && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Obtido de ({dropSources.length} mob{dropSources.length !== 1 ? 's' : ''})
              </Text>
              <ul className="space-y-2">
                {dropSources.map((src, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2.5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/8 bg-black/40">
                      {src.sprite ? (
                        <Image alt={src.name} src={assetItem(src.sprite)} width={28} height={28} quality={100} />
                      ) : (
                        <div className="h-7 w-7 rounded-md bg-white/10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text className="truncate text-sm font-semibold text-slate-100">{src.name || 'NPC desconhecido'}</Text>
                      <Text className="text-xs text-slate-500">
                        {src.minQ === src.maxQ ? `x${src.minQ}` : `x${src.minQ}–${src.maxQ}`}
                      </Text>
                    </div>
                    <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold tabular-nums ${
                      src.chance >= 75 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' :
                      src.chance >= 40 ? 'border-amber-500/30  bg-amber-500/10  text-amber-300' :
                                         'border-red-500/30    bg-red-500/10    text-red-300'
                    }`}>
                      {src.chance}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ─── Pode ser craftado ─── */}
          {craftRecipes.length > 0 && (
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Craftável em ({craftRecipes.length} receita{craftRecipes.length !== 1 ? 's' : ''})
              </Text>
              <ul className="space-y-2">
                {craftRecipes.map((rec, i) => {
                  const s = Math.round(rec.time / 1000);
                  const timeStr = s < 60 ? `${s}s` : `${Math.floor(s / 60)}m${s % 60 > 0 ? ` ${s % 60}s` : ''}`;
                  return (
                    <li key={i} className="flex items-center justify-between gap-3 rounded-xl border border-teal-500/15 bg-teal-500/5 px-4 py-2.5">
                      <div className="min-w-0">
                        <Text className="truncate text-sm font-semibold text-slate-100">{rec.craftName}</Text>
                        <Text className="text-xs text-slate-500">Mesa: {rec.tableName}</Text>
                      </div>
                      <span className="flex-shrink-0 rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-sky-300">
                        {timeStr}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>,
    typeof document !== "undefined" ? document.body : null as any
  );
}

// ─── ItemCard ────────────────────────────────────────────────────────────────

function ItemCard({ item, onClick }: { item: any; onClick: () => void }) {
  const rar = rarityConfig(toNum(item?.Rarity));

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-2.5 rounded-xl border p-4
        bg-slate-900/60 text-center
        transition-all duration-200
        hover:scale-[1.03] hover:bg-slate-900/90
        ${rar.border} ${rar.glow}
      `}
    >
      {/* Ícone */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl border ${rar.border} ${rar.bg}`}>
        <Image
          alt={item.Name ?? 'Item'}
          src={assetItem(item.Icon)}
          width={40}
          height={40}
          quality={100}
        />
      </div>

      {/* Nome */}
      <Text className="w-full truncate text-xs font-semibold text-slate-100 leading-tight">
        {item.Name}
      </Text>

      {/* Raridade */}
      <span className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold ${rar.border} ${rar.bg} ${rar.text}`}>
        {rar.label}
      </span>

      {/* Hint de clique */}
      <span className="absolute inset-x-0 bottom-1 text-[0.55rem] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
        clique para detalhes
      </span>
    </button>
  );
}

// ─── GridItems ───────────────────────────────────────────────────────────────

export default function GridItems({ items: allItems, filter, npcs = [], crafts = [] }: Props): ReactElement {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>(null);

  const typeFilter = ITEM_TYPE_BY_CATEGORY[filter.category] ?? null;

  // ─── Lookup: itemId → npcs que dropam ──────────────────────────────────────
  const dropsByItemId = useMemo(() => {
    const map = new Map<string, Array<{ name: string; sprite: string; chance: number; minQ: number; maxQ: number }>>();
    (npcs ?? []).forEach((npc: any) => {
      if (!Array.isArray(npc?.Drops)) return;
      npc.Drops.forEach((drop: any) => {
        const id = String(drop?.ItemId ?? '');
        if (!id) return;
        if (!map.has(id)) map.set(id, []);
        map.get(id)!.push({
          name:   String(npc?.Name ?? ''),
          sprite: String(npc?.Sprite ?? ''),
          chance: Number(drop?.Chance ?? 0),
          minQ:   Number(drop?.MinQuantity ?? 0),
          maxQ:   Number(drop?.MaxQuantity ?? 0),
        });
      });
    });
    return map;
  }, [npcs]);

  // ─── Lookup: itemId → receitas de craft que produzem esse item ──────────────
  const craftsByItemId = useMemo(() => {
    const map = new Map<string, Array<{ craftName: string; tableName: string; time: number }>>();
    (crafts ?? []).forEach((table: any) => {
      (table?.Crafts ?? []).forEach((craft: any) => {
        const id = String(craft?.ItemId ?? '');
        if (!id) return;
        if (!map.has(id)) map.set(id, []);
        map.get(id)!.push({
          craftName: String(craft?.Name ?? ''),
          tableName: String(table?.Name ?? ''),
          time:      Number(craft?.Time ?? 0),
        });
      });
    });
    return map;
  }, [crafts]);

  const filtered = useMemo(() => {
    const search = (filter.search ?? '').trim().toLowerCase();

    return (allItems ?? []).filter((item: any) => {
      if (filter.rarity !== 0 && item.Rarity !== filter.rarity) return false;
      if (typeFilter && item.ItemType !== typeFilter) return false;
      if (search && !String(item.Name ?? '').toLowerCase().includes(search)) return false;
      return true;
    });
  }, [allItems, filter.rarity, typeFilter, filter.search]);

  useEffect(() => { setPage(1); }, [filter.category, filter.rarity, filter.search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // paginação compacta: mostra no max 5 botões
  const pageButtons = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [totalPages, page]);

  return (
    <>
      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <MagnifyingGlass size={32} weight="thin" className="text-slate-600" />
          <Text className="text-sm text-slate-500">Nenhum item encontrado.</Text>
          <Text className="text-xs text-slate-600">Tente ajustar os filtros.</Text>
        </div>
      ) : (
        <>
          <div className="grid gap-3" style={{gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))"}}>
            {pageItems.map((item: any, idx: number) => (
              <ItemCard
                key={`${item?.Id ?? item?.Name}-${idx}`}
                item={item}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>

          {/* Paginação */}
          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
            <Text className="text-[0.7rem] text-slate-500">
              {filtered.length} iten{filtered.length !== 1 ? 's' : ''}
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

      {/* Modal de detalhe */}
      {selected && (
        <ItemModal
          item={selected}
          dropSources={dropsByItemId.get(selected?.Id ?? '') ?? []}
          craftRecipes={craftsByItemId.get(selected?.Id ?? '') ?? []}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
