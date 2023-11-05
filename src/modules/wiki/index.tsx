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
  const [filterNpc, setFilterNpc] = useState<FilterNpc>({
    search: ''
  });
  const [filterCraft, setFilterCraft] = useState<FilterCrafts>({
    search: ''
  });

  return (
    <div className="min-h-screen bg-gray-800">
      <Header activityWiki={activityWiki} toggle={() => setOpen(!open)} />
      <div className="flex">
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
    </div>
  );
}
