import { Auction } from './MarketItemRow';

const now = Date.now();

// Helpers simples pra gerar muita variedade
const mins = (m: number) => m * 60 * 1000;
const hrs = (h: number) => h * 60 * 60 * 1000;
const days = (d: number) => d * 24 * 60 * 60 * 1000;

function total(amount: number, quantity: number) {
  return amount * quantity;
}

export const mockAuctions: Auction[] = [
  // ====== MEUS ANÚNCIOS (isMe: true) ======
  {
    id: 'a1',
    itemName: 'Lâmina do Eclipse +7',
    category: 'weapon',
    rarity: 'epic',
    levelReq: 45,
    createdAtMs: now - mins(8),
    seller: { name: 'Você', online: true, isMe: true },
    price: { amount: 320, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(320, 1)
  },
  {
    id: 'a5',
    itemName: 'Poção Suprema de Vida',
    category: 'consumable',
    rarity: 'rare',
    levelReq: 20,
    createdAtMs: now - mins(18),
    seller: { name: 'Você', online: true, isMe: true },
    price: { amount: 18, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 25,
    totalAmount: total(18, 25)
  },
  {
    id: 'a6',
    itemName: 'Pó de Encantamento',
    category: 'material',
    rarity: 'common',
    createdAtMs: now - hrs(3),
    seller: { name: 'Você', online: true, isMe: true },
    price: { amount: 2, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 250,
    totalAmount: total(2, 250)
  },
  {
    id: 'a7',
    itemName: 'Capa do Crepúsculo',
    category: 'armor',
    rarity: 'epic',
    levelReq: 50,
    createdAtMs: now - hrs(6),
    seller: { name: 'Você', online: false, isMe: true },
    price: { amount: 410, currency: 'gold' },
    imageUrl: '/items/4.png',
    quantity: 1,
    totalAmount: total(410, 1)
  },

  // ====== ITENS DE OUTROS PLAYERS (online/offline misturado) ======
  {
    id: 'a2',
    itemName: 'Anel do Oráculo (Crítico)',
    category: 'accessory',
    rarity: 'rare',
    levelReq: 30,
    createdAtMs: now - mins(52),
    seller: { name: 'Morgana', online: false },
    price: { amount: 120, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(120, 1)
  },
  {
    id: 'a3',
    itemName: 'Fragmento Espiritual',
    category: 'material',
    rarity: 'common',
    createdAtMs: now - hrs(2),
    seller: { name: 'Riven', online: true },
    price: { amount: 40, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 50,
    totalAmount: total(40, 50)
  },
  {
    id: 'a4',
    itemName: 'Couraça do Guardião',
    category: 'armor',
    rarity: 'legendary',
    levelReq: 60,
    createdAtMs: now - hrs(26),
    seller: { name: 'Astra', online: true },
    price: { amount: 980, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(980, 1)
  },

  // ====== MAIS ARMAS ======
  {
    id: 'a8',
    itemName: 'Arco de Vento +5',
    category: 'weapon',
    rarity: 'rare',
    levelReq: 38,
    createdAtMs: now - mins(6),
    seller: { name: 'Kael', online: true },
    price: { amount: 210, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(210, 1)
  },
  {
    id: 'a9',
    itemName: 'Martelo do Colosso',
    category: 'weapon',
    rarity: 'legendary',
    levelReq: 70,
    createdAtMs: now - hrs(12),
    seller: { name: 'Brutus', online: false },
    price: { amount: 1500, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(1500, 1)
  },
  {
    id: 'a10',
    itemName: 'Adaga Sombria +9',
    category: 'weapon',
    rarity: 'epic',
    levelReq: 55,
    createdAtMs: now - days(1) - mins(20),
    seller: { name: 'Nyx', online: true },
    price: { amount: 640, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(640, 1)
  },
  {
    id: 'a11',
    itemName: 'Cajado do Arcanista',
    category: 'weapon',
    rarity: 'rare',
    levelReq: 42,
    createdAtMs: now - hrs(4) - mins(15),
    seller: { name: 'Eldrin', online: false },
    price: { amount: 330, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(330, 1)
  },

  // ====== ARMADURAS ======
  {
    id: 'a12',
    itemName: 'Elmo do Titã',
    category: 'armor',
    rarity: 'rare',
    levelReq: 35,
    createdAtMs: now - mins(33),
    seller: { name: 'Hector', online: true },
    price: { amount: 160, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(160, 1)
  },
  {
    id: 'a13',
    itemName: 'Botas da Agilidade',
    category: 'armor',
    rarity: 'common',
    levelReq: 12,
    createdAtMs: now - mins(90),
    seller: { name: 'Luna', online: false },
    price: { amount: 35, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(35, 1)
  },
  {
    id: 'a14',
    itemName: 'Luvas do Assassino',
    category: 'armor',
    rarity: 'epic',
    levelReq: 48,
    createdAtMs: now - hrs(9),
    seller: { name: 'Shade', online: true },
    price: { amount: 420, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(420, 1)
  },

  // ====== ACESSÓRIOS ======
  {
    id: 'a15',
    itemName: 'Amuleto do Lobo',
    category: 'accessory',
    rarity: 'epic',
    levelReq: 44,
    createdAtMs: now - mins(14),
    seller: { name: 'Fenrir', online: true },
    price: { amount: 390, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(390, 1)
  },
  {
    id: 'a16',
    itemName: 'Anel da Regeneração',
    category: 'accessory',
    rarity: 'common',
    levelReq: 8,
    createdAtMs: now - mins(120),
    seller: { name: 'Mia', online: false },
    price: { amount: 22, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(22, 1)
  },
  {
    id: 'a17',
    itemName: 'Talismã do Caos',
    category: 'accessory',
    rarity: 'legendary',
    levelReq: 65,
    createdAtMs: now - days(2),
    seller: { name: 'Vaal', online: true },
    price: { amount: 1200, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(1200, 1)
  },

  // ====== MATERIAIS (stacks grandes pra testar compra parcial) ======
  {
    id: 'a18',
    itemName: 'Cristal de Mana',
    category: 'material',
    rarity: 'common',
    createdAtMs: now - mins(5),
    seller: { name: 'Orion', online: true },
    price: { amount: 3, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 180,
    totalAmount: total(3, 180)
  },
  {
    id: 'a19',
    itemName: 'Núcleo Ígneo',
    category: 'material',
    rarity: 'rare',
    levelReq: 28,
    createdAtMs: now - hrs(1),
    seller: { name: 'Pyra', online: false },
    price: { amount: 14, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 75,
    totalAmount: total(14, 75)
  },
  {
    id: 'a20',
    itemName: 'Essência do Vazio',
    category: 'material',
    rarity: 'epic',
    levelReq: 52,
    createdAtMs: now - hrs(7),
    seller: { name: 'Null', online: true },
    price: { amount: 60, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 20,
    totalAmount: total(60, 20)
  },
  {
    id: 'a21',
    itemName: 'Pedaço de Meteoro',
    category: 'material',
    rarity: 'legendary',
    levelReq: 58,
    createdAtMs: now - days(3) - hrs(2),
    seller: { name: 'Atlas', online: false },
    price: { amount: 240, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 5,
    totalAmount: total(240, 5)
  },
  {
    id: 'a22',
    itemName: 'Fibra Ancestral',
    category: 'material',
    rarity: 'rare',
    createdAtMs: now - mins(75),
    seller: { name: 'Sylva', online: true },
    price: { amount: 9, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 120,
    totalAmount: total(9, 120)
  },

  // ====== CONSUMÍVEIS (stacks) ======
  {
    id: 'a23',
    itemName: 'Poção de Vida',
    category: 'consumable',
    rarity: 'common',
    createdAtMs: now - mins(9),
    seller: { name: 'Tara', online: true },
    price: { amount: 6, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 40,
    totalAmount: total(6, 40)
  },
  {
    id: 'a24',
    itemName: 'Poção de Mana',
    category: 'consumable',
    rarity: 'common',
    createdAtMs: now - mins(22),
    seller: { name: 'Darius', online: false },
    price: { amount: 5, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 55,
    totalAmount: total(5, 55)
  },
  {
    id: 'a25',
    itemName: 'Elixir do Berserker',
    category: 'consumable',
    rarity: 'epic',
    levelReq: 40,
    createdAtMs: now - hrs(5),
    seller: { name: 'Ragnar', online: true },
    price: { amount: 55, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 10,
    totalAmount: total(55, 10)
  },
  {
    id: 'a26',
    itemName: 'Antídoto Refinado',
    category: 'consumable',
    rarity: 'rare',
    levelReq: 18,
    createdAtMs: now - hrs(11),
    seller: { name: 'Iris', online: false },
    price: { amount: 24, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 15,
    totalAmount: total(24, 15)
  },

  // ====== ITENS DE BAIXO NÍVEL PRA TESTAR FILTROS ======
  {
    id: 'a27',
    itemName: 'Espada Enferrujada',
    category: 'weapon',
    rarity: 'common',
    levelReq: 1,
    createdAtMs: now - mins(2),
    seller: { name: 'NoobSlayer', online: true },
    price: { amount: 1, currency: 'gold' },
    imageUrl: '/items/6.png',
    quantity: 1,
    totalAmount: total(1, 1)
  },
  {
    id: 'a28',
    itemName: 'Armadura de Couro',
    category: 'armor',
    rarity: 'common',
    levelReq: 5,
    createdAtMs: now - mins(11),
    seller: { name: 'Rookie', online: false },
    price: { amount: 9, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(9, 1)
  },
  {
    id: 'a29',
    itemName: 'Anel Simples',
    category: 'accessory',
    rarity: 'common',
    levelReq: 3,
    createdAtMs: now - mins(16),
    seller: { name: 'Tinker', online: true },
    price: { amount: 4, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(4, 1)
  },
  {
    id: 'a30',
    itemName: 'Minério Bruto',
    category: 'material',
    rarity: 'common',
    createdAtMs: now - mins(40),
    seller: { name: 'Miner', online: false },
    price: { amount: 1, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 999,
    totalAmount: total(1, 999)
  },

  // ====== MAIS VARIEDADE ======
  {
    id: 'a31',
    itemName: 'Broche do Viajante',
    category: 'accessory',
    rarity: 'rare',
    levelReq: 25,
    createdAtMs: now - hrs(15),
    seller: { name: 'Nomad', online: true },
    price: { amount: 88, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(88, 1)
  },
  {
    id: 'a32',
    itemName: 'Grevas do Guardião',
    category: 'armor',
    rarity: 'rare',
    levelReq: 33,
    createdAtMs: now - hrs(20),
    seller: { name: 'Sentinel', online: false },
    price: { amount: 140, currency: 'gold' },
    imageUrl: '/items/5.png',
    quantity: 1,
    totalAmount: total(140, 1)
  },
  {
    id: 'a33',
    itemName: 'Orbe de Transmutação',
    category: 'material',
    rarity: 'rare',
    createdAtMs: now - days(1) - hrs(3),
    seller: { name: 'Alch', online: true },
    price: { amount: 12, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 60,
    totalAmount: total(12, 60)
  },
  {
    id: 'a34',
    itemName: 'Orbe do Caos',
    category: 'material',
    rarity: 'epic',
    createdAtMs: now - days(4),
    seller: { name: 'TraderX', online: false },
    price: { amount: 75, currency: 'shard' },
    imageUrl: '/items/3.png',
    quantity: 30,
    totalAmount: total(75, 30)
  },
  {
    id: 'a35',
    itemName: 'Poção de Velocidade',
    category: 'consumable',
    rarity: 'rare',
    levelReq: 16,
    createdAtMs: now - mins(58),
    seller: { name: 'Swift', online: true },
    price: { amount: 15, currency: 'gold' },
    imageUrl: '/items/1.png',
    quantity: 22,
    totalAmount: total(15, 22)
  },
  {
    id: 'a36',
    itemName: 'Amuleto do Dragão',
    category: 'accessory',
    rarity: 'legendary',
    levelReq: 62,
    createdAtMs: now - days(5) - hrs(6),
    seller: { name: 'Drake', online: true },
    price: { amount: 2200, currency: 'gold' },
    imageUrl: '/items/2.png',
    quantity: 1,
    totalAmount: total(2200, 1)
  }
];
