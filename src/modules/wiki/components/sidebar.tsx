import React, { ReactElement } from 'react';
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
          <div className="flex flex-col gap-3">
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="items"
                type="text"
                placeholder="Pesquisar item"
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

            <div className="grid grid-cols-1 gap-3">
              <select
                value={String(filter.category)}
                onChange={e =>
                  search({
                    category: parseInt(e.target.value, 10),
                    rarity: filter.rarity,
                    search: filter.search
                  })
                }
                className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white/80 outline-none transition focus:border-white/20"
              >
                <option value={1}>Equipamento</option>
                <option value={0}>Indefinido</option>
                <option value={2}>Consumível</option>
                <option value={3}>Moeda</option>
                <option value={4}>Magia</option>
                <option value={5}>Evento</option>
                <option value={6}>Mochila</option>
              </select>

              <select
                value={String(filter.rarity)}
                onChange={e =>
                  search({
                    category: filter.category,
                    rarity: parseInt(e.target.value, 10),
                    search: filter.search
                  })
                }
                className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white/80 outline-none transition focus:border-white/20"
              >
                <option value={0}>Todas raridades</option>
                <option value={1}>Comum</option>
                <option value={2}>Incomum</option>
                <option value={3}>Raro</option>
                <option value={4}>Épico</option>
                <option value={5}>Lendário</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col gap-3">
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="npcs"
                type="text"
                placeholder="Pesquisar NPC (nome ou drop)"
                value={filterNpc.search}
                onChange={e => searchNpc({ search: e.target.value })}
              />
            </TextInput.Root>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-3">
            <TextInput.Root>
              <TextInput.Icon>
                <MagnifyingGlass />
              </TextInput.Icon>
              <TextInput.Input
                id="crafts"
                type="text"
                placeholder="Pesquisar craft"
                value={filterCraft.search}
                onChange={e => searchCraft({ search: e.target.value })}
              />
            </TextInput.Root>
          </div>
        );

      default:
        return null;
    }
  };

  const CategoryButtons = () => (
    <div className="flex flex-col gap-2">
      {data.map((item, key) => {
        const isActive = activityWiki.index === item.index;

        return (
          <button
            key={key}
            onClick={() => callback(item)}
            type="button"
            className={`flex h-10 items-center justify-between rounded-lg border px-3 text-sm transition
              ${isActive
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-white/10 bg-black/20 text-white/80 hover:bg-black/30'
              }`}
          >
            <span className="truncate">{item.key}</span>
            {isActive && (
              <span className="ml-3 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                ativo
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex flex-col gap-4">
          <div>
            <Text size="lg" className="text-white">
              Categorias
            </Text>
            <div className="mt-3">
              <CategoryButtons />
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <Text size="lg" className="text-white">
              Filtros
            </Text>
            <div className="mt-3">{handleFilters()}</div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-30 bg-black/60" />

          <div className="fixed left-0 top-0 z-40 h-full w-[85vw] max-w-sm border-r border-white/10 bg-[#0b0f17] p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <Text size="lg" className="text-white">
                Wiki
              </Text>
              <Text size="sm" className="text-white/60">
                filtros
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Text size="lg" className="text-white">
                  Categorias
                </Text>
                <div className="mt-3">
                  <CategoryButtons />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Text size="lg" className="text-white">
                  Filtros
                </Text>
                <div className="mt-3">{handleFilters()}</div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Text size="sm" className="text-white/60">
                  Dica: toque em uma categoria e volte para a lista.
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
