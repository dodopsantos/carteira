import React from 'react';

export type StashItem = {
  slot: number; // 1..100 (10x10)
  itemId: number; // 1..100 (png)
  quantity: number; // ex 1, 20, 999
};

type Props = {
  items: StashItem[];
  selectedSlot?: number | null;
  onSelect: (slot: number, item: StashItem) => void;
  columns?: number; // default 10
  rows?: number; // default 10
};

export function StashGrid({
  items,
  selectedSlot,
  onSelect,
  columns = 10,
  rows = 10
}: Props) {
  const totalSlots = columns * rows;

  const bySlot = new Map<number, StashItem>();
  items.forEach(it => bySlot.set(it.slot, it));

  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-black/50
        p-3 shadow-lg shadow-black/40 backdrop-blur
        overflow-x-auto
      "
    >
      {/* Colunas fixas 64px para não “amassar” e não sobrepor */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, 64px)` }}
      >
        {Array.from({ length: totalSlots }, (_, i) => {
          const slot = i + 1;
          const item = bySlot.get(slot);
          const isSelected = !!selectedSlot && selectedSlot === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={!item}
              onClick={() => item && onSelect(slot, item)}
              className={`
                relative h-16 w-16 rounded-xl border
                flex items-center justify-center
                bg-black/60 transition
                ${item ? 'hover:bg-white/5' : 'opacity-40 cursor-not-allowed'}
                ${
                  isSelected
                    ? 'border-emerald-400/60 ring-2 ring-emerald-500/30 shadow-[0_0_14px_rgba(52,211,153,0.35)]'
                    : 'border-white/10 hover:border-white/20'
                }
              `}
              title={item ? `Item #${item.itemId} • Qtd ${item.quantity}` : 'Slot vazio'}
            >
              {item ? (
                <>
                  <img
                    src={`/items/${item.itemId}.png`}
                    alt={`Item ${item.itemId}`}
                    className="h-14 w-14 object-contain"
                    draggable={false}
                  />

                  {/* Quantidade no canto */}
                  <span
                    className="
                      absolute bottom-1 right-1
                      rounded-md border border-white/10
                      bg-black/70 px-1.5 py-[1px]
                      text-[0.7rem] font-bold
                      text-white/90
                      shadow-sm
                    "
                  >
                    {item.quantity}
                  </span>
                </>
              ) : (
                <span className="h-10 w-10 rounded bg-white/5" />
              )}

              {/* brilho sutil */}
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-60" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
