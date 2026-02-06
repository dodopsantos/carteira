export interface Crafts {
  Page: number;
  count: number;
  Values: Array<Values>;
  total: number;
}
interface Values {
  Icon: string;
  Name: string;
  ItemLossChance: number;
  FailureChance: number;
  ItemId: string;
  Time: number;
  Ingredients: Array<Item>;
}

export interface Item {
  Quantity: number;
  ItemId: string;
  Icon: string;
}

export interface FilterCrafts {
  search: string;
}
