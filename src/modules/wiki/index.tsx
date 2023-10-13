import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Body from './components/body';
import { ActivityWiki } from '@pages/wiki';
import { Filter, Items } from '@interfaces/items';

interface Props {
  activityWiki: ActivityWiki;
  callback(e: ActivityWiki): void;
  items: Items;
}

export default function WikiPage({
  activityWiki,
  callback,
  items
}: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({ category: 1, rarity: 0 });
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
        />
        <Body filter={filter} items={items} activityWiki={activityWiki} />
      </div>
    </div>
  );
}
