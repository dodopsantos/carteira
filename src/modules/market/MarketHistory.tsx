import React from 'react';
import { Text } from '@components/Text';
import {
    ShoppingCartSimple,
    Tag,
    XCircle,
    PencilSimple,
    PlusCircle
} from 'phosphor-react';

export type MarketHistoryEventType =
    | 'BUY'
    | 'SELL'
    | 'CANCEL'
    | 'EDIT_PRICE'
    | 'CREATE';

export type MarketHistoryEvent = {
    id: string;
    type: MarketHistoryEventType;
    atMs: number;

    itemName: string;
    imageUrl?: string;
    currency: 'gold' | 'shard';

    // opcional por tipo
    quantity?: number; // compra/venda
    unitPrice?: number; // create/edit/buy
    total?: number; // buy/sell
    note?: string; // texto extra (ex: "restaram X no leilão")
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

function iconByType(type: MarketHistoryEventType) {
    if (type === 'BUY') return <ShoppingCartSimple size={16} />;
    if (type === 'SELL') return <Tag size={16} />;
    if (type === 'CANCEL') return <XCircle size={16} />;
    if (type === 'EDIT_PRICE') return <PencilSimple size={16} />;
    return <PlusCircle size={16} />;
}

function badgeByType(type: MarketHistoryEventType) {
    switch (type) {
        case 'BUY':
            return 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200';
        case 'SELL':
            return 'border-teal-400/20 bg-teal-500/10 text-teal-200';
        case 'CANCEL':
            return 'border-red-500/20 bg-red-500/10 text-red-200';
        case 'EDIT_PRICE':
            return 'border-sky-400/20 bg-sky-500/10 text-sky-200';
        case 'CREATE':
            return 'border-purple-400/20 bg-purple-500/10 text-purple-200';
    }
}

function labelByType(type: MarketHistoryEventType) {
    if (type === 'BUY') return 'Compra';
    if (type === 'SELL') return 'Venda';
    if (type === 'CANCEL') return 'Cancelado';
    if (type === 'EDIT_PRICE') return 'Preço alterado';
    return 'Anunciado';
}

type Props = {
    events: MarketHistoryEvent[];
};

export function MarketHistory({ events }: Props) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <Text className="text-white font-semibold">Histórico</Text>
                <Text className="text-white/40 text-xs">{events.length} registros</Text>
            </div>

            {events.length === 0 ? (
                <div className="px-5 py-6">
                    <Text className="text-white/50 text-sm">
                        Nenhuma atividade ainda. Faça uma compra, anuncie um item ou edite um preço.
                    </Text>
                </div>
            ) : (
                <div className="divide-y divide-white/10">
                    {events.map(ev => (
                        <div key={ev.id} className="px-5 py-4 flex items-start gap-3">
                            {/* mini slot */}
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
                      inline-flex items-center gap-2 rounded-full px-2 py-[2px]
                      text-[0.7rem] font-semibold border
                      ${badgeByType(ev.type)}
                    `}
                                    >
                                        {iconByType(ev.type)}
                                        {labelByType(ev.type)}
                                    </span>

                                    <span className="text-[0.75rem] text-white/40">
                                        {timeAgoShort(ev.atMs)}
                                    </span>
                                </div>

                                <Text className="mt-1 text-white/80 font-semibold truncate">
                                    {ev.itemName}
                                </Text>

                                {/* detalhes */}
                                <div className="mt-2 text-xs text-white/50 space-y-1">
                                    {typeof ev.unitPrice === 'number' && (
                                        <div>
                                            Unit: <span className="text-white/70 font-semibold">{ev.unitPrice}</span>{' '}
                                            <span className="text-white/40">{ev.currency}</span>
                                        </div>
                                    )}

                                    {typeof ev.total === 'number' && (
                                        <div className="text-emerald-200/80 font-semibold">
                                            Total: {ev.total}{' '}
                                            <span className="text-emerald-200/50">{ev.currency}</span>
                                        </div>
                                    )}

                                    {ev.note && <div className="text-white/40">{ev.note}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
