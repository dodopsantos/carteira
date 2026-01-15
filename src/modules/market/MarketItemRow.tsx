import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Text } from '@components/Text';
import {
  ShoppingCartSimple,
  X,
  CheckCircle,
  WarningCircle,
  Lightning,
  PencilSimple,
  Trash
} from 'phosphor-react';

/* ================= TYPES ================= */

export type Auction = {
  id: string;
  itemName: string;
  imageUrl?: string;
  category: 'weapon' | 'armor' | 'accessory' | 'material' | 'consumable';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  levelReq?: number;
  createdAtMs: number;

  seller: { name: string; online: boolean; isMe?: boolean };

  // unitário
  price: { amount: number; currency: 'gold' | 'shard' };

  // stack
  quantity: number;
  totalAmount: number; // price.amount * quantity
};

type Props = {
  auction: Auction;

  // 💰 saldo do player
  wallet?: {
    gold: number;
    shard: number;
  };

  // compra parcial
  onBuy?: (auctionId: string, buyQuantity: number) => Promise<void>;

  // owner actions
  onCancel?: (auctionId: string) => Promise<void>;
  onEditPrice?: (auctionId: string, newUnitPrice: number) => Promise<void>;
};

/* ================= HELPERS ================= */

function timeAgo(ms: number) {
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

function rarityLabel(r: Auction['rarity']) {
  if (r === 'common') return 'Comum';
  if (r === 'rare') return 'Raro';
  if (r === 'epic') return 'Épico';
  return 'Lendário';
}

function categoryLabel(c: Auction['category']) {
  if (c === 'weapon') return 'Arma';
  if (c === 'armor') return 'Armadura';
  if (c === 'accessory') return 'Acessório';
  if (c === 'material') return 'Material';
  return 'Consumível';
}

function rarityStyle(rarity: Auction['rarity']) {
  switch (rarity) {
    case 'common':
      return {
        frame: 'border-slate-400/30',
        badge: 'border-slate-400/20 bg-slate-500/10 text-slate-200',
        name: 'text-slate-100'
      };
    case 'rare':
      return {
        frame: 'border-sky-400/40 shadow-[0_0_10px_rgba(56,189,248,0.35)]',
        badge: 'border-sky-400/30 bg-sky-500/15 text-sky-200',
        name: 'text-sky-200'
      };
    case 'epic':
      return {
        frame: 'border-fuchsia-400/40 shadow-[0_0_12px_rgba(217,70,239,0.45)]',
        badge: 'border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-200',
        name: 'text-fuchsia-200'
      };
    case 'legendary':
      return {
        frame: 'border-amber-400/40 shadow-[0_0_16px_rgba(251,191,36,0.6)]',
        badge: 'border-amber-400/30 bg-amber-500/15 text-amber-200',
        name: 'text-amber-200'
      };
  }
}

/* ================= COMPONENT ================= */

export function MarketItemRow({ auction, onBuy, onCancel, onEditPrice, wallet }: Props) {
  const [mounted, setMounted] = useState(false);

  const [openBuy, setOpenBuy] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [isBuying, setIsBuying] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const rarity = rarityStyle(auction.rarity);
  const isOwner = !!auction.seller.isMe;

  // ✅ garante portal no client (Next/SSR safe)
  useEffect(() => setMounted(true), []);

  const availableBalance =
    auction.price.currency === 'gold'
      ? wallet?.gold ?? Infinity
      : wallet?.shard ?? Infinity;

  // compra parcial
  const [buyQty, setBuyQty] = useState(1);
  const safeBuyQty = Math.max(1, Math.min(buyQty, auction.quantity));
  const buyTotal = useMemo(
    () => auction.price.amount * safeBuyQty,
    [auction.price.amount, safeBuyQty]
  );

  const hasEnoughBalance = buyTotal <= availableBalance;

  // editar preço
  const [unitPriceStr, setUnitPriceStr] = useState(String(auction.price.amount));
  const newUnitPrice = Number(unitPriceStr || 0);

  const buyDisabled = isBuying;
  const editDisabled = isEditing || isCanceling;

  useEffect(() => {
    if (!openBuy) return;
    setStatus('idle');
    setErrorMsg(null);
    setIsBuying(false);
    setBuyQty(1);
  }, [openBuy]);

  useEffect(() => {
    if (!openEdit) return;
    setStatus('idle');
    setErrorMsg(null);
    setIsEditing(false);
    setUnitPriceStr(String(auction.price.amount));
  }, [openEdit, auction.price.amount]);

  async function handleConfirmBuy() {
    if (buyDisabled) return;

    if (!hasEnoughBalance) {
      setStatus('error');
      setErrorMsg('Saldo insuficiente.');
      return;
    }

    setIsBuying(true);
    setStatus('idle');
    setErrorMsg(null);

    try {
      if (onBuy) {
        await onBuy(auction.id, safeBuyQty);
      } else {
        await new Promise(res => setTimeout(res, 800));
      }

      setStatus('success');
      setTimeout(() => setOpenBuy(false), 800);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          'Não foi possível concluir a compra.'
      );
    } finally {
      setIsBuying(false);
    }
  }

  async function handleCancel() {
    if (!isOwner || isCanceling) return;

    setIsCanceling(true);
    setErrorMsg(null);

    try {
      if (onCancel) {
        await onCancel(auction.id);
      } else {
        await new Promise(res => setTimeout(res, 500));
      }
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          'Não foi possível cancelar o anúncio.'
      );
      setStatus('error');
    } finally {
      setIsCanceling(false);
    }
  }

  async function handleSavePrice() {
    if (!isOwner || editDisabled) return;

    if (!unitPriceStr.trim() || !Number.isFinite(newUnitPrice) || newUnitPrice <= 0) {
      setStatus('error');
      setErrorMsg('Informe um valor unitário válido.');
      return;
    }

    setIsEditing(true);
    setErrorMsg(null);
    setStatus('idle');

    try {
      if (onEditPrice) {
        await onEditPrice(auction.id, newUnitPrice);
      } else {
        await new Promise(res => setTimeout(res, 500));
      }

      setStatus('success');
      setTimeout(() => setOpenEdit(false), 800);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.message ||
          err?.message ||
          'Não foi possível atualizar o preço.'
      );
    } finally {
      setIsEditing(false);
    }
  }

  const buyModal =
    openBuy && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999]">
            <button
              className="absolute inset-0 bg-black/70"
              onClick={() => !isBuying && setOpenBuy(false)}
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
                <div className="px-5 pt-5 pb-3 border-b border-white/10 flex justify-between">
                  <div>
                    <Text className="text-white font-semibold">Confirmar compra</Text>
                    <Text className="text-white/50 text-xs mt-1">
                      Comprando{' '}
                      <span className="text-white/70 font-semibold">{safeBuyQty}</span>{' '}
                      de{' '}
                      <span className="text-white/70 font-semibold">{auction.quantity}</span>{' '}
                      unidade{auction.quantity > 1 ? 's' : ''}
                    </Text>
                  </div>

                  <button
                    onClick={() => setOpenBuy(false)}
                    className="rounded-xl px-3 py-2 border border-white/10 bg-white/5"
                    disabled={isBuying}
                  >
                    <X size={16} color="white" />
                  </button>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {status === 'success' && (
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                      <Text className="text-emerald-200 font-semibold flex gap-2">
                        <CheckCircle size={16} />
                        Compra realizada com sucesso!
                      </Text>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                      <Text className="text-red-200 font-semibold flex gap-2">
                        <WarningCircle size={16} />
                        {errorMsg}
                      </Text>
                    </div>
                  )}

                  {status === 'idle' && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      {/* seletor: só aparece se > 1 */}
                      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                        <div className="flex items-center justify-between">
                          <Text className="text-white/70 text-sm font-semibold">
                            Quantidade
                          </Text>
                          <Text className="text-white font-semibold text-sm">
                            {safeBuyQty}
                          </Text>
                        </div>

                        {auction.quantity > 1 ? (
                          <>
                            <input
                              type="range"
                              min={1}
                              max={auction.quantity}
                              value={safeBuyQty}
                              onChange={e => setBuyQty(Number(e.target.value))}
                              className="mt-3 w-full accent-emerald-400"
                            />
                            <div className="mt-2 flex items-center justify-between text-xs text-white/40">
                              <span>1</span>
                              <span>{auction.quantity}</span>
                            </div>
                          </>
                        ) : (
                          <Text className="mt-2 text-xs text-white/40">Item unitário</Text>
                        )}
                      </div>

                      <div className="mt-3 rounded-xl border border-white/10 bg-black/40 px-3 py-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <Text className="text-white/60 text-sm">Seu saldo</Text>
                          <Text
                            className={`text-sm font-semibold ${
                              hasEnoughBalance ? 'text-white' : 'text-red-300'
                            }`}
                          >
                            {availableBalance}{' '}
                            <span className="text-white/50">{auction.price.currency}</span>
                          </Text>
                        </div>

                        {!hasEnoughBalance && (
                          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                            <Text className="text-red-200 font-semibold flex gap-2">
                              <WarningCircle size={16} />
                              Saldo insuficiente para concluir a compra
                            </Text>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <Text className="text-white/60 text-sm">Valor unitário</Text>
                          <Text className="text-white font-semibold text-sm">
                            {auction.price.amount}{' '}
                            <span className="text-white/50">{auction.price.currency}</span>
                          </Text>
                        </div>

                        <div className="flex items-center justify-between">
                          <Text className="text-white/60 text-sm">Total da compra</Text>
                          <Text className="text-emerald-200 font-extrabold text-sm">
                            {buyTotal}{' '}
                            <span className="text-emerald-200/60 font-semibold">
                              {auction.price.currency}
                            </span>
                          </Text>
                        </div>

                        {auction.quantity > 1 && (
                          <div className="flex items-center justify-between">
                            <Text className="text-white/60 text-sm">Restará no leilão</Text>
                            <Text className="text-white/80 font-semibold text-sm">
                              {auction.quantity - safeBuyQty}
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => setOpenBuy(false)}
                    disabled={isBuying}
                    className="rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmBuy}
                    disabled={buyDisabled || !hasEnoughBalance}
                    className={`
                      rounded-xl px-4 py-2 font-semibold
                      ${buyDisabled || !hasEnoughBalance
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-emerald-500/25 text-emerald-200 hover:bg-emerald-500/30'
                      }
                    `}
                  >
                    {isBuying ? 'Comprando...' : 'Confirmar'}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  const editModal =
    openEdit && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[9999]">
            <button
              className="absolute inset-0 bg-black/70"
              onClick={() => !isEditing && setOpenEdit(false)}
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
                <div className="px-5 pt-5 pb-3 border-b border-white/10 flex justify-between">
                  <Text className="text-white font-semibold">Editar preço</Text>
                  <button
                    onClick={() => setOpenEdit(false)}
                    className="rounded-xl px-3 py-2 border border-white/10 bg-white/5"
                    disabled={isEditing}
                  >
                    <X size={16} color="white" />
                  </button>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {status === 'success' && (
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                      <Text className="text-emerald-200 font-semibold flex gap-2">
                        <CheckCircle size={16} />
                        Preço atualizado!
                      </Text>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                      <Text className="text-red-200 font-semibold flex gap-2">
                        <WarningCircle size={16} />
                        {errorMsg}
                      </Text>
                    </div>
                  )}

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Text className="text-white/70 text-sm font-semibold">
                      Valor unitário ({auction.price.currency})
                    </Text>

                    <input
                      value={unitPriceStr}
                      onChange={e => setUnitPriceStr(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="100"
                      className="
                        mt-2 w-full rounded-xl border border-white/10 bg-black/50
                        px-3 py-3 text-sm text-white/90 placeholder:text-white/30
                        focus:outline-none focus:ring-2 focus:ring-sky-500/40
                      "
                    />

                    <div className="mt-3 rounded-xl border border-white/10 bg-black/40 px-3 py-3">
                      <div className="flex items-center justify-between">
                        <Text className="text-white/60 text-sm">Quantidade no anúncio</Text>
                        <Text className="text-white font-semibold text-sm">
                          {auction.quantity}
                        </Text>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <Text className="text-white/60 text-sm">Novo total do montante</Text>
                        <Text className="text-sky-200 font-extrabold text-sm">
                          {(Number.isFinite(newUnitPrice) ? newUnitPrice : 0) * auction.quantity}{' '}
                          <span className="text-sky-200/60 font-semibold">
                            {auction.price.currency}
                          </span>
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => setOpenEdit(false)}
                    disabled={isEditing}
                    className="rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSavePrice}
                    disabled={isEditing}
                    className={`
                      rounded-xl px-4 py-2 font-semibold
                      ${isEditing
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-sky-500/20 text-sky-200 hover:bg-sky-500/25'
                      }
                    `}
                  >
                    {isEditing ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {/* ================= ROW ================= */}
      <div className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-4">
        {/* IMAGE SLOT */}
        <div
          className={`
            relative flex-shrink-0
            h-16 w-16 rounded-xl
            border ${rarity.frame}
            bg-black/60
            flex items-center justify-center
            overflow-hidden
          `}
        >
          {auction.imageUrl ? (
            <img
              src={auction.imageUrl}
              alt={auction.itemName}
              className="h-14 w-14 object-contain"
              draggable={false}
            />
          ) : (
            <div className="h-10 w-10 rounded bg-white/10" />
          )}

          {/* quantidade no canto */}
          {auction.quantity > 1 && (
            <span className="absolute bottom-1 right-1 rounded-md border border-white/10 bg-black/70 px-1.5 py-[1px] text-[0.7rem] font-bold text-white/90">
              {auction.quantity}
            </span>
          )}

          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-60" />
        </div>

        {/* ITEM INFO */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`
                inline-flex items-center rounded-full
                px-2 py-[2px] text-[0.7rem] font-semibold
                border ${rarity.badge}
              `}
            >
              {rarityLabel(auction.rarity)}
            </span>

            <span className="text-[0.75rem] text-white/40">
              {categoryLabel(auction.category)}
              {auction.levelReq ? ` • Req Lv ${auction.levelReq}` : ''}
              {' • '} {timeAgo(auction.createdAtMs)}
            </span>
          </div>

          <div className={`mt-1 truncate font-semibold tracking-wide ${rarity.name}`}>
            {auction.itemName}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-2 rounded-full px-2 py-[2px]
                border text-[0.7rem] font-semibold
                ${auction.seller.online
                  ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/10 bg-white/5 text-white/60'
                }
              `}
            >
              <Lightning size={12} />
              {auction.seller.online ? 'Online' : 'Offline'}
            </span>

            <Text className="text-sm text-white/60">
              Vendedor:{' '}
              <span className="font-semibold text-teal-300">
                {auction.seller.name}
              </span>
            </Text>
          </div>

          {/* erro de owner actions (se acontecer) */}
          {status === 'error' && isOwner && errorMsg && (
            <Text className="mt-2 text-xs font-semibold text-red-200">
              {errorMsg}
            </Text>
          )}
        </div>

        {/* PRICE + ACTION */}
        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="text-right">
            <div className="text-white font-semibold">
              {auction.price.amount}{' '}
              <span className="text-white/60 text-sm">{auction.price.currency}</span>
              <span className="text-white/40 text-xs"> / un</span>
            </div>

            <div className="mt-1 text-xs text-white/50">
              Qtd:{' '}
              <span className="text-white/70 font-semibold">{auction.quantity}</span>
            </div>

            <div className="text-xs text-emerald-200/80 font-semibold">
              Total: {auction.totalAmount}{' '}
              <span className="text-emerald-200/60">{auction.price.currency}</span>
            </div>
          </div>

          {/* ✅ Se for owner: Editar/Cancelar; senão: Comprar */}
          {isOwner ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOpenEdit(true)}
                disabled={editDisabled}
                className={`
                  rounded-xl px-3 py-2 text-sm font-semibold border transition
                  ${editDisabled
                    ? 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                    : 'border-sky-400/30 bg-sky-500/15 text-sky-200 hover:bg-sky-500/20'
                  }
                `}
                title="Editar preço"
              >
                <span className="inline-flex items-center gap-2">
                  <PencilSimple size={16} />
                  Editar
                </span>
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={editDisabled}
                className={`
                  rounded-xl px-3 py-2 text-sm font-semibold border transition
                  ${editDisabled
                    ? 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                    : 'border-red-500/30 bg-red-500/15 text-red-200 hover:bg-red-500/20'
                  }
                `}
                title="Cancelar anúncio"
              >
                <span className="inline-flex items-center gap-2">
                  <Trash size={16} />
                  Cancelar
                </span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setOpenBuy(true)}
              disabled={buyDisabled}
              className={`
                rounded-xl px-4 py-2 text-sm font-semibold border transition
                ${buyDisabled
                  ? 'border-white/10 bg-white/5 text-white/30 cursor-not-allowed'
                  : `
                      border-emerald-400/30
                      bg-emerald-500/20
                      text-emerald-200
                      hover:bg-emerald-500/30
                      shadow-[0_0_12px_rgba(52,211,153,0.35)]
                    `
                }
              `}
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingCartSimple size={16} />
                Comprar
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ✅ MODAIS NO NÍVEL DA PÁGINA (Portal) */}
      {buyModal}
      {editModal}
    </>
  );
}
