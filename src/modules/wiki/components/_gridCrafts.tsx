import { Text } from '@components/Text';
import { Crafts, FilterCrafts, Entities, Item } from '@interfaces/crafts';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
interface Props {
  crafts: Crafts;
  filter: FilterCrafts;
}

export default function GridCrafts({
  crafts: getItems,
  filter
}: Props): ReactElement {
  const [items, setItems] = useState<Entities[]>(getItems.entries);
  const [pagination, setPagination] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<Array<any>>(
    Array.from(Array(Array.from(Array(10).keys())).keys())
  );

  const handlePagination = () => {
    let filtered = getItems.entries.filter(x => {
      return (
        x.Value.Name.toLocaleLowerCase().includes(
          filter.search.toLocaleLowerCase()
        ) ||
        x.Value.Ingredients.find(x =>
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

  const handleIngredients = (attributes: Array<Item>) => {
    if (!attributes.length) return <Text size="sm">-</Text>;
    return attributes.map((item, idx) => {
      return (
        <div key={idx} className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded border-2 border-solid border-[#353D4E] bg-[#273142]">
            <Image
              key={idx}
              alt={item.Icon}
              src={`/items/${item.Icon}`}
              width={32}
              height={32}
              quality={100}
            />
          </div>
          <Text size="sm">
            {item.Quantity}x {item.ItemId}
          </Text>
        </div>
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
                <Text>Nome do Item</Text>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Tempo</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>% de falha</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Itens perdidos na falha</Text>
            </th>
            <th scope="col" className="px-6 py-3">
              <Text>Ingredientes</Text>
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
                  <Text>{item.Value.Time / 1000}s</Text>
                </td>
                <td className="px-6 py-4">
                  <Text>{item.Value.FailureChance}%</Text>
                </td>
                <td className="px-6 py-4">
                  <Text>{item.Value.ItemLossChance}%</Text>
                </td>
                <td className="px-6 py-4">
                  {handleIngredients(item.Value.Ingredients)}
                </td>
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
