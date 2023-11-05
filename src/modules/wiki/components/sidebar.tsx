import React, { ReactElement, useEffect, useState } from 'react';
import { Text } from '@components/Text';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';
import { Filter } from '@interfaces/items';
import { TextInput } from '@components/TextInput';
import { MagnifyingGlass } from 'phosphor-react';
import { FilterNpc } from '@interfaces/npcs';
import { FilterCrafts } from '@interfaces/crafts';

interface Props {
  activityWiki: ActivityWiki;
  callback(e: ActivityWiki): void;
  open: boolean;

  search(e: Filter): void;
  filter: Filter;

  searchNpc(e: FilterNpc): void;
  filterNpc: FilterNpc;

  searchCraft(e: FilterCrafts): void;
  filterCraft: FilterCrafts;
}

export default function Sidebar({
  activityWiki,
  open,
  callback,

  search,
  filter,

  searchNpc,
  filterNpc,

  searchCraft,
  filterCraft
}: Props): ReactElement {
  const handleFilters = () => {
    switch (activityWiki.index) {
      case 0:
        return (
          <>
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="items"
                type="text"
                placeholder="Pesquisa por nome"
                value={filter.search}
                onChange={e => {
                  search({
                    category: filter.category,
                    rarity: filter.rarity,
                    search: e.target.value
                  });
                }}
              />
            </TextInput.Root>

            <select
              value={filter.category.toString()}
              onChange={e =>
                search({
                  category: parseInt(e.target.value),
                  rarity: filter.rarity,
                  search: filter.search
                })
              }
              className=" rounded-lg bg-teal-700 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none"
            >
              <option value={1} selected>
                Equipamento
              </option>
              <option value={0}>Indefinido</option>
              <option value={2}>Consumivel</option>
              <option value={3}>Moeda</option>
              <option value={4}>Magia</option>
              <option value={5}>Evento</option>
              <option value={6}>Mochila</option>
            </select>
            <select
              value={filter.rarity.toString()}
              onChange={e =>
                search({
                  category: filter.category,
                  rarity: parseInt(e.target.value),
                  search: filter.search
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
          </>
        );

      case 1:
        return (
          <>
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="npcs"
                type="text"
                placeholder="Pesquisa por nome"
                value={filterNpc.search}
                onChange={e => {
                  searchNpc({
                    search: e.target.value
                  });
                }}
              />
            </TextInput.Root>
          </>
        );

      case 2:
        return (
          <>
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="npcs"
                type="text"
                placeholder="Pesquisar nome"
                value={filterCraft.search}
                onChange={e => {
                  searchCraft({
                    search: e.target.value
                  });
                }}
              />
            </TextInput.Root>
          </>
        );

      default:
        break;
    }
  };

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
        {handleFilters()}
      </div>
      {/* Mobile */}
      {open && (
        <div className="flex w-3/6 flex-col gap-4 border-4 border-double border-teal-700 bg-gray-700 p-2 lg:hidden">
          <Text size="lg">Categorias</Text>
          {data.map((item, key) => (
            <Text
              key={key}
              size="lg"
              asChild
              className={`${
                activityWiki.index === item.index && 'text-hollow'
              }`}
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
          {handleFilters()}
        </div>
      )}
    </>
  );
}
