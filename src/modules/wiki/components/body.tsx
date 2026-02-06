import { Items, Filter } from '@interfaces/items';
import { ActivityWiki } from '@pages/wiki';
import React, { ReactElement } from 'react';
import GridItems from './_gridItems';
import { FilterNpc, Npcs } from '@interfaces/npcs';
import GridNPCs from './_gridNpcs';
import { Crafts, FilterCrafts } from '@interfaces/crafts';
import GridCrafts from './_gridCrafts';

interface Props {
  activityWiki: ActivityWiki;
  items: Items;
  npcs: Npcs;
  filter: Filter;
  filterNpc: FilterNpc;
  crafts: Crafts;
  filterCraft: FilterCrafts;
}

export default function Body({
  activityWiki,
  items,
  filter,
  npcs,
  filterNpc,
  crafts,
  filterCraft
}: Props): ReactElement {
  return (
    <div className="w-full">
      {activityWiki.index === 0 && <GridItems filter={filter} items={items} />}
      {activityWiki.index === 1 && <GridNPCs filter={filterNpc} npcs={npcs} />}
      {activityWiki.index === 2 && (
        <GridCrafts filter={filterCraft} crafts={crafts} />
      )}
    </div>
  );
}
