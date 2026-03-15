// ─── Ingrediente ─────────────────────────────────────────────────────────────

export type CraftIngredient = {
  ItemId: string;
  Quantity: number;
  // enriquecido no frontend quando itemsById estiver disponível
  Icon?: string;
  ItemName?: string;
};

// ─── Receita individual ───────────────────────────────────────────────────────

export type CraftPublicDto = {
  Id: string;
  Name: string;
  Folder: string;

  ItemId: string;       // GUID do item produzido
  Quantity: number;

  Time: number;           // ms
  FailureChance: number;
  ItemLossChance: number;

  Ingredients: CraftIngredient[];

  // enriquecido no frontend
  OutputIcon?: string;
  OutputName?: string;

  Type: string;
};

// ─── Mesa de craft (com receitas populadas) ───────────────────────────────────

export type CraftTableDto = {
  Id: string;
  Name: string;
  Folder: string;      // localização da mesa (ex: "Jinta", "Hollow")
  Crafts: CraftPublicDto[];
  Type: string;
};

export type Crafts = CraftTableDto[];

// ─── Filtro ───────────────────────────────────────────────────────────────────

export type FilterCrafts = {
  search: string;
};
