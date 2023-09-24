import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Body from './components/body';
import { ActivityWiki } from '@pages/wiki';
import { Items } from '@interfaces/items';

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
  return (
    <div className="min-h-screen bg-gray-800">
      <Header activityWiki={activityWiki} />
      <div className="flex">
        <Sidebar
          activityWiki={activityWiki}
          callback={(e: ActivityWiki) => callback(e)}
        />
        <Body items={items} activityWiki={activityWiki} />
      </div>
    </div>
  );
}
