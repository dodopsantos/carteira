import React, { useMemo, useState } from 'react';
import WikiPage from '@modules/wiki';
import Layout from '@components/layout';
import { GetStaticProps } from 'next';
import { getAPIClient } from '@services/axios';

import type { Items } from '@interfaces/items';
import type { Npcs } from '@interfaces/npcs';
import type { Crafts } from '@interfaces/crafts';

export interface ActivityWiki {
  index: number;
}

interface Props {
  items: Items;
  npcs: Npcs;
  crafts: Crafts;
}

type DropDto = {
  Chance: number;
  ItemId: string; // GUID
  MinQuantity: number;
  MaxQuantity: number;

  Icon?: string;
  ItemName?: string;
};

function isDropDto(x: unknown): x is DropDto {
  if (!x || typeof x !== 'object') return false;
  const d = x as any;
  return (
    typeof d.ItemId === 'string' &&
    typeof d.Chance === 'number' &&
    typeof d.MinQuantity === 'number' &&
    typeof d.MaxQuantity === 'number'
  );
}

function toArray<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.Values)) return data.Values;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.Values)) return data.data.Values;
  return [];
}

export default function Wiki({ items, npcs, crafts }: Props): JSX.Element {
  const [activityWiki, setActivityWiki] = useState<ActivityWiki>({ index: 0 });

  // ✅ garante array (evita: forEach is not a function)
  const itemsList = useMemo<any[]>(() => toArray<any>(items), [items]);
  const npcsList = useMemo<any[]>(() => toArray<any>(npcs), [npcs]);

  // ✅ index por GUID (Id ou ItemId — depende do seu JSON real)
  const itemsById = useMemo(() => {
    const map = new Map<string, any>();
    itemsList.forEach((it) => {
      if (typeof it?.Id === 'string') map.set(it.Id, it);
      else if (typeof it?.ItemId === 'string') map.set(it.ItemId, it);
    });
    return map;
  }, [itemsList]);

  npcsList.forEach((npc: any) => {
    if (!Array.isArray(npc?.Drops)) return;

    npc.Drops.forEach((d: unknown) => {
      if (!isDropDto(d)) return;

      const found = itemsById.get(d.ItemId);
      if (found) {
        d.Icon = found.Icon;
        d.ItemName = found.Name;
      }
    });
  });

  return (
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
  );
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const api = getAPIClient(ctx);

  const [itemsRes, npcsRes] = await Promise.all([
    api.get('/gameobjects/items/all'),
    api.get('/gameobjects/npcs/all'),
  ]);

  const crafts = [] as unknown as Crafts;

  return {
    props: {
      items: toArray(itemsRes.data) as unknown as Items,
      npcs: toArray(npcsRes.data) as unknown as Npcs,
      crafts,
    },
    revalidate: 3600,
  };
};
