import React, { useEffect, useState } from 'react';
import { Text } from '@components/Text';
import { Funnel, X } from 'phosphor-react';

export type MarketFiltersValue = {
  query: string;
  category: 'all' | 'weapon' | 'armor' | 'accessory' | 'material' | 'consumable';
  rarity: 'all' | 'common' | 'rare' | 'epic' | 'legendary';
  minPrice: string;
  maxPrice: string;
  sort: 'newest' | 'price_asc' | 'price_desc';
};

type Props = {
  value: MarketFiltersValue;
  onChange: (v: MarketFiltersValue) => void;
};

const inputClass = `
  w-full rounded-xl border border-white/10 bg-black/40
  px-3 py-2.5 text-sm text-slate-200
  placeholder:text-slate-600
  focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30
  transition
`;

const selectClass = `
  w-full rounded-xl border border-white/10 bg-black/40
  px-3 py-2.5 text-sm text-slate-200
  focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/30
  transition
`;

const labelClass = `mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400`;

function FiltersContent({ value, onChange }: Props) {
  const set = (patch: Partial<MarketFiltersValue>) =>
    onChange({ ...value, ...patch });

  const isEmpty =
    !value.query &&
    value.category === 'all' &&
    value.rarity === 'all' &&
    !value.minPrice &&
    !value.maxPrice &&
    value.sort === 'newest';

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Text className={labelClass}>Busca</Text>
        <input
          value={value.query}
          onChange={e => set({ query: e.target.value })}
          placeholder="Ex: espada, anel, material..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Text className={labelClass}>Categoria</Text>
          <select value={value.category} onChange={e => set({ category: e.target.value as any })} className={selectClass}>
            <option value="all">Todas</option>
            <option value="weapon">Armas</option>
            <option value="armor">Armaduras</option>
            <option value="accessory">Acessórios</option>
            <option value="material">Materiais</option>
            <option value="consumable">Consumíveis</option>
          </select>
        </div>
        <div>
          <Text className={labelClass}>Raridade</Text>
          <select value={value.rarity} onChange={e => set({ rarity: e.target.value as any })} className={selectClass}>
            <option value="all">Todas</option>
            <option value="common">Comum</option>
            <option value="rare">Raro</option>
            <option value="epic">Épico</option>
            <option value="legendary">Lendário</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Text className={labelClass}>Preço mín.</Text>
          <input
            value={value.minPrice}
            onChange={e => set({ minPrice: e.target.value.replace(/[^\d]/g, '') })}
            placeholder="0"
            className={inputClass}
          />
        </div>
        <div>
          <Text className={labelClass}>Preço máx.</Text>
          <input
            value={value.maxPrice}
            onChange={e => set({ maxPrice: e.target.value.replace(/[^\d]/g, '') })}
            placeholder="9999"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <Text className={labelClass}>Ordenar</Text>
        <select value={value.sort} onChange={e => set({ sort: e.target.value as any })} className={selectClass}>
          <option value="newest">Mais recentes</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
      </div>

      {!isEmpty && (
        <button
          type="button"
          onClick={() => onChange({ query: '', category: 'all', rarity: 'all', minPrice: '', maxPrice: '', sort: 'newest' })}
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}

export function MarketFilters({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="col-span-full lg:col-span-1">
      {/* Mobile trigger */}
      <div className="lg:hidden rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur p-3 mb-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition"
        >
          <span className="flex items-center gap-2">
            <Funnel size={15} className="text-teal-300" />
            Filtros do Market
          </span>
          <span className="text-slate-500 text-xs">Abrir</span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-white/10">
          <Text className="text-sm font-semibold text-slate-100">Filtros</Text>
          <Text className="text-xs text-slate-500 mt-0.5">Refine sua busca</Text>
        </div>
        <div className="px-5 py-4">
          <FiltersContent value={value} onChange={onChange} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button aria-label="Fechar filtros" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm p-4">
            <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur">
              <div className="px-5 pt-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <div>
                  <Text className="text-sm font-semibold text-slate-100">Filtros</Text>
                  <Text className="text-xs text-slate-500 mt-0.5">Refine sua busca</Text>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="px-5 py-4 overflow-auto flex-1">
                <FiltersContent value={value} onChange={onChange} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
