import { Text } from '@components/Text';
import { Tooltip } from '@components/Tooltip';
import { Entities, Items } from '@interfaces/items';
import { ActivityWiki } from '@pages/wiki';
import IconFromItemId from '@utils/data/iconFromName';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';

interface Props {
  items: Items;
}

export default function GridItems({ items: getItems }: Props): ReactElement {
  const [items, setItems] = useState<Entities[]>(null);
  const [pagination, setPagination] = useState<number>(1);
  const totalPages = Array.from(Array(getItems.entries.length / 10).keys());

  const handlePagination = () => {
    let formatted = getItems.entries.slice(
      (pagination - 1) * 10,
      pagination * 10
    );
    setItems(formatted);
  };

  const handleCategory = (category: number) => {
    switch (category) {
      case 0:
        return '-';
      case 1:
        return 'Equipamento';
      case 2:
        return 'Consumivel';
      case 3:
        return 'Moeda';
      case 4:
        return 'Spell';
      case 5:
        return 'Evento';
      case 6:
        return 'Mochila';

      default:
        return '-';
    }
  };

  const handleRarity = (category: number) => {
    switch (category) {
      case 0:
        return <Text>-</Text>;
      case 1:
        return <Text className="text-[#808080]">Comum</Text>;
      case 2:
        return <Text className="text-[#ff0000]">Incomum</Text>;
      case 3:
        return <Text className="text-[#0000ff]">Raro</Text>;
      case 4:
        return <Text className="text-[#00ff00]">Épico</Text>;
      case 5:
        return <Text className="text-[#ffff00]">Lendário</Text>;

      default:
        return <Text>-</Text>;
    }
  };

  const handleAttributes = (attributes: Array<number>) => {
    console.log(attributes);
    if (!attributes) return <></>;
    return (
      <>
        <Text>
          <p>Força: {attributes[0]}</p>
        </Text>
        <Text>
          <p>Magia: {attributes[1]}</p>
        </Text>
        <Text>
          <p>Defesa: {attributes[2]}</p>
        </Text>
        <Text>
          <p>D.magica: {attributes[3]}</p>
        </Text>
        <Text>
          <p>Agilidade: {attributes[4]}</p>
        </Text>
      </>
    );
  };

  useEffect(() => {
    handlePagination();
  }, [pagination]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-50 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">
                <Text size="lg">Nome do item</Text>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text size="lg">Icone</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text size="lg">Categoria</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text size="lg">Atributos</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text size="lg">Raridade</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, idx) => {
            return (
              <tr key={idx} className="border-b bg-gray-700/90">
                <th scope="row" className="whitespace-nowrap px-6 py-4">
                  <Text>{item.Value.Name}</Text>
                </th>
                <td className="px-6 py-4">
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
                </td>
                <td className="px-6 py-4">
                  <Text>{handleCategory(item.Value.ItemType)}</Text>
                </td>
                <td className="px-6 py-4">
                  {item.Value.ItemType === 1 ? (
                    handleAttributes(item.Value.StatsGiven)
                  ) : (
                    <Text>-</Text>
                  )}
                </td>
                <td className="px-6 py-4">{handleRarity(item.Value.Rarity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex items-center justify-between p-2"
        aria-label="Table navigation"
      >
        <Text>
          Mostrando
          <Text> 1-10 </Text>
          <Text>de </Text>
          <Text>{getItems.total}</Text>
        </Text>
        <ul className="inline-flex gap-1">
          {totalPages.map((_, idx) => {
            return (
              <li className="cursor-pointer bg-teal-800">
                <Text asChild>
                  <a
                    onClick={() => setPagination(idx + 1)}
                    className="border-gray-300 flex h-8 items-center justify-center border bg-white px-3 leading-tight hover:bg-gray-100 hover:text-gray-700"
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
