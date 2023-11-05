import { Text } from '@components/Text';
import { Entities, Filter, Items } from '@interfaces/items';
import { ActivityWiki } from '@pages/wiki';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
interface Props {
  items: Items;
  filter: Filter;
}

export default function GridItems({
  items: getItems,
  filter
}: Props): ReactElement {
  const [items, setItems] = useState<Entities[]>(getItems.entries);
  const [pagination, setPagination] = useState<number>(1);
  const [activityType, setActivityWiki] = useState<Number>(filter.category);
  const [totalPages, setTotalPages] = useState<Array<any>>(
    Array.from(Array(getItems.entries.length / 10).keys())
  );

  const handlePagination = () => {
    let filtered = getItems.entries.filter(x => {
      if (filter.rarity !== 0) {
        return (
          x.Value.Rarity === filter.rarity &&
          x.Value.ItemType === filter.category &&
          x.Value.Name.toLocaleLowerCase().includes(
            filter.search.toLocaleLowerCase()
          )
        );
      }
      return (
        x.Value.ItemType === filter.category &&
        x.Value.Name.toLocaleLowerCase().includes(
          filter.search.toLocaleLowerCase()
        )
      );
    });

    setTotalPages(Array.from(Array(Math.ceil(filtered.length / 10)).keys()));

    let formatted = filtered.slice((pagination - 1) * 10, pagination * 10);
    if (formatted.length === 0) setPagination(1);
    setItems(formatted);
  };

  const handleRarity = (category: number) => {
    switch (category) {
      case 0:
        return <Text>-</Text>;
      case 1:
        return (
          <Text size="sm" className="text-[#808080]">
            Comum
          </Text>
        );
      case 2:
        return (
          <Text size="sm" className="text-[#ff0000]">
            Incomum
          </Text>
        );
      case 3:
        return (
          <Text size="sm" className="text-[#0000ff]">
            Raro
          </Text>
        );
      case 4:
        return (
          <Text size="sm" className="text-[#00ff00]">
            Épico
          </Text>
        );
      case 5:
        return (
          <Text size="sm" className="text-[#ffff00]">
            Lendário
          </Text>
        );

      default:
        return <Text size="sm">-</Text>;
    }
  };

  const handleAttributes = (attributes: Array<number>) => {
    if (!attributes) return <></>;
    return (
      <>
        <Text size="sm">For+ {attributes[0]}, </Text>
        <Text size="sm">Mag+ {attributes[1]}, </Text>
        <Text size="sm">Def+ {attributes[2]}, </Text>
        <Text size="sm">D.mag+ {attributes[3]}, </Text>
        <Text size="sm">Agi+ {attributes[4]}</Text>
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

  const handleVitalsRegen = (attributes: Array<number>) => {
    if (!attributes) return <></>;
    return (
      <>
        <Text size="sm">HP {attributes[0]} %, </Text>
        <Text size="sm">MP {attributes[1]} % </Text>
      </>
    );
  };

  const handleItemType = (attributes: Entities) => {
    switch (attributes.Value.ItemType) {
      case 1:
        return (
          <>
            <td className="px-6 py-4">
              {handleVitals(attributes.Value.VitalsGiven)}
            </td>
            <td className="px-6 py-4">
              {handleVitalsRegen(attributes.Value.VitalsRegen)}
            </td>
            <td className="px-6 py-4">
              {attributes.Value.ItemType === 1 ? (
                handleAttributes(attributes.Value.StatsGiven)
              ) : (
                <Text>-</Text>
              )}
            </td>
          </>
        );

      default:
        return (
          <td className="px-6 py-4">
            <Text size="sm">{attributes.Value.Description}</Text>
          </td>
        );
    }
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
                <Text>Nome do item</Text>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Raridade</Text>
            </th>
            {filter.category === 1 ? (
              <>
                <th scope="col" className="px-6 py-3">
                  <Text>Sobrevivência</Text>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Text>Regeneração</Text>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Text>Atributos</Text>
                </th>
              </>
            ) : (
              <th scope="col" className="px-6 py-3">
                <Text>Descrição</Text>
              </th>
            )}
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
                <td className="px-6 py-4">{handleRarity(item.Value.Rarity)}</td>
                {handleItemType(item)}
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
