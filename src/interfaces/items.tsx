export interface Items {
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
  CanBag: boolean;
  Icon: string;
  Rarity: number;
  Name: string;
  ItemType: number;
  StatsGiven: Array<number>;
  VitalsGiven: Array<number>;
  VitalsRegen: Array<number>;
}
export interface Filter {
  category: Number;
  rarity: Number;
}
