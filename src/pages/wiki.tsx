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

  const itemsList = useMemo<any[]>(() => toArray<any>(items), [items]);
  const npcsList = useMemo<any[]>(() => toArray<any>(npcs), [npcs]);

  const itemsById = useMemo(() => {
    const map = new Map<string, any>();
    itemsList.forEach((it) => {
      if (typeof it?.Id === 'string') map.set(it.Id, it);
      else if (typeof it?.ItemId === 'string') map.set(it.ItemId, it);
    });
    return map;
  }, [itemsList]);

  // ✅ não muta `npcsList` direto: cria uma cópia enriquecida
  const enrichedNpcs = useMemo(() => {
    return npcsList.map((npc: any) => {
      const drops = Array.isArray(npc?.Drops) ? npc.Drops : [];

      const enrichedDrops = drops.map((d: unknown) => {
        if (!isDropDto(d)) return d;

        const found = itemsById.get(d.ItemId);
        if (!found) return d;

        return {
          ...d,
          Icon: found.Icon,
          ItemName: found.Name
        };
      });

      return {
        ...npc,
        Drops: enrichedDrops
      };
    });
  }, [npcsList, itemsById]);

  return (
    <Layout>
      <WikiPage
        activityWiki={activityWiki}
        callback={(e: ActivityWiki) => setActivityWiki(e)}
        items={itemsList as unknown as Items}
        npcs={enrichedNpcs as unknown as Npcs}
        crafts={crafts}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const api = getAPIClient(ctx);

  const [itemsRes, npcsRes] = await Promise.all([
    api.get('/gameobjects/items/all'),
    api.get('/gameobjects/npcs/all')
  ]);

  const crafts = [] as unknown as Crafts;
  console.log(npcsRes)
  return {
    props: {
      items: toArray(itemsRes.data.items) as unknown as Items,
      npcs: toArray(npcsRes.data.npcs) as unknown as Npcs,
      crafts
    },
    revalidate: 3600
  };
};
