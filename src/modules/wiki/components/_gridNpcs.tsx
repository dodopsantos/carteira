import { Text } from '@components/Text';
import { FilterNpc, Npcs, NpcPublicDto, NpcDropDto } from '@interfaces/npcs';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

interface Props {
  npcs: Npcs;
  filter: FilterNpc;
}

const PAGE_SIZE = 15;

type SortDir = 'asc' | 'desc';
type SortKey =
  | 'name'
  | 'experience'
  | 'spawn'
  | 'atk'
  | 'ap'
  | 'def'
  | 'mr'
  | 'spd'
  | 'hp'
  | 'mp'
  | 'drops';

function toNum(v: any, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getStats(stats: any) {
  return {
    atk: toNum(stats?.Attack, 0),
    ap: toNum(stats?.AbilityPower, 0),
    def: toNum(stats?.Defense, 0),
    mr: toNum(stats?.MagicResist, 0),
    spd: toNum(stats?.Speed, 0)
  };
}

function getVitals(vitals: any) {
  return {
    hp: toNum(vitals?.Health, 0),
    mp: toNum(vitals?.Mana, 0)
  };
}

function dropsCount(drops: any) {
  return Array.isArray(drops) ? drops.length : 0;
}

function sortCompare(a: any, b: any, key: SortKey, dir: SortDir) {
  const mult = dir === 'asc' ? 1 : -1;

  const an = String(a?.Name ?? '');
  const bn = String(b?.Name ?? '');

  const aStats = getStats(a?.Stats);
  const bStats = getStats(b?.Stats);

  const aVit = getVitals(a?.MaxVitals);
  const bVit = getVitals(b?.MaxVitals);

  let av: any;
  let bv: any;

  switch (key) {
    case 'name':
      return mult * an.localeCompare(bn, 'pt-BR', { sensitivity: 'base' });

    case 'experience':
      av = toNum(a?.Experience, 0);
      bv = toNum(b?.Experience, 0);
      break;

    case 'spawn':
      // backend parece vir em ms, mas aqui só ordenamos valor bruto
      av = toNum(a?.SpawnDuration, 0);
      bv = toNum(b?.SpawnDuration, 0);
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

    case 'spd':
      av = aStats.spd;
      bv = bStats.spd;
      break;

    case 'hp':
      av = aVit.hp;
      bv = bVit.hp;
      break;

    case 'mp':
      av = aVit.mp;
      bv = bVit.mp;
      break;

    case 'drops':
      av = dropsCount(a?.Drops);
      bv = dropsCount(b?.Drops);
      break;

    default:
      return mult * an.localeCompare(bn, 'pt-BR', { sensitivity: 'base' });
  }

  if (av === bv) {
    return mult * an.localeCompare(bn, 'pt-BR', { sensitivity: 'base' });
  }
  return mult * (av > bv ? 1 : -1);
}

export default function GridNPCs({ npcs: allNpcs, filter }: Props): ReactElement {
  const [pagination, setPagination] = useState<number>(1);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filtered = useMemo(() => {
    const q = (filter.search ?? '').trim().toLowerCase();

    const arr = (allNpcs ?? []).filter((npc: any) => {
      if (!q) return true;

      const nameMatch = String(npc?.Name ?? '').toLowerCase().includes(q);

      const dropsMatch =
        Array.isArray(npc?.Drops) &&
        npc.Drops.some((d: unknown) => {
          const id = (d as any)?.ItemId;
          const itemName = (d as any)?.ItemName;
          return (
            (typeof id === 'string' && id.toLowerCase().includes(q)) ||
            (typeof itemName === 'string' && itemName.toLowerCase().includes(q))
          );
        });

      return nameMatch || dropsMatch;
    });

    return [...arr].sort((a, b) => sortCompare(a, b, sortKey, sortDir));
  }, [allNpcs, filter.search, sortKey, sortDir]);

  // reset page ao mudar filtro / sort
  useEffect(() => {
    setPagination(1);
  }, [filter.search, sortKey, sortDir]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(filtered.length / PAGE_SIZE);
    return pages <= 0 ? 0 : pages;
  }, [filtered.length]);

  // mantém pagination válida
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

  const renderVitals = (npc: NpcPublicDto) => {
    const v = getVitals((npc as any)?.MaxVitals);
    return (
      <Text size="sm" className="text-white/80">
        HP {v.hp}, MP {v.mp}
      </Text>
    );
  };

  const renderStats = (npc: NpcPublicDto) => {
    const s = getStats((npc as any)?.Stats);
    return (
      <Text size="sm" className="text-white/80">
        ATK {s.atk}, AP {s.ap}, DEF {s.def}, MR {s.mr}, SPD {s.spd}
      </Text>
    );
  };

  const renderDrops = (drops: NpcDropDto[]) => {
    if (!Array.isArray(drops) || drops.length === 0) {
      return <Text size="sm" className="text-white/60">-</Text>;
    }

    // clean: mostra até 2 drops (estilo tibia), e o restante vira “+X”
    const maxShow = 2;
    const show = drops.slice(0, maxShow);
    const rest = drops.length - show.length;

    return (
      <div className="flex flex-col gap-2">
        {show.map((drop, idx) => {
          const d: any = drop;
          const icon = typeof d.Icon === 'string' ? d.Icon : '';
          const label =
            typeof d.ItemName === 'string'
              ? d.ItemName
              : typeof d.ItemId === 'string'
                ? d.ItemId
                : '-';

          const chance = typeof d.Chance === 'number' ? d.Chance : 0;
          const minQ = typeof d.MinQuantity === 'number' ? d.MinQuantity : 0;
          const maxQ = typeof d.MaxQuantity === 'number' ? d.MaxQuantity : 0;

          return (
            <div key={`${label}-${idx}`} className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 p-1">
                {icon ? (
                  <Image alt={label} src={`/items/${icon}`} width={32} height={32} quality={100} />
                ) : (
                  <div className="h-8 w-8" />
                )}
              </div>

              <Text size="sm" className="text-white/80">
                {label} • {chance}%
                {minQ || maxQ ? ` • ${minQ}-${maxQ}` : ''}
              </Text>
            </div>
          );
        })}

        {rest > 0 && (
          <Text size="sm" className="text-white/60">
            +{rest} drop(s)
          </Text>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white/5 uppercase text-white/70 backdrop-blur">
            <tr>
              <th className="px-4 py-3">
                <SortHeader label="NPC" keyName="name" />
              </th>

              <th className="px-4 py-3 text-center">
                <SortHeader label="EXP" keyName="experience" align="center" />
              </th>

              <th className="px-4 py-3 text-center">
                <SortHeader label="Spawn" keyName="spawn" align="center" />
              </th>

              <th className="px-4 py-3">
                <SortHeader label="Stats" keyName="atk" />
              </th>

              <th className="px-4 py-3">
                <SortHeader label="Vitals" keyName="hp" />
              </th>

              <th className="px-4 py-3">
                <SortHeader label="Drops" keyName="drops" />
              </th>
            </tr>
          </thead>

          <tbody>
            {pageItems.map((npc: any, idx: number) => {
              const rowBg = idx % 2 === 0 ? 'bg-black/15' : 'bg-black/25';

              const globalIndex = startIndex + idx;
              const key = `${npc?.Id ?? npc?.Name ?? 'npc'}-${globalIndex}`;

              return (
                <tr key={key} className={`border-t border-white/10 ${rowBg}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 p-1">
                        <Image
                          alt={npc?.Name ?? 'NPC'}
                          src={`/items/${npc?.Sprite}`}
                          width={32}
                          height={32}
                          quality={100}
                        />
                      </div>

                      <div className="min-w-0">
                        <Text className="truncate text-white">{npc?.Name ?? '-'}</Text>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Text size="sm" className="text-white/80">
                      {toNum(npc?.Experience, 0)}
                    </Text>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <Text size="sm" className="text-white/80">
                      {Math.round(toNum(npc?.SpawnDuration, 0) / 1000)}s
                    </Text>
                  </td>

                  <td className="px-4 py-3">{renderStats(npc)}</td>
                  <td className="px-4 py-3">{renderVitals(npc)}</td>
                  <td className="px-4 py-3">{renderDrops(npc?.Drops)}</td>
                </tr>
              );
            })}

            {/* altura fixa */}
            {emptyRowsCount > 0 &&
              Array.from({ length: emptyRowsCount }).map((_, i) => (
                <tr
                  key={`empty-${startIndex}-${i}`}
                  className="border-t border-white/10 bg-black/10"
                >
                  <td className="px-4 py-3" colSpan={6}>
                    <div className="h-6" />
                  </td>
                </tr>
              ))}

            {/* vazio */}
            {filtered.length === 0 && (
              <tr className="border-t border-white/10 bg-black/10">
                <td className="px-4 py-6" colSpan={6}>
                  <Text className="text-white/70">Nenhum NPC encontrado.</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-3 py-2">
        <Text size="sm" className="text-white/60">
          {filtered.length} npcs
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
