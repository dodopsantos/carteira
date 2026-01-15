import { Text } from '@components/Text';
import { Filter, Items } from '@interfaces/items';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

interface Props {
  items: Items;   // agora é array
  filter: Filter; // category(number), rarity(number), search(string)
}

// Ajuste esse map para os ItemType reais do seu backend:
// Ex: "Equipment", "Consumable", "Resource", "Spell", etc.
const ITEM_TYPE_BY_CATEGORY: Record<number, string | null> = {
  1: 'Equipment',     // exemplo
  2: 'Consumable',    // exemplo
  3: 'Resource',      // exemplo
  4: 'Quest',         // exemplo
  0: null
};

export default function GridItems({ items: allItems, filter }: Props): ReactElement {
  const [pagination, setPagination] = useState<number>(1);
  const [pageItems, setPageItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const typeFilter = ITEM_TYPE_BY_CATEGORY[filter.category] ?? null;

  const filtered = useMemo(() => {
    const search = (filter.search ?? '').toLowerCase();

    return (allItems ?? []).filter((x: any) => {
      // rarity
      if (filter.rarity !== 0 && x.Rarity !== filter.rarity) return false;

      // item type (string)
      if (typeFilter && x.ItemType !== typeFilter) return false;

      // search
      if (search && !String(x.Name ?? '').toLowerCase().includes(search))
        return false;

      return true;
    });
  }, [allItems, filter.rarity, typeFilter, filter.search]);

  useEffect(() => {
    const pages = Math.max(1, Math.ceil(filtered.length / 10));
    setTotalPages(Array.from({ length: pages }, (_, i) => i + 1));

    // se a página atual estourou após filtrar, volta pra 1
    if ((pagination - 1) * 10 >= filtered.length) setPagination(1);

    const slice = filtered.slice((pagination - 1) * 10, pagination * 10);
    setPageItems(slice);
  }, [filtered, pagination]);

  const handleRarity = (rarity: number) => {
    switch (rarity) {
      case 0:
        return <Text>-</Text>;
      case 1:
        return <Text size="sm" className="text-[#808080]">Comum</Text>;
      case 2:
        return <Text size="sm" className="text-[#ff0000]">Incomum</Text>;
      case 3:
        return <Text size="sm" className="text-[#0000ff]">Raro</Text>;
      case 4:
        return <Text size="sm" className="text-[#00ff00]">Épico</Text>;
      case 5:
        return <Text size="sm" className="text-[#ffff00]">Lendário</Text>;
      default:
        return <Text size="sm">-</Text>;
    }
  };

  const renderStats = (item: any) => {
    // No backend você tem:
    // VitalsGiven: number[]
    // VitalsRegen: number[]
    // StatsGiven: number[]
    const vitals = item.VitalsGiven ?? [];
    const regen = item.VitalsRegen ?? [];
    const stats = item.StatsGiven ?? [];

    return (
      <>
        <td className="px-6 py-4">
          <Text size="sm">HP {vitals[0] ?? 0}, MP {vitals[1] ?? 0}</Text>
        </td>
        <td className="px-6 py-4">
          <Text size="sm">HP {regen[0] ?? 0}, MP {regen[1] ?? 0}</Text>
        </td>
        <td className="px-6 py-4">
          <Text size="sm">
            ATK {stats[0] ?? 0}, AP {stats[1] ?? 0}, DEF {stats[2] ?? 0}, MR {stats[3] ?? 0}, SPD {stats[4] ?? 0}
          </Text>
        </td>
      </>
    );
  };

  const renderDetails = (item: any) => {
    // fallback simples, já que Description não existe no DTO
    return (
      <td className="px-6 py-4">
        <Text size="sm">
          Dmg {item.Damage ?? 0} | Crit {item.CritChance ?? 0}% | Speed {item.Speed ?? 0}
        </Text>
      </td>
    );
  };

  const showStatsCols = filter.category === 1; // mantém seu comportamento antigo

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                <Text>Nome do item</Text>
              </div>
            </th>

            <th scope="col" className="px-6 py-3">
              <Text>Raridade</Text>
            </th>

            {showStatsCols ? (
              <>
                <th scope="col" className="px-6 py-3"><Text>Sobrevivência</Text></th>
                <th scope="col" className="px-6 py-3"><Text>Regeneração</Text></th>
                <th scope="col" className="px-6 py-3"><Text>Atributos</Text></th>
              </>
            ) : (
              <th scope="col" className="px-6 py-3">
                <Text>Detalhes</Text>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {pageItems.map((item: any, idx: number) => (
            <tr key={`${item.Id ?? item.Name ?? idx}`} className="border-b bg-gray-700">
              <th className="flex items-center gap-2 px-6 py-4">
                <div className="h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]">
                  <Image
                    alt={item.Name}
                    src={`/items/${item.Icon}`}
                    width={32}
                    height={32}
                    quality={100}
                  />
                </div>
                <Text>{item.Name}</Text>
              </th>

              <td className="px-6 py-4">{handleRarity(item.Rarity)}</td>

              {showStatsCols ? renderStats(item) : renderDetails(item)}
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
