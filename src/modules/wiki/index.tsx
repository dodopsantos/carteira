import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Body from './components/body';
import { ActivityWiki } from '@pages/wiki';
import { Filter, Items } from '@interfaces/items';
import { FilterNpc, Npcs } from '@interfaces/npcs';
import { Crafts, FilterCrafts } from '@interfaces/crafts';

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

  return (
    <div className="w-full">
      {/* Header mantém a ação do toggle */}
      <Header activityWiki={activityWiki} toggle={() => setOpen(!open)} />

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3 shadow-sm">
              <Sidebar
                open={open}
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
          <section className="col-span-12 lg:col-span-9">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3 shadow-sm">
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
    </div>
  );
}
