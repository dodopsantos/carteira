import React from 'react';
import { Auction, MarketItemRow } from '@modules/market/MarketItemRow';

type Props = {
  auctions: Auction[];
  wallet?: { gold: number; shard: number };
  onBuy?: (auctionId: string, buyQuantity: number) => Promise<void>;
  onCancel?: (auctionId: string) => Promise<void>;
  onEditPrice?: (auctionId: string, newUnitPrice: number) => Promise<void>;
};

export function MarketList({ auctions, onBuy, onCancel, onEditPrice, wallet }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden h-full min-h-0 flex flex-col">
      {/* header do card (fixo) */}
      <div className="border-b border-white/10 px-5 py-4 bg-black/40 backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm font-semibold">Itens</span>
          <span className="text-white/40 text-xs">{auctions.length} resultados</span>
        </div>
      </div>

      {/* ✅ scroll interno estilizado */}
      <div className="flex-1 min-h-0 overflow-y-auto market-scroll">
        {auctions.length === 0 ? (
          <div className="px-5 py-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-white/70 font-semibold">Nada por aqui</div>
              <div className="text-white/40 text-sm mt-1">
                Ajuste os filtros ou tente outra busca.
              </div>
            </div>
          </div>
        ) : (
          auctions.map(a => (
            <div key={a.id} className="border-b border-white/10 last:border-b-0">
              <MarketItemRow
                auction={a}
                wallet={wallet}
                onBuy={onBuy}
                onCancel={onCancel}
                onEditPrice={onEditPrice}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

