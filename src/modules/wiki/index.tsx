import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Body from './components/body';
import { ActivityWiki } from '@pages/wiki';
import { Filter, Items } from '@interfaces/items';
import { FilterNpc, Npcs } from '@interfaces/npcs';
import { Crafts, FilterCrafts } from '@interfaces/crafts';
import Navbar from '@components/layout/components/Navbar';
import data from '@utils/data/wiki.json';
import { Text } from '@components/Text';
import { Heading } from '@components/Heading';

interface Props {
  activityWiki: ActivityWiki;
  callback(e: ActivityWiki): void;
  items: Items;
  npcs: Npcs;
  crafts: Crafts;
}

export default function WikiPage({
  activityWiki,
  callback,
  items,
  npcs,
  crafts
}: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<Filter>({
    category: 1,
    rarity: 0,
    search: ''
  });

  const [filterNpc, setFilterNpc] = useState<FilterNpc>({ search: '' });
  const [filterCraft, setFilterCraft] = useState<FilterCrafts>({ search: '' });

  const title = data?.[activityWiki.index]?.key ?? 'Wiki';

  return (
    <div className="relative min-h-screen bg-[url('/backgroundNews.webp')] bg-cover bg-top">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />

      {/* Navbar global */}
      <Navbar />

      <div className="relative z-10 w-full pt-[76px]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6">

          {/* Breadcrumb + título inline — sem faixa separada */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Botão hamburguer mobile */}
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500/30 lg:hidden"
                aria-label="Abrir filtros"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div>
                <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">
                  Wiki &gt; {title}
                </Text>
                <Heading size="lg" className="mt-0.5 text-xl font-extrabold uppercase tracking-wide text-white">
                  {title}
                </Heading>
              </div>
            </div>

            <span className="hidden lg:inline-flex rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300">
              Sword of Fate Wiki
            </span>
          </div>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">

            {/* Sidebar desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-black/80 p-4 shadow-lg shadow-black/50 backdrop-blur">
                <Sidebar
                  open={false}
                  activityWiki={activityWiki}
                  callback={(e: ActivityWiki) => callback(e)}
                  search={(e: Filter) => setFilter(e)}
                  filter={filter}
                  searchNpc={(e: FilterNpc) => setFilterNpc(e)}
                  filterNpc={filterNpc}
                  searchCraft={(e: FilterCrafts) => setFilterCraft(e)}
                  filterCraft={filterCraft}
                />
              </div>
            </aside>

            {/* Body */}
            <section className="lg:col-span-9">
              <div className="rounded-2xl border border-white/10 bg-black/80 p-4 shadow-lg shadow-black/50 backdrop-blur">
                <Body
                  filter={filter}
                  items={items}
                  filterNpc={filterNpc}
                  npcs={npcs}
                  filterCraft={filterCraft}
                  crafts={crafts}
                  activityWiki={activityWiki}
                />
              </div>
            </section>

          </div>
        </div>

        {/* Drawer mobile */}
        <div className="lg:hidden">
          <Sidebar
            open={open}
            activityWiki={activityWiki}
            callback={(e: ActivityWiki) => { callback(e); setOpen(false); }}
            search={(e: Filter) => setFilter(e)}
            filter={filter}
            searchNpc={(e: FilterNpc) => setFilterNpc(e)}
            filterNpc={filterNpc}
            searchCraft={(e: FilterCrafts) => setFilterCraft(e)}
            filterCraft={filterCraft}
          />
        </div>
      </div>
    </div>
  );
}
