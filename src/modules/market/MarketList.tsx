import React from 'react';
import { Auction, MarketItemRow } from '@modules/market/MarketItemRow';
import { Text } from '@components/Text';

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
      {/* Header */}
      <div className="border-b border-white/10 px-5 py-3.5 bg-black/40 backdrop-blur flex items-center justify-between">
        <Text className="text-sm font-semibold text-slate-100">Itens</Text>
        <Text className="text-xs text-slate-500">{auctions.length} resultado{auctions.length !== 1 ? 's' : ''}</Text>
      </div>

      {/* Lista */}
      <div className="flex-1 min-h-0 overflow-y-auto market-scroll">
        {auctions.length === 0 ? (
          <div className="px-5 py-10">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 text-center">
              <Text className="text-sm font-semibold text-slate-400">Nada por aqui</Text>
              <Text className="text-xs text-slate-600 mt-1">Ajuste os filtros ou tente outra busca.</Text>
            </div>
          </div>
        ) : (
          auctions.map(a => (
            <div key={a.id} className="border-b border-white/[0.06] last:border-b-0">
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
