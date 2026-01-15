import { Text } from '@components/Text';
import { FilterNpc, Npcs, NpcPublicDto, NpcDropDto } from '@interfaces/npcs';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

interface Props {
  npcs: Npcs; // agora é NpcPublicDto[]
  filter: FilterNpc;
}

export default function GridNPCs({ npcs: allNpcs, filter }: Props): ReactElement {
  const [pagination, setPagination] = useState<number>(1);
  const [pageItems, setPageItems] = useState<NpcPublicDto[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const filtered = useMemo(() => {
    const q = (filter.search ?? '').toLowerCase();

    return (allNpcs ?? []).filter((npc) => {
      const nameMatch = (npc.Name ?? '').toLowerCase().includes(q);

      const dropsMatch =
        Array.isArray(npc.Drops) &&
        npc.Drops.some((d) => {
          const id = (d as any)?.ItemId;
          const itemName = (d as any)?.ItemName;
          return (
            (typeof id === 'string' && id.toLowerCase().includes(q)) ||
            (typeof itemName === 'string' && itemName.toLowerCase().includes(q))
          );
        });

      return q ? nameMatch || dropsMatch : true;
    });
  }, [allNpcs, filter.search]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / 10));
    setTotalPages(Array.from({ length: pages }, (_, i) => i + 1));

    // se a página atual estourou após filtrar, volta pra 1
    if ((pagination - 1) * 10 >= filtered.length) setPagination(1);

    const slice = filtered.slice((pagination - 1) * 10, pagination * 10);
    setPageItems(slice);
  }, [filtered, pagination]);

  const handleAttributes = (stats: any) => {
    if (!stats) return <Text size="sm">-</Text>;

    // Backend dto: Stats é objeto
    const atk = stats.Attack ?? 0;
    const ap = stats.AbilityPower ?? 0;
    const def = stats.Defense ?? 0;
    const mr = stats.MagicResist ?? 0;
    const spd = stats.Speed ?? 0;

    return (
      <Text size="sm">
        ATK {atk}, AP {ap}, DEF {def}, MR {mr}, SPD {spd}
      </Text>
    );
  };

  const handleVitals = (vitals: any) => {
    if (!vitals) return <Text size="sm">-</Text>;

    // Backend dto: MaxVitals é objeto
    const hp = vitals.Health ?? 0;
    const mp = vitals.Mana ?? 0;

    return (
      <Text size="sm">
        HP {hp}, MP {mp}
      </Text>
    );
  };

  const handleDrops = (drops: NpcDropDto[]) => {
    if (!Array.isArray(drops) || drops.length === 0) return <Text size="sm">-</Text>;

    return (
      <div className="flex flex-col gap-2">
        {drops.map((drop, idx) => {
          const d: any = drop; // drop tem Icon/ItemName opcionais (enriquecidos na page)
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
            <div key={idx} className="flex items-center gap-2">
              <div className="h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]">
                {icon ? (
                  <Image alt={label} src={`/items/${icon}`} width={32} height={32} quality={100} />
                ) : (
                  <div className="h-8 w-8" />
                )}
              </div>

              <Text size="sm">
                Item: {label}, Chance: {chance}%{minQ || maxQ ? `, Qtd: ${minQ}-${maxQ}` : ''}
              </Text>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                <Text>Nome do NPC</Text>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Experiência</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Spawn</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Estatísticas</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Sobrevivência</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Drops</Text>
            </th>
          </tr>
        </thead>

        <tbody>
          {pageItems.map((npc, idx) => (
            <tr key={`${npc.Name}-${idx}`} className="border-b bg-gray-700">
              <th className="flex items-center gap-2 px-6 py-4">
                <div className="h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]">
                  {/* NPC usa Sprite no backend, não Icon */}
                  <Image
                    alt={npc.Name}
                    src={`/items/${npc.Sprite}`}
                    width={32}
                    height={32}
                    quality={100}
                  />
                </div>

                <Text>{npc.Name}</Text>
              </th>

              <td className="px-6 py-4">
                <Text>{npc.Experience}</Text>
              </td>

              <td className="px-6 py-4">
                <Text>{Math.round((npc.SpawnDuration ?? 0) / 1000)}s</Text>
              </td>

              <td className="px-6 py-4">{handleAttributes(npc.Stats)}</td>

              <td className="px-6 py-4">{handleVitals(npc.MaxVitals)}</td>

              <td className="px-6 py-4">{handleDrops(npc.Drops)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="flex items-center justify-end p-2" aria-label="Table navigation">
        <ul className="inline-flex gap-1">
          {totalPages.map((page) => (
            <li key={page} className="cursor-pointer bg-teal-800">
              <Text asChild>
                <a
                  onClick={() => setPagination(page)}
                  className={`${pagination === page && 'bg-gray-100 text-gray-700'
                    } flex h-8 items-center justify-center border border-teal-300 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700`}
                >
                  {page}
                </a>
              </Text>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
