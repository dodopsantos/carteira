export type NpcVitalsDto = {
  Health: number;
  Mana: number;
};

export type NpcStatsDto = {
  Attack: number;
  AbilityPower: number;
  Defense: number;
  MagicResist: number;
  Speed: number;
};

// ✅ Drop real (baseado no JSON que você enviou)
export type NpcDropDto = {
  Chance: number;
  ItemId: string;       // GUID do item
  MinQuantity: number;
  MaxQuantity: number;

  // opcionais: útil se você enriquecer no front
  Icon?: string;
  ItemName?: string;
};

export type NpcImmunityDto = Record<string, unknown>;

export type NpcPublicDto = {
  Name: string;

  Drops: NpcDropDto[];
  MaxVitals: NpcVitalsDto;
  Stats: NpcStatsDto;
  Immunities: NpcImmunityDto[];

  Aggressive: boolean;
  Movement: number;
  Swarm: boolean;

  Damage: number;
  DamageType: number;
  CritChance: number;
  CritMultiplier: number;

  Tenacity: number;
  AttackSpeedModifier: number;
  AttackSpeedValue: number;

  Experience: number;
  Level: number;

  Sprite: string;
  SpawnDuration: number;
  SpellFrequency: number;

  Type: string; // "Npc"
};

// ✅ Lista pura do backend
export type Npcs = NpcPublicDto[];

export type FilterNpc = {
  search: string;
};
