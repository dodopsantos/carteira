import { Text } from '@components/Text';
import { FilterNpc, Npcs, Entities, Item } from '@interfaces/npcs';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
interface Props {
  npcs: Npcs;
  filter: FilterNpc;
}

export default function GridNPCs({
  npcs: getItems,
  filter
}: Props): ReactElement {
  const [items, setItems] = useState<Entities[]>(getItems.entries);
  const [pagination, setPagination] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<Array<any>>(
    Array.from(Array(getItems.entries.length / 10).keys())
  );

  const handlePagination = () => {
    let filtered = getItems.entries.filter(x => {
      return (
        x.Value.Name.toLocaleLowerCase().includes(
          filter.search.toLocaleLowerCase()
        ) ||
        x.Value.Drops.find(x =>
          x.ItemId.toLocaleLowerCase().includes(
            filter.search.toLocaleLowerCase()
          )
        )
      );
    });

    setTotalPages(Array.from(Array(Math.ceil(filtered.length / 10)).keys()));

    let formatted = filtered.slice((pagination - 1) * 10, pagination * 10);
    if (formatted.length === 0) setPagination(1);
    setItems(formatted);
  };

  const handleAttributes = (attributes: Array<number>) => {
    if (!attributes) return <></>;
    return (
      <>
        <Text size="sm">For+ {attributes[0]}, </Text>
        <Text size="sm">Mag+ {attributes[1]}, </Text>
        <Text size="sm">Def+ {attributes[2]}, </Text>
        <Text size="sm">D.mag+ {attributes[3]} </Text>
      </>
    );
  };

  const handleVitals = (attributes: Array<number>) => {
    if (!attributes) return <></>;
    return (
      <>
        <Text size="sm">HP {attributes[0]}, </Text>
        <Text size="sm">MP {attributes[1]} </Text>
      </>
    );
  };

  const handleDrops = (attributes: Array<Item>) => {
    if (!attributes.length) return <Text size="sm">-</Text>;
    return attributes.map((item, idx) => {
      return (
        <>
          <Text size="sm">
            <p className="flex items-center">
              <div
                key={idx}
                className="mr-2 h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]"
              >
                <Image
                  key={idx}
                  alt={item.Icon}
                  src={`/items/${item.Icon}`}
                  width={32}
                  height={32}
                  quality={100}
                />
              </div>
              Item: {item.ItemId}, Chance: {item.Chance}%
            </p>
          </Text>
        </>
      );
    });
  };

  useEffect(() => {
    handlePagination();
  }, [pagination, filter]);

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
              <Text>Estatisticas</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Sobrevivencia</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Drops</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, idx) => {
            return (
              <tr key={idx} className="border-b bg-gray-700">
                <th className="flex items-center gap-2 px-6 py-4">
                  <div
                    key={idx}
                    className="h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]"
                  >
                    <Image
                      key={idx}
                      alt={item.Value.Name}
                      src={`/items/${item.Value.Icon}`}
                      width={32}
                      height={32}
                      quality={100}
                    />
                  </div>
                  <Text>{item.Value.Name}</Text>
                </th>
                <td className="px-6 py-4">
                  <Text>{item.Value.Experience}</Text>
                </td>
                <td className="px-6 py-4">
                  <Text>{item.Value.SpawnDuration / 1000}s</Text>
                </td>
                <td className="px-6 py-4">
                  {handleAttributes(item.Value.Stats)}
                </td>
                <td className="px-6 py-4">
                  {handleVitals(item.Value.MaxVital)}
                </td>
                <td className="px-6 py-4">{handleDrops(item.Value.Drops)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-end p-2"
        aria-label="Table navigation"
      >
        <ul className="inline-flex gap-1">
          {totalPages.map((_, idx) => {
            return (
              <li key={idx} className="cursor-pointer bg-teal-800">
                <Text asChild>
                  <a
                    onClick={() => setPagination(idx + 1)}
                    className={`${
                      pagination === idx + 1 && 'bg-gray-100 text-gray-700'
                    } flex h-8 items-center justify-center border border-teal-300 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {idx + 1}
                  </a>
                </Text>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
