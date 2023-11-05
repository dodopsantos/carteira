import React, { useState } from 'react';
import WikiPage from '@modules/wiki';
import Layout from '@components/layout';
import { GetStaticProps } from 'next';
import { getAPIPublic } from '@services/axios';
import { Items } from '@interfaces/items';
import { Npcs } from '@interfaces/npcs';
import { Crafts } from '@interfaces/crafts';

export interface ActivityWiki {
  index: number;
}

interface Props {
  items: Items;
  npcs: Npcs;
  crafts: Crafts;
}

export default function Wiki({ items, npcs, crafts }: Props): JSX.Element {
  const [activityWiki, setActivityWiki] = useState<ActivityWiki>({
    index: 0
  });

  npcs.entries.map(item => {
    item.Value.Drops.map(x => {
      let name = items.entries.find(y => y.Key === x.ItemId);
      if (name) {
        x.ItemId = name.Value.Name;
        x.Icon = name.Value.Icon;
        return;
      }
      return;
    });
  });

  crafts.entries.map(item => {
    let flag = items.entries.find(y => y.Key === item.Value.ItemId);
    if (flag) item.Value.Icon = flag.Value.Icon;

    item.Value.Ingredients.map(x => {
      let name = items.entries.find(y => y.Key === x.ItemId);
      if (name) {
        x.ItemId = name.Value.Name;
        x.Icon = name.Value.Icon;
        return;
      }
      return;
    });
  });

  return (
    <div>
      <main>
        <Layout>
          <WikiPage
            activityWiki={activityWiki}
            callback={(e: ActivityWiki) => setActivityWiki(e)}
            items={items}
            npcs={npcs}
            crafts={crafts}
          />
        </Layout>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const api = getAPIPublic();

  const { data: items } = await api.post('/v1/gameobjects/item', {
    page: 0,
    count: 100
  });

  const { data: npcs } = await api.post('/v1/gameobjects/npc', {
    page: 0,
    count: 100
  });

  const { data: crafts } = await api.post('/v1/gameobjects/crafts', {
    page: 0,
    count: 100
  });

  return {
    props: { items, npcs, crafts },
    revalidate: 3600
  };
};
