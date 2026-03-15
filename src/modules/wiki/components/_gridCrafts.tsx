import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Text } from '@components/Text';
import { X, MagnifyingGlass, ClockCounterClockwise } from 'phosphor-react';
import { Crafts, FilterCrafts, CraftPublicDto, CraftTableDto } from '@interfaces/crafts';

interface Props {
  crafts: Crafts;
  filter: FilterCrafts;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(ms: number): string {
  if (ms <= 0) return '—';
  const s = ms / 1000;
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
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

// ─── CraftModal ──────────────────────────────────────────────────────────────

function CraftModal({ craft, tableName, onClose }: { craft: CraftPublicDto; tableName: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-4">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl shadow-black/60 my-auto">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-white/8">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-teal-500/25 bg-teal-500/10">
            {craft.OutputIcon ? (
              <Image alt={craft.OutputName ?? craft.Name} src={`/items/${craft.OutputIcon}`} width={44} height={44} quality={100} />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-white/10" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <Text className="text-lg font-extrabold text-slate-50 leading-tight">
              {craft.Name}
            </Text>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {craft.Quantity > 1 && (
                <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-teal-300">
                  x{craft.Quantity} produzido
                </span>
              )}
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-400">
                {tableName}
              </span>
              {craft.Folder && craft.Folder !== tableName && (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-500">
                  {craft.Folder}
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

          {/* Info do craft */}
          <div>
            <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Detalhes
            </Text>
            <div className="rounded-xl border border-white/5 bg-slate-900/60 px-4 py-1">
              <StatRow label="Tempo de craft"       value={formatTime(craft.Time)}            color="text-sky-300" />
              {craft.FailureChance > 0  && <StatRow label="Chance de falha"  value={`${craft.FailureChance}%`}  color="text-red-300" />}
              {craft.FailureChance > 0  && <StatRow label="Perda de itens"   value={`${craft.ItemLossChance}%`} color="text-orange-300" />}
            </div>
          </div>

          {/* Ingredientes */}
          <div>
            <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Ingredientes ({craft.Ingredients.length})
            </Text>
            {craft.Ingredients.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-slate-900/40 px-4 py-5 text-center">
                <Text className="text-xs text-slate-600">Sem ingredientes cadastrados.</Text>
              </div>
            ) : (
              <ul className="space-y-2">
                {craft.Ingredients.map((ing, i) => (
                  <li key={`${ing.ItemId}-${i}`} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2.5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/8 bg-black/40">
                      {ing.Icon ? (
                        <Image alt={ing.ItemName ?? ing.ItemId} src={`/items/${ing.Icon}`} width={28} height={28} quality={100} />
                      ) : (
                        <div className="h-7 w-7 rounded-md bg-white/10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text className="truncate text-sm font-semibold text-slate-100">
                        {ing.ItemName ?? `ID: ${ing.ItemId.slice(0, 8)}…`}
                      </Text>
                    </div>
                    <span className="flex-shrink-0 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[0.65rem] font-bold tabular-nums text-amber-300">
                      x{ing.Quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    typeof document !== "undefined" ? document.body : null as any
  );
}

// ─── CraftCard ───────────────────────────────────────────────────────────────

function CraftCard({ craft, onClick }: { craft: CraftPublicDto; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/60 p-4 text-center transition-all duration-200 hover:scale-[1.03] hover:bg-slate-900/90 hover:border-teal-500/30"
    >
      {/* Ícone do item produzido */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10">
        {craft.OutputIcon ? (
          <Image alt={craft.Name} src={`/items/${craft.OutputIcon}`} width={40} height={40} quality={100} />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-white/10" />
        )}
      </div>

      {/* Nome */}
      <Text className="w-full truncate text-xs font-semibold text-slate-100 leading-tight">
        {craft.Name}
      </Text>

      {/* Tempo + ingredientes */}
      <div className="flex items-center gap-2 text-[0.6rem] text-slate-500">
        <span className="flex items-center gap-1 text-sky-400/80">
          <ClockCounterClockwise size={10} />
          {formatTime(craft.Time)}
        </span>
        {craft.Ingredients.length > 0 && (
          <span className="text-slate-600">·</span>
        )}
        {craft.Ingredients.length > 0 && (
          <span className="text-amber-400/70">
            {craft.Ingredients.length} ingrediente{craft.Ingredients.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {craft.FailureChance > 0 && (
        <span className="rounded-full border border-red-500/25 bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-semibold text-red-400">
          {craft.FailureChance}% falha
        </span>
      )}

      <span className="absolute inset-x-0 bottom-1 text-[0.55rem] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
        clique para detalhes
      </span>
    </button>
  );
}

// ─── GridCrafts ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 16;

export default function GridCrafts({ crafts: allTables, filter }: Props): ReactElement {
  const [page, setPage]         = useState(1);
  const [selected, setSelected] = useState<{ craft: CraftPublicDto; tableName: string } | null>(null);
  const [activeTable, setActiveTable]   = useState<string>('all');

  // Flatten todos os crafts com referência à mesa
  const allCrafts = useMemo(() => {
    return (allTables ?? []).flatMap((table) =>
      table.Crafts.map((craft) => ({ craft, tableName: table.Name, tableFolder: table.Folder }))
    );
  }, [allTables]);

  // Tabs de mesas disponíveis
  const tables = useMemo<CraftTableDto[]>(() => allTables ?? [], [allTables]);

  // Filtra por busca + mesa ativa
  const filtered = useMemo(() => {
    const q = (filter.search ?? '').trim().toLowerCase();

    return allCrafts.filter(({ craft, tableName }) => {
      const tableMatch = activeTable === 'all' || tableName === activeTable;
      if (!tableMatch) return false;
      if (!q) return true;

      const nameMatch = craft.Name.toLowerCase().includes(q);
      const ingMatch  = craft.Ingredients.some(
        (ing) =>
          ing.ItemName?.toLowerCase().includes(q) ||
          ing.ItemId.toLowerCase().includes(q)
      );
      return nameMatch || ingMatch;
    });
  }, [allCrafts, filter.search, activeTable]);

  useEffect(() => { setPage(1); }, [filter.search, activeTable]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const pageButtons = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3)               return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2)  return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [totalPages, page]);

  if (!allTables || allTables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <MagnifyingGlass size={32} weight="thin" className="text-slate-600" />
        <Text className="text-sm text-slate-500">Nenhuma receita encontrada.</Text>
      </div>
    );
  }

  return (
    <>
      {/* Tabs de mesas */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTable('all')}
          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTable === 'all'
              ? 'border-teal-500/40 bg-teal-500/15 text-teal-300'
              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
          }`}
        >
          Todas
          <span className="ml-1.5 rounded-full border border-white/10 bg-black/30 px-1.5 py-0.5 text-[0.6rem] text-slate-500">
            {allCrafts.length}
          </span>
        </button>

        {tables.map((table) => {
          const count = allCrafts.filter((c) => c.tableName === table.Name).length;
          return (
            <button
              key={table.Id}
              type="button"
              onClick={() => setActiveTable(table.Name)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTable === table.Name
                  ? 'border-teal-500/40 bg-teal-500/15 text-teal-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {table.Name}
              <span className="ml-1.5 rounded-full border border-white/10 bg-black/30 px-1.5 py-0.5 text-[0.6rem] text-slate-500">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid ou vazio */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <MagnifyingGlass size={28} weight="thin" className="text-slate-600" />
          <Text className="text-sm text-slate-500">Nenhuma receita encontrada.</Text>
          <Text className="text-xs text-slate-600">Tente ajustar os filtros.</Text>
        </div>
      ) : (
        <>
          <div className="grid gap-3" style={{gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))"}}>
            {pageItems.map(({ craft, tableName }, idx) => (
              <CraftCard
                key={`${craft.Id}-${idx}`}
                craft={craft}
                onClick={() => setSelected({ craft, tableName })}
              />
            ))}
          </div>

          {/* Paginação */}
          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
            <Text className="text-[0.7rem] text-slate-500">
              {filtered.length} receita{filtered.length !== 1 ? 's' : ''}
              {' · '}pág. {page}/{totalPages}
            </Text>

            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 disabled:opacity-30">‹</button>

              {pageButtons.map(p => (
                <button key={p} type="button" onClick={() => setPage(p)}
                  className={`h-8 min-w-[2rem] rounded-lg border px-2 text-xs font-semibold transition ${
                    page === p
                      ? 'border-teal-500/40 bg-teal-500/15 text-teal-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                  }`}
                >{p}</button>
              ))}

              <button type="button" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 disabled:opacity-30">›</button>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {selected && (
        <CraftModal
          craft={selected.craft}
          tableName={selected.tableName}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
