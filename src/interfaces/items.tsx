export type IntersectEffectDto = {
  Type: string;
  Percentage?: number;
  Value?: number;
};

export type IntersectUsageRequirementsDto = {
  Lists: string;
};

export type ItemPublicDto = {
  Id: string; // ✅ tem que ser o GUID pra casar com Drop.ItemId
  Name: string;
  UsageRequirements: IntersectUsageRequirementsDto;

  CritChance: number;
  CritMultiplier: number;

  Damage: number;
  DamageType: number;

  ItemType: string;
  Icon: string;

  Rarity: number;

  Scaling: number;
  ScalingStat: number;
  Speed: number;

  VitalsGiven: number[];
  VitalsRegen: number[];

  StatsGiven: number[];
  PercentageStatsGiven: number[];

  Effects: IntersectEffectDto[];

  Type: string;
};

export type Items = ItemPublicDto[];

export type Filter = {
  category: number;
  rarity: number;
  search: string;
};
