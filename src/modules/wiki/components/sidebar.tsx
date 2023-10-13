import React, { ReactElement, useState } from 'react';
import { Text } from '@components/Text';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';
import { Filter } from '@interfaces/items';
import { TextInput } from '@components/TextInput';
import { MagnifyingGlass } from 'phosphor-react';

interface Props {
  activityWiki: ActivityWiki;
  callback(e: ActivityWiki): void;
  open: boolean;
  search(e: Filter): void;
  filter: Filter;
}

export default function Sidebar({
  activityWiki,
  open,
  callback,
  search,
  filter
}: Props): ReactElement {
  return (
    <>
      {/* Desktop */}
      <div className="hidden w-1/6 flex-col gap-4 border-4 border-double border-teal-700 bg-gray-700 p-4 lg:flex">
        <Text size="lg">Categorias</Text>
        {data.map((item, key) => (
          <Text
            key={key}
            size="lg"
            asChild
            className={`${activityWiki.index === item.index && 'text-hollow'}`}
          >
            <button
              onClick={() => callback(item)}
              type="button"
              className="rounded-lg bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:shadow-lg dark:shadow-teal-800/80 dark:focus:ring-teal-800"
            >
              {item.key}
            </button>
          </Text>
        ))}
        <div className="my-2 border-2 border-teal-600" />
        <Text size="lg">Filtros</Text>
        <TextInput.Root>
          <TextInput.Icon>
            <MagnifyingGlass />
          </TextInput.Icon>
          <TextInput.Input
            id="username"
            type="text"
            placeholder="Pesquisa por nome"
          />
        </TextInput.Root>

        <select
          onChange={e =>
            search({
              category: parseInt(e.target.value),
              rarity: filter.rarity
            })
          }
          className=" rounded-lg bg-teal-700 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none"
        >
          <option value={1} selected>
            Equipamento
          </option>
          <option value={2}>United States</option>
          <option value={3}>Canada</option>
          <option value={4}>France</option>
          <option value={5}>Germany</option>
        </select>
        <select
          onChange={e =>
            search({
              category: filter.category,
              rarity: parseInt(e.target.value)
            })
          }
          className=" rounded-lg bg-teal-700 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none"
        >
          <option value={0} selected>
            Todos
          </option>
          <option value={1}>Comum</option>
          <option value={2}>Incomum</option>
          <option value={3}>Raro</option>
          <option value={4}>Épico</option>
          <option value={5}>Lendário</option>
        </select>
      </div>
      {/* Mobile */}
      {open && (
        <div className="flex w-1/6 flex-col justify-center border-4 border-double border-teal-700 bg-gray-800 lg:hidden">
          {data.map((item, key) => (
            <Text
              key={key}
              size="lg"
              asChild
              className={`${
                activityWiki.index === item.index && 'text-quincy'
              }`}
            >
              <button onClick={() => callback(item)}>{item.key}</button>
            </Text>
          ))}
        </div>
      )}
    </>
  );
}
