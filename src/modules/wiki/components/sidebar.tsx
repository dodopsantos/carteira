import React, { ReactElement } from 'react';
import { Text } from '@components/Text';
import data from '@utils/data/wiki.json';
import { ActivityWiki } from '@pages/wiki';
import { Filter } from '@interfaces/items';
import { TextInput } from '@components/TextInput';
import { Select } from '@components/Select';
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
              <Select
                value={String(filter.category)}
                onChange={e =>
                  search({
                    category: parseInt(e.target.value, 10),
                    rarity: filter.rarity,
                    search: filter.search
                  })
                }
                options={[
                  { label: 'Equipamento', value: 1 },
                  { label: 'Indefinido', value: 0 },
                  { label: 'Consumível', value: 2 },
                  { label: 'Moeda', value: 3 },
                  { label: 'Magia', value: 4 },
                  { label: 'Evento', value: 5 },
                  { label: 'Mochila', value: 6 },
                ]}
              />

              <Select
                value={String(filter.rarity)}
                onChange={e =>
                  search({
                    category: filter.category,
                    rarity: parseInt(e.target.value, 10),
                    search: filter.search
                  })
                }
                options={[
                  { label: 'Todas raridades', value: 0 },
                  { label: 'Comum', value: 1 },
                  { label: 'Incomum', value: 2 },
                  { label: 'Raro', value: 3 },
                  { label: 'Épico', value: 4 },
                  { label: 'Lendário', value: 5 },
                ]}
              />
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

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <Text className="mb-2 px-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
      {children}
    </Text>
  );

  const CategoryButtons = () => (
    <div className="flex flex-col gap-1.5">
      {data.map((item, key) => {
        const isActive = activityWiki.index === item.index;
        return (
          <button
            key={key}
            onClick={() => callback(item)}
            type="button"
            className={`flex h-10 items-center justify-between rounded-xl border px-3 text-sm font-medium transition-colors
              ${isActive
                ? 'border-teal-500/40 bg-teal-500/15 text-slate-100'
                : 'border-transparent text-slate-200 hover:bg-white/5 hover:border-white/10'
              }`}
          >
            <span className="truncate">{item.key}</span>
            {isActive && (
              <span className="ml-3 rounded-full border border-teal-500/30 bg-teal-500/20 px-2 py-0.5 text-[10px] font-semibold text-teal-300">
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
            <SectionLabel>Categorias</SectionLabel>
            <CategoryButtons />
          </div>

          <div className="border-t border-white/10 pt-4">
            <SectionLabel>Filtros</SectionLabel>
            <div>{handleFilters()}</div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-30 bg-black/70" />

          <div className="fixed left-0 top-0 z-40 h-full w-[85vw] max-w-sm border-r border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-teal-300">
                  Sword of Fate
                </span>
                <div className="mt-0.5 text-base font-semibold text-slate-50">
                  Wiki
                </div>
              </div>
              <Text size="sm" className="text-slate-400">
                filtros
              </Text>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <SectionLabel>Categorias</SectionLabel>
                <CategoryButtons />
              </div>

              <div className="border-t border-white/10 pt-4">
                <SectionLabel>Filtros</SectionLabel>
                <div>{handleFilters()}</div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <Text size="sm" className="text-slate-400">
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
