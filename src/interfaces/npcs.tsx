export interface Npcs {
  Page: number;
  count: number;
  entries: Array<Entities>;
  total: number;
}

export interface Entities {
  Key: string;
  Value: Values;
}

interface Values {
  Icon: string;
  Name: string;
  Aggressive: boolean;
  MaxVital: Array<number>;
  Drops: Array<Item>;
  Stats: Array<number>;
  VitalsRegen: Array<number>;
  SpawnDuration: number;
  Experience: number;
}

export interface Item {
  Chance: number;
  Quantity: number;
  ItemId: string;
  Icon: string;
}

export interface FilterNpc {
  search: string;
}
