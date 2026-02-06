import React, { useMemo, useState } from 'react';
import { MarketFilters, MarketFiltersValue } from '@modules/market/MarketFilters';
import { MarketList } from '@modules/market/MarketList';
import { MarketLayout } from '@modules/market/MarketLayout';
import { mockAuctions } from '@modules/market/mock';
import { Auction } from '@modules/market/MarketItemRow';
import { ArrowLeft } from 'phosphor-react';
import { useRouter } from 'next/router';

import {
  CreateListingModal,
  CreateListingInput
} from '@modules/market/CreateListingModal';
import { Text } from '@components/Text';
import { X, ClockCounterClockwise } from 'phosphor-react';

/* ================= HISTORY TYPES ================= */

type MarketHistoryEventType = 'BUY' | 'CANCEL' | 'EDIT_PRICE' | 'CREATE';

type MarketHistoryEvent = {
  id: string;
  type: MarketHistoryEventType;
  atMs: number;
  itemName: string;
  imageUrl?: string;
  currency: 'gold' | 'shard';
  quantity?: number;
  unitPrice?: number;
  total?: number;
  note?: string;
};

function timeAgoShort(ms: number) {
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function typeLabel(t: MarketHistoryEventType) {
  if (t === 'BUY') return 'Compra';
  if (t === 'CANCEL') return 'Cancelado';
  if (t === 'EDIT_PRICE') return 'Preço alterado';
  return 'Anunciado';
}

function typeBadge(t: MarketHistoryEventType) {
  switch (t) {
    case 'BUY':
      return 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200';
    case 'CANCEL':
      return 'border-red-500/20 bg-red-500/10 text-red-200';
    case 'EDIT_PRICE':
      return 'border-sky-400/20 bg-sky-500/10 text-sky-200';
    case 'CREATE':
      return 'border-purple-400/20 bg-purple-500/10 text-purple-200';
  }
}
/* ================= HISTORY MODAL ================= */

function HistoryModal({
  open,
  onClose,
  events
}: {
  open: boolean;
  onClose: () => void;
  events: MarketHistoryEvent[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <ClockCounterClockwise size={18} className="text-white/80" />
              </span>
              <div>
                <Text className="text-white font-semibold">Histórico</Text>
                <Text className="text-white/40 text-xs">
                  {events.length} registros
                </Text>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto">
            {events.length === 0 ? (
              <div className="px-5 py-8">
                <Text className="text-white/50 text-sm">
                  Nenhuma atividade ainda. Faça uma compra ou crie um anúncio.
                </Text>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {events.map(ev => (
                  <div key={ev.id} className="px-5 py-4 flex items-start gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 rounded-xl border border-white/10 bg-black/60 flex items-center justify-center overflow-hidden">
                      {ev.imageUrl ? (
                        <img
                          src={ev.imageUrl}
                          alt={ev.itemName}
                          className="h-10 w-10 object-contain"
                          draggable={false}
                        />
                      ) : (
                        <div className="h-7 w-7 rounded bg-white/10" />
                      )}

                      {typeof ev.quantity === 'number' && ev.quantity > 1 && (
                        <span className="absolute bottom-1 right-1 rounded-md border border-white/10 bg-black/70 px-1.5 py-[1px] text-[0.65rem] font-bold text-white/90">
                          {ev.quantity}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`
                            inline-flex items-center rounded-full px-2 py-[2px]
                            text-[0.7rem] font-semibold border
                            ${typeBadge(ev.type)}
                          `}
                        >
                          {typeLabel(ev.type)}
                        </span>
                        <span className="text-[0.75rem] text-white/40">
                          {timeAgoShort(ev.atMs)}
                        </span>
                      </div>

                      <Text className="mt-1 text-white/80 font-semibold truncate">
                        {ev.itemName}
                      </Text>

                      <div className="mt-2 text-xs text-white/50 space-y-1">
                        {typeof ev.unitPrice === 'number' && (
                          <div>
                            Unit:{' '}
                            <span className="text-white/70 font-semibold">
                              {ev.unitPrice}
                            </span>{' '}
                            <span className="text-white/40">{ev.currency}</span>
                          </div>
                        )}

                        {typeof ev.total === 'number' && (
                          <div className="text-emerald-200/80 font-semibold">
                            Total: {ev.total}{' '}
                            <span className="text-emerald-200/50">
                              {ev.currency}
                            </span>
                          </div>
                        )}

                        {ev.note && (
                          <div className="text-white/40">{ev.note}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-5 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */

type Tab = 'market' | 'mine';

export default function MarketPage() {
  const [tab, setTab] = useState<Tab>('market');
  const [historyOpen, setHistoryOpen] = useState(false);

  const [filters, setFilters] = useState<MarketFiltersValue>({
    query: '',
    category: 'all',
    rarity: 'all',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  // 💰 SALDO DO PLAYER (mock)
  const [wallet, setWallet] = useState({
    gold: 12500,
    shard: 980
  });

  // para animar quando mudar
  const [walletPulse, setWalletPulse] = useState<'gold' | 'shard' | null>(null);
  const [auctions, setAuctions] = useState<Auction[]>(mockAuctions);
  const [createOpen, setCreateOpen] = useState(false);

  const [history, setHistory] = useState<MarketHistoryEvent[]>([]);

  function pushHistory(event: Omit<MarketHistoryEvent, 'id' | 'atMs'>) {
    const now = Date.now();
    setHistory(prev => [
      {
        id: `h_${now}_${Math.random().toString(16).slice(2)}`,
        atMs: now,
        ...event
      },
      ...prev
    ]);
  }

  const stashItems = Array.from({ length: 40 }, (_, i) => ({
    slot: i + 1,
    itemId: i + 1,
    quantity: i % 5 === 0 ? 20 : 1
  }));

  const marketAuctions = useMemo(() => auctions.filter(a => !a.seller.isMe), [auctions]);
  const myAuctions = useMemo(() => auctions.filter(a => !!a.seller.isMe), [auctions]);
  const router = useRouter();

  const activeList = tab === 'market' ? marketAuctions : myAuctions;

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    let data = activeList.filter(a => {
      if (filters.category !== 'all' && a.category !== filters.category) return false;
      if (filters.rarity !== 'all' && a.rarity !== filters.rarity) return false;

      if (q) {
        const hay = `${a.itemName} ${a.category} ${a.rarity} ${a.seller.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      const min = filters.minPrice !== '' ? Number(filters.minPrice) : null;
      const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : null;

      if (min !== null && a.price.amount < min) return false;
      if (max !== null && a.price.amount > max) return false;

      return true;
    });

    data = data.sort((a, b) => {
      if (filters.sort === 'newest') return b.createdAtMs - a.createdAtMs;
      if (filters.sort === 'price_asc') return a.price.amount - b.price.amount;
      if (filters.sort === 'price_desc') return b.price.amount - a.price.amount;
      return 0;
    });

    return data;
  }, [activeList, filters]);

  async function handleBuy(auctionId: string, buyQuantity: number) {
    await new Promise(res => setTimeout(res, 700));

    const target = auctions.find(a => a.id === auctionId);
    if (!target) return;

    const safeQty = Math.max(1, Math.min(buyQuantity, target.quantity));
    const remainingQty = target.quantity - safeQty;
    const total = target.price.amount * safeQty;
    // logo após calcular "total"
    setWallet(prev => ({
      ...prev,
      [target.price.currency]: prev[target.price.currency] - total
    }));

    setWalletPulse(target.price.currency);
    setTimeout(() => setWalletPulse(null), 400);

    pushHistory({
      type: 'BUY',
      itemName: target.itemName,
      imageUrl: target.imageUrl,
      currency: target.price.currency,
      quantity: safeQty,
      unitPrice: target.price.amount,
      total,
      note: remainingQty > 0 ? `Restaram ${remainingQty} no leilão.` : 'Anúncio finalizado.'
    });

    setAuctions(prev =>
      prev
        .map(a => {
          if (a.id !== auctionId) return a;
          const newRemaining = a.quantity - safeQty;
          if (newRemaining <= 0) return { ...a, quantity: 0, totalAmount: 0 };
          return { ...a, quantity: newRemaining, totalAmount: a.price.amount * newRemaining };
        })
        .filter(a => a.quantity > 0)
    );
  }

  async function handleCancel(auctionId: string) {
    await new Promise(res => setTimeout(res, 500));

    const target = auctions.find(a => a.id === auctionId);
    if (!target) return;

    pushHistory({
      type: 'CANCEL',
      itemName: target.itemName,
      imageUrl: target.imageUrl,
      currency: target.price.currency,
      quantity: target.quantity,
      unitPrice: target.price.amount,
      total: target.totalAmount,
      note: 'Você cancelou o anúncio.'
    });

    setAuctions(prev => prev.filter(a => a.id !== auctionId));
  }

  async function handleEditPrice(auctionId: string, newUnitPrice: number) {
    await new Promise(res => setTimeout(res, 500));

    const target = auctions.find(a => a.id === auctionId);
    if (!target) return;

    pushHistory({
      type: 'EDIT_PRICE',
      itemName: target.itemName,
      imageUrl: target.imageUrl,
      currency: target.price.currency,
      quantity: target.quantity,
      unitPrice: newUnitPrice,
      total: newUnitPrice * target.quantity,
      note: `Preço anterior: ${target.price.amount} ${target.price.currency} / un`
    });

    setAuctions(prev =>
      prev.map(a => {
        if (a.id !== auctionId) return a;
        return {
          ...a,
          price: { ...a.price, amount: newUnitPrice },
          totalAmount: newUnitPrice * a.quantity
        };
      })
    );
  }

  async function handleCreateListing(input: CreateListingInput) {
    await new Promise(res => setTimeout(res, 600));

    const now = Date.now();

    const newAuction: Auction = {
      id: `a_${now}`,
      itemName: `Item #${input.itemId}`,
      imageUrl: input.imageUrl,
      category: 'material',
      rarity: 'rare',
      createdAtMs: now,
      seller: { name: 'Você', online: true, isMe: true },
      price: { amount: input.unitPrice, currency: input.currency },
      quantity: input.quantity,
      totalAmount: input.totalPrice
    };

    pushHistory({
      type: 'CREATE',
      itemName: newAuction.itemName,
      imageUrl: newAuction.imageUrl,
      currency: newAuction.price.currency,
      quantity: newAuction.quantity,
      unitPrice: newAuction.price.amount,
      total: newAuction.totalAmount,
      note: 'Anúncio criado.'
    });

    setAuctions(prev => [newAuction, ...prev]);
    setTab('mine');
  }

  const marketCount = marketAuctions.length;
  const mineCount = myAuctions.length;

  return (
    <MarketLayout onCreate={() => setCreateOpen(true)} total={filtered.length}>
      {/* ✅ sem scroll da página: o MarketLayout já vira “shell” e aqui é flex */}
      <div className="h-full min-h-0 flex flex-col">
        {/* Tabs ficam fixas */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
          <div className="p-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => router.push('/account')}
              className="
                rounded-xl px-3 py-2 text-sm font-semibold border border-white/10
                bg-white/5 text-white/80 hover:bg-white/10
                inline-flex items-center justify-center gap-2
              "
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Perfil</span>
            </button>

            <div className="flex flex-1 gap-2">
              <button
                type="button"
                onClick={() => setTab('market')}
                className={`
                  flex-1 rounded-xl px-4 py-2 text-sm font-semibold border transition
                  ${tab === 'market'
                    ? 'border-teal-400/30 bg-teal-500/15 text-teal-200'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                Leilão{' '}
                <span className="ml-2 rounded-full border border-white/10 bg-black/40 px-2 py-[1px] text-xs text-white/70">
                  {marketCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTab('mine')}
                className={`
                  flex-1 rounded-xl px-4 py-2 text-sm font-semibold border transition
                  ${tab === 'mine'
                    ? 'border-sky-400/30 bg-sky-500/15 text-sky-200'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                Meus anúncios{' '}
                <span className="ml-2 rounded-full border border-white/10 bg-black/40 px-2 py-[1px] text-xs text-white/70">
                  {mineCount}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`
                  rounded-xl border border-amber-400/30 bg-amber-500/15
                  px-3 py-2 text-sm font-semibold text-amber-200
                  transition-transform duration-300
                  ${walletPulse === 'gold' ? 'scale-110 shadow-[0_0_18px_rgba(251,191,36,0.6)]' : ''}
                `}
              >
                Gold: <span className="ml-1 tabular-nums">{wallet.gold}</span>
              </div>

              <div
                className={`
                  rounded-xl border border-teal-400/30 bg-teal-500/15
                  px-3 py-2 text-sm font-semibold text-teal-200
                  transition-transform duration-300
                  ${walletPulse === 'shard' ? 'scale-110 shadow-[0_0_18px_rgba(45,212,191,0.6)]' : ''}
                `}
              >
                Shard: <span className="ml-1 tabular-nums">{wallet.shard}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="
                rounded-xl px-4 py-2 text-sm font-semibold border border-white/10
                bg-white/5 text-white/80 hover:bg-white/10
                inline-flex items-center justify-center gap-2
              "
            >
              <ClockCounterClockwise size={16} />
              Histórico
              <span className="ml-1 rounded-full border border-white/10 bg-black/40 px-2 py-[1px] text-xs text-white/70">
                {history.length}
              </span>
            </button>
          </div>
        </div>

        {/* ✅ grid ocupa o restante; não deixa a página crescer */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full min-h-0">
            {/* ✅ filtro fixo (sticky) + scroll se for maior que o espaço */}
            <div className="min-h-0">
              <div className="lg:sticky lg:top-0">
                <div className="max-h-full overflow-y-auto">
                  <MarketFilters value={filters} onChange={setFilters} />
                </div>
              </div>
            </div>

            {/* ✅ lista ocupa o espaço e rola dentro do card */}
            <div className="min-h-0 h-full">
              <MarketList
                auctions={filtered}
                wallet={wallet}
                onBuy={handleBuy}
                onCancel={handleCancel}
                onEditPrice={handleEditPrice}
              />
            </div>
          </div>
        </div>
      </div>

      <CreateListingModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateListing}
        stashItems={stashItems}
      />

      <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} events={history} />
    </MarketLayout>
  );
}
