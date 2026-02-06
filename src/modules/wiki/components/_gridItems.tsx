import { Text } from '@components/Text';
import { Filter, Items } from '@interfaces/items';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

interface Props {
  items: Items;
  filter: Filter;
}

const PAGE_SIZE = 15;

const ITEM_TYPE_BY_CATEGORY: Record<number, string | null> = {
  1: 'Equipment',
  2: 'Consumable',
  3: 'Resource',
  4: 'Quest',
  5: 'Event',
  6: 'Backpack',
  0: null
};

type SortDir = 'asc' | 'desc';
type SortKey =
  | 'name'
  | 'type'
  | 'rarity'
  | 'damage'
  | 'crit'
  | 'speed'
  | 'atk'
  | 'ap'
  | 'def'
  | 'mr'
  | 'hp'
  | 'mp'
  | 'regen';

function toNum(v: any, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getStats(item: any) {
  const stats = Array.isArray(item?.StatsGiven) ? item.StatsGiven : [];
  return {
    atk: toNum(stats[0], 0),
    ap: toNum(stats[1], 0),
    def: toNum(stats[2], 0),
    mr: toNum(stats[3], 0)
  };
}

function getVitals(item: any) {
  const v = Array.isArray(item?.VitalsGiven) ? item.VitalsGiven : [];
  return { hp: toNum(v[0], 0), mp: toNum(v[1], 0) };
}

function getRegen(item: any) {
  const r = Array.isArray(item?.VitalsRegen) ? item.VitalsRegen : [];
  return { hp: toNum(r[0], 0), mp: toNum(r[1], 0) };
}

function rarityLabel(rarity: number) {
  switch (rarity) {
    case 1:
      return { text: 'Comum', className: 'text-white/70' };
    case 2:
      return { text: 'Incomum', className: 'text-red-400' };
    case 3:
      return { text: 'Raro', className: 'text-blue-400' };
    case 4:
      return { text: 'Épico', className: 'text-green-400' };
    case 5:
      return { text: 'Lendário', className: 'text-yellow-300' };
    default:
      return { text: '-', className: 'text-white/60' };
  }
}

function sortCompare(a: any, b: any, key: SortKey, dir: SortDir) {
  const mult = dir === 'asc' ? 1 : -1;

  const an = String(a?.Name ?? '');
  const bn = String(b?.Name ?? '');
  const at = String(a?.ItemType ?? '');
  const bt = String(b?.ItemType ?? '');

  const aStats = getStats(a);
  const bStats = getStats(b);
  const aVit = getVitals(a);
  const bVit = getVitals(b);
  const aReg = getRegen(a);
  const bReg = getRegen(b);

  let av: any;
  let bv: any;

  switch (key) {
    case 'name':
      av = an;
      bv = bn;
      return mult * av.localeCompare(bv, 'pt-BR', { sensitivity: 'base' });

    case 'type':
      av = at;
      bv = bt;
      return mult * av.localeCompare(bv, 'pt-BR', { sensitivity: 'base' });

    case 'rarity':
      av = toNum(a?.Rarity, 0);
      bv = toNum(b?.Rarity, 0);
      break;

    case 'damage':
      av = toNum(a?.Damage, 0);
      bv = toNum(b?.Damage, 0);
      break;

    case 'crit':
      av = toNum(a?.CritChance, 0);
      bv = toNum(b?.CritChance, 0);
      break;

    case 'speed':
      av = toNum(a?.Speed, 0);
      bv = toNum(b?.Speed, 0);
      break;

    case 'atk':
      av = aStats.atk;
      bv = bStats.atk;
      break;

    case 'ap':
      av = aStats.ap;
      bv = bStats.ap;
      break;

    case 'def':
      av = aStats.def;
      bv = bStats.def;
      break;

    case 'mr':
      av = aStats.mr;
      bv = bStats.mr;
      break;

    case 'hp':
      av = aVit.hp;
      bv = bVit.hp;
      break;

    case 'mp':
      av = aVit.mp;
      bv = bVit.mp;
      break;

    case 'regen':
      // soma regen hp+mp só pra ordenar
      av = aReg.hp + aReg.mp;
      bv = bReg.hp + bReg.mp;
      break;

    default:
      av = an;
      bv = bn;
      return mult * av.localeCompare(bv, 'pt-BR', { sensitivity: 'base' });
  }

  if (av === bv) {
    // desempate por nome para ficar estável
    return mult * an.localeCompare(bn, 'pt-BR', { sensitivity: 'base' });
  }
  return mult * (av > bv ? 1 : -1);
}

export default function GridItems({ items: allItems, filter }: Props): ReactElement {
  const [pagination, setPagination] = useState<number>(1);

  // ✅ Sort state (default: nome asc, estilo Tibia)
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const typeFilter = ITEM_TYPE_BY_CATEGORY[filter.category] ?? null;

  // ✅ Colunas dinâmicas por tipo/categoria (você pode ajustar se quiser)
  const layoutMode = useMemo<'equipment' | 'consumable' | 'default'>(() => {
    if (filter.category === 1) return 'equipment';
    if (filter.category === 2) return 'consumable';
    return 'default';
  }, [filter.category]);

  const showCombatCols = layoutMode === 'equipment';
  const showVitalsCols = layoutMode === 'equipment' || layoutMode === 'consumable';
  const showRegenCol = layoutMode === 'equipment' || layoutMode === 'consumable';

  const colCount = useMemo(() => {
    // Item, Tipo, Raridade, Dmg, Crit, Spd = 6
    let cols = 6;
    if (showCombatCols) cols += 4; // ATK AP DEF MR
    if (showVitalsCols) cols += 2; // HP MP
    if (showRegenCol) cols += 1; // Regen
    return cols;
  }, [showCombatCols, showVitalsCols, showRegenCol]);

  // ✅ filtra + ordena (sem mutar)
  const filtered = useMemo(() => {
    const search = (filter.search ?? '').trim().toLowerCase();

    const arr = (allItems ?? []).filter((x: any) => {
      if (filter.rarity !== 0 && x.Rarity !== filter.rarity) return false;
      if (typeFilter && x.ItemType !== typeFilter) return false;
      if (search && !String(x.Name ?? '').toLowerCase().includes(search)) return false;
      return true;
    });

    const sorted = [...arr].sort((a, b) => sortCompare(a, b, sortKey, sortDir));
    return sorted;
  }, [allItems, filter.rarity, typeFilter, filter.search, sortKey, sortDir]);

  // ✅ reseta pagina ao mudar filtro/sort
  useEffect(() => {
    setPagination(1);
  }, [filter.category, filter.rarity, filter.search, sortKey, sortDir]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    return pages <= 0 ? 0 : pages;
  }, [filtered.length]);

  // ✅ mantém pagination válida
  useEffect(() => {
    if (totalPages === 0) {
      if (pagination !== 1) setPagination(1);
      return;
    }
    if (pagination > totalPages) setPagination(1);
    if (pagination < 1) setPagination(1);
  }, [totalPages, pagination]);

  const startIndex = useMemo(() => {
    if (totalPages === 0) return 0;
    return (pagination - 1) * PAGE_SIZE;
  }, [pagination, totalPages]);

  const pageItems = useMemo(() => {
    if (totalPages === 0) return [];
    return filtered.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filtered, startIndex, totalPages]);

  const emptyRowsCount = Math.max(0, PAGE_SIZE - pageItems.length);

  const toggleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
      return;
    }
    setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
  };


  const SortHeader = ({
    label,
    keyName,
    align = 'left'
  }: {
    label: string;
    keyName: SortKey;
    align?: 'left' | 'center' | 'right';
  }) => {
    const isActive = sortKey === keyName;
    const arrow = isActive ? (sortDir === 'asc' ? '▲' : '▼') : '';

    return (
      <button
        type="button"
        onClick={() => toggleSort(keyName)}
        className={`inline-flex items-center gap-2 text-xs tracking-wide text-white/80 hover:text-white ${align === 'center' ? 'justify-center w-full' : ''
          }`}
        title="Ordenar"
      >
        <span>{label}</span>
        <span className={`text-[10px] ${isActive ? 'text-white/70' : 'text-white/30'}`}>
          {arrow || '↕'}
        </span>
      </button>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white/5 uppercase text-white/70 backdrop-blur">
            <tr>
              <th className="px-3 py-2">
                <SortHeader label="Item" keyName="name" />
              </th>

              <th className="px-3 py-2 text-center">
                <SortHeader label="Tipo" keyName="type" align="center" />
              </th>

              <th className="px-3 py-2 text-center">
                <SortHeader label="Raridade" keyName="rarity" align="center" />
              </th>

              <th className="px-3 py-2 text-center">
                <SortHeader label="Dmg" keyName="damage" align="center" />
              </th>
              <th className="px-3 py-2 text-center">
                <SortHeader label="Crit%" keyName="crit" align="center" />
              </th>
              <th className="px-3 py-2 text-center">
                <SortHeader label="Spd" keyName="speed" align="center" />
              </th>

              {showCombatCols && (
                <>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="ATK" keyName="atk" align="center" />
                  </th>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="AP" keyName="ap" align="center" />
                  </th>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="DEF" keyName="def" align="center" />
                  </th>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="MR" keyName="mr" align="center" />
                  </th>
                </>
              )}

              {showVitalsCols && (
                <>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="HP" keyName="hp" align="center" />
                  </th>
                  <th className="px-3 py-2 text-center">
                    <SortHeader label="MP" keyName="mp" align="center" />
                  </th>
                </>
              )}

              {showRegenCol && (
                <th className="px-3 py-2 text-center">
                  <SortHeader label="Regen" keyName="regen" align="center" />
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {pageItems.map((item: any, idx: number) => {
              const stats = getStats(item);
              const vitals = getVitals(item);
              const regen = getRegen(item);
              const rar = rarityLabel(toNum(item?.Rarity, 0));

              const rowBg = idx % 2 === 0 ? 'bg-black/15' : 'bg-black/25';

              // ✅ key única por paginação (resolve “mistura/acúmulo”)
              const globalIndex = startIndex + idx;
              const key = `${item?.Id ?? item?.ItemId ?? item?.Name ?? 'item'}-${globalIndex}`;

              return (
                <tr
                  key={key}
                  className={`border-t border-white/10 ${rowBg} hover:bg-white/5`}
                >
                  {/* Item + Tooltip */}
                  <td className="px-3 py-2">
                    <div className="group relative flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md border border-white/10 bg-white/5 p-1">
                        <Image
                          alt={item.Name ?? 'Item'}
                          src={`/items/${item.Icon}`}
                          width={24}
                          height={24}
                          quality={100}
                        />
                      </div>

                      <div className="min-w-0">
                        <Text className="truncate text-white">{item.Name}</Text>
                        <Text size="sm" className="truncate text-white/50">
                          {String(item.ItemType ?? '-')}
                        </Text>
                      </div>

                      {/* Tooltip (clean) */}
                      <div className="pointer-events-none absolute left-0 top-10 z-30 hidden w-[320px] rounded-xl border border-white/10 bg-[#0b0f17] p-3 shadow-2xl group-hover:block">
                        <div className="flex gap-3">
                          <div className="h-12 w-12 rounded-lg border border-white/10 bg-white/5 p-2">
                            <Image
                              alt={item.Name ?? 'Item'}
                              src={`/items/${item.Icon}`}
                              width={32}
                              height={32}
                              quality={100}
                            />
                          </div>

                          <div className="min-w-0">
                            <Text className="truncate text-white">{item.Name} </Text>
                            <Text size="sm" className="text-white/60">
                              {String(item.ItemType ?? '-')} •{' '}
                              <span className={rar.className}>{rar.text}</span>
                            </Text>
                          </div>
                        </div>

                        {/* <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                            <Text size="sm" className="text-white/70">Dmg</Text>
                            <Text className="text-white">{toNum(item.Damage, 0)}</Text>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                            <Text size="sm" className="text-white/70">Crit%</Text>
                            <Text className="text-white">{toNum(item.CritChance, 0)}</Text>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                            <Text size="sm" className="text-white/70">Spd</Text>
                            <Text className="text-white">{toNum(item.Speed, 0)}</Text>
                          </div>
                        </div>

                        {showCombatCols && (
                          <div className="mt-2 grid grid-cols-4 gap-2">
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">ATK</Text>
                              <Text className="text-white">{stats.atk}</Text>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">AP</Text>
                              <Text className="text-white">{stats.ap}</Text>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">DEF</Text>
                              <Text className="text-white">{stats.def}</Text>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">MR</Text>
                              <Text className="text-white">{stats.mr}</Text>
                            </div>
                          </div>
                        )}

                        {(showVitalsCols || showRegenCol) && (
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">HP</Text>
                              <Text className="text-white">{vitals.hp}</Text>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">MP</Text>
                              <Text className="text-white">{vitals.mp}</Text>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-center">
                              <Text size="sm" className="text-white/70">Regen</Text>
                              <Text className="text-white">
                                {regen.hp}/{regen.mp}
                              </Text>
                            </div>
                          </div>
                        )} */}

                        <Text size="sm" className="mt-2 text-white/50">
                          Dica: clique no cabeçalho para ordenar.
                        </Text>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2 text-center text-white/70">
                    <Text size="sm">{String(item.ItemType ?? '-')}</Text>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <Text size="sm" className={rar.className}>
                      {rar.text}
                    </Text>
                  </td>

                  <td className="px-3 py-2 text-center text-white/80">
                    <Text size="sm">{toNum(item.Damage, 0)}</Text>
                  </td>
                  <td className="px-3 py-2 text-center text-white/80">
                    <Text size="sm">{toNum(item.CritChance, 0)}</Text>
                  </td>
                  <td className="px-3 py-2 text-center text-white/80">
                    <Text size="sm">{toNum(item.Speed, 0)}</Text>
                  </td>

                  {showCombatCols && (
                    <>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{stats.atk}</Text>
                      </td>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{stats.ap}</Text>
                      </td>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{stats.def}</Text>
                      </td>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{stats.mr}</Text>
                      </td>
                    </>
                  )}

                  {showVitalsCols && (
                    <>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{vitals.hp}</Text>
                      </td>
                      <td className="px-3 py-2 text-center text-white/80">
                        <Text size="sm">{vitals.mp}</Text>
                      </td>
                    </>
                  )}

                  {showRegenCol && (
                    <td className="px-3 py-2 text-center text-white/80">
                      <Text size="sm">
                        {regen.hp}/{regen.mp}
                      </Text>
                    </td>
                  )}
                </tr>
              );
            })}

            {/* altura fixa */}
            {emptyRowsCount > 0 &&
              Array.from({ length: emptyRowsCount }).map((_, i) => (
                <tr key={`empty-${startIndex}-${i}`} className="border-t border-white/10 bg-black/10">
                  <td className="px-3 py-2" colSpan={colCount}>
                    <div className="h-6" />
                  </td>
                </tr>
              ))}

            {/* vazio */}
            {filtered.length === 0 && (
              <tr className="border-t border-white/10 bg-black/10">
                <td className="px-3 py-6" colSpan={colCount}>
                  <Text className="text-white/70">Nenhum item encontrado.</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-3 py-2">
        <Text size="sm" className="text-white/60">
          {filtered.length} itens
        </Text>

        <div className="flex items-center gap-1">
          {totalPages === 0 ? (
            <Text size="sm" className="text-white/50">
              -
            </Text>
          ) : (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => setPagination(page)}
                className={`h-8 min-w-[2rem] rounded-md border px-2 text-xs transition
                  ${pagination === page
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 bg-black/30 text-white/70 hover:bg-black/40'
                  }`}
              >
                {page}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
