import React, { useMemo, useState } from 'react';
import WikiPage from '@modules/wiki';
import Layout from '@components/layout';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@services/axios';

import type { Items } from '@interfaces/items';
import type { Npcs } from '@interfaces/npcs';
import type { Crafts, CraftPublicDto, CraftTableDto } from '@interfaces/crafts';

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
  ItemId: string;
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
  const npcsList  = useMemo<any[]>(() => toArray<any>(npcs),  [npcs]);

  // Mapa Id → item (usado para enriquecer drops de NPCs e ingredientes de crafts)
  const itemsById = useMemo(() => {
    const map = new Map<string, any>();
    itemsList.forEach((it) => {
      if (typeof it?.Id     === 'string') map.set(it.Id,     it);
      if (typeof it?.ItemId === 'string') map.set(it.ItemId, it);
    });
    return map;
  }, [itemsList]);

  // NPCs com drops enriquecidos
  const enrichedNpcs = useMemo(() => {
    return npcsList.map((npc: any) => {
      const drops = Array.isArray(npc?.Drops) ? npc.Drops : [];
      const enrichedDrops = drops.map((d: unknown) => {
        if (!isDropDto(d)) return d;
        const found = itemsById.get(d.ItemId);
        if (!found) return d;
        return { ...d, Icon: found.Icon, ItemName: found.Name };
      });
      return { ...npc, Drops: enrichedDrops };
    });
  }, [npcsList, itemsById]);

  // Crafts com output + ingredientes enriquecidos
  const enrichedCrafts = useMemo<Crafts>(() => {
    return (crafts ?? []).map((table: CraftTableDto) => ({
      ...table,
      Crafts: table.Crafts.map((craft: CraftPublicDto) => {
        const outputItem = itemsById.get(craft.ItemId);
        return {
          ...craft,
          OutputIcon: outputItem?.Icon,
          OutputName: outputItem?.Name ?? craft.Name,
          Ingredients: craft.Ingredients.map((ing) => {
            const found = itemsById.get(ing.ItemId);
            return found
              ? { ...ing, Icon: found.Icon, ItemName: found.Name }
              : ing;
          }),
        };
      }),
    }));
  }, [crafts, itemsById]);

  return (
    <WikiPage
      activityWiki={activityWiki}
      callback={(e: ActivityWiki) => setActivityWiki(e)}
      items={itemsList as unknown as Items}
      npcs={enrichedNpcs as unknown as Npcs}
      crafts={enrichedCrafts}
    />
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const api = getAPIClient(ctx);

  // Verifica status do servidor antes de permitir acesso
  try {
    const serverRes = await api.get('/server/status');
    const isOnline = serverRes.data?.online === true;

    if (!isOnline) {
      return {
        redirect: {
          destination: '/?maintenance=1',
          permanent: false,
        },
      };
    }
  } catch {
    return {
      redirect: {
        destination: '/?maintenance=1',
        permanent: false,
      },
    };
  }

  try {
    const [itemsRes, npcsRes, craftsRes] = await Promise.all([
      api.get('/gameobjects/items/all'),
      api.get('/gameobjects/npcs/all'),
      api.get('/gameobjects/crafttables/all'),
    ]);

    return {
      props: {
        items:  toArray(itemsRes.data.items)   as unknown as Items,
        npcs:   toArray(npcsRes.data.npcs)     as unknown as Npcs,
        crafts: (craftsRes.data.tables ?? [])  as unknown as Crafts,
      },
    };
  } catch {
    return {
      props: {
        items:  [] as unknown as Items,
        npcs:   [] as unknown as Npcs,
        crafts: [] as unknown as Crafts,
      },
    };
  }
};
