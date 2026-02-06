import React, { useEffect, useMemo, useState } from 'react';
import { Text } from '@components/Text';
import { X, WarningCircle } from 'phosphor-react';
import { StashGrid, StashItem } from '@modules/market/StashGrid';

export type CreateListingInput = {
  itemId: number;
  slot: number;
  imageUrl: string;
  currency: 'gold' | 'shard';
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateListingInput) => Promise<void>;

  // Itens reais do baú (slots + quantidade)
  stashItems: StashItem[];
};

export function CreateListingModal({
  open,
  onClose,
  onCreate,
  stashItems
}: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<{
    slot: number;
    itemId: number;
    maxStack: number;
  } | null>(null);

  const [currency, setCurrency] = useState<'gold' | 'shard'>('gold');
  const [unitPriceStr, setUnitPriceStr] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setIsSaving(false);
  }, [open]);

  const unitPrice = useMemo(() => Number(unitPriceStr || 0), [unitPriceStr]);
  const maxQuantity = selected?.maxStack ?? 1;
  const safeQuantity = Math.min(quantity, maxQuantity);
  const totalPrice = useMemo(
    () => (Number.isFinite(unitPrice) ? unitPrice * safeQuantity : 0),
    [unitPrice, safeQuantity]
  );

  useEffect(() => {
    // se trocar item e a quantidade atual passar do max, ajusta
    if (quantity > maxQuantity) setQuantity(maxQuantity);
    if (quantity < 1) setQuantity(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxQuantity]);

  function validate() {
    if (!selected) return 'Selecione um item no baú.';
    if (!unitPriceStr.trim()) return 'Informe o valor unitário.';
    if (unitPrice <= 0) return 'O valor unitário precisa ser maior que 0.';
    if (safeQuantity <= 0) return 'Quantidade inválida.';
    return null;
  }

  async function handleSubmit() {
    if (isSaving) return;

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError(null);
    setIsSaving(true);

    try {
      await onCreate({
        slot: selected!.slot,
        itemId: selected!.itemId,
        imageUrl: `/items/${selected!.itemId}.png`,
        currency,
        unitPrice,
        quantity: safeQuantity,
        totalPrice
      });

      // reset
      setSelected(null);
      setCurrency('gold');
      setUnitPriceStr('');
      setQuantity(1);

      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Erro ao anunciar item.');
      setIsSaving(false);
    }
  }

  function handleSelect(slot: number, item: StashItem) {
    setSelected({
      slot,
      itemId: item.itemId,
      maxStack: Math.max(1, item.quantity || 1)
    });
    setQuantity(1);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Fechar"
        className="absolute inset-0 bg-black/70"
        onClick={() => !isSaving && onClose()}
      />

      {/* container central */}
      <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
        <div
          className="
            w-full max-w-6xl
            rounded-2xl border border-white/10
            bg-black/80 shadow-lg shadow-black/50
            backdrop-blur
            overflow-hidden
            max-h-[90vh]
            flex flex-col
          "
        >
          {/* Header fixo */}
          <div className="px-5 pt-5 pb-3 border-b border-white/10 flex items-start justify-between gap-3 flex-shrink-0">
            <div>
              <Text className="text-white font-semibold tracking-wide">
                Anunciar item
              </Text>
              <Text className="text-white/60 text-sm">
                Selecione um item do seu baú e defina valor e quantidade.
              </Text>
            </div>

            <button
              type="button"
              onClick={() => !isSaving && onClose()}
              className="
                rounded-xl px-3 py-2 border border-white/10 bg-white/5
                text-white/80 hover:bg-white/10 transition
              "
            >
              <X size={16} />
            </button>
          </div>

          {/* Body scrollável (isso evita “cortar” o menu) */}
          <div className="px-5 py-5 overflow-y-auto flex-1">
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <Text className="text-red-200 text-sm font-semibold flex items-center gap-2">
                  <WarningCircle size={16} />
                  {error}
                </Text>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
              {/* Stash */}
              <div>
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <Text className="text-white font-semibold">Seu baú</Text>
                    <Text className="text-white/50 text-sm">
                      Layout 10×10, slots 64×64 (com scroll se necessário).
                    </Text>
                  </div>

                  <div className="text-xs text-white/40">
                    Selecionado: {selected ? `slot #${selected.slot}` : '—'}
                  </div>
                </div>

                <StashGrid
                  items={stashItems}
                  selectedSlot={selected?.slot ?? null}
                  onSelect={handleSelect}
                  columns={10}
                  rows={10}
                />
              </div>

              {/* Painel de venda */}
              <div className="rounded-2xl border border-white/10 bg-black/50 p-4 shadow-lg shadow-black/40">
                {/* Preview */}
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-xl border border-white/10 bg-black/60 flex items-center justify-center">
                    {selected ? (
                      <img
                        src={`/items/${selected.itemId}.png`}
                        alt="Item selecionado"
                        className="h-14 w-14 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-white/10" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <Text className="text-white/60 text-xs">Item selecionado</Text>
                    <Text className="text-white font-semibold truncate">
                      {selected ? `Item #${selected.itemId}` : 'Selecione no baú'}
                    </Text>
                    <Text className="text-white/40 text-xs">
                      {selected ? `Qtd disponível: ${selected.maxStack}` : '—'}
                    </Text>
                  </div>
                </div>

                {/* Inputs */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <Text className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Moeda
                    </Text>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value as any)}
                      className="
                        w-full rounded-xl border border-white/10 bg-black/50
                        px-3 py-3 text-sm text-white/90
                        focus:outline-none focus:ring-2 focus:ring-teal-500/40
                      "
                    >
                      <option value="gold">gold</option>
                      <option value="shard">shard</option>
                    </select>
                  </div>

                  <div>
                    <Text className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Valor unitário
                    </Text>
                    <input
                      value={unitPriceStr}
                      onChange={e => setUnitPriceStr(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="100"
                      className="
                        w-full rounded-xl border border-white/10 bg-black/50
                        px-3 py-3 text-sm text-white/90 placeholder:text-white/30
                        focus:outline-none focus:ring-2 focus:ring-teal-500/40
                      "
                    />
                  </div>
                </div>

                {/* Quantidade */}
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <Text className="text-white/80 text-sm font-semibold">
                        Quantidade
                      </Text>
                      <Text className="text-white/50 text-xs">
                        Máximo: {maxQuantity}
                      </Text>
                    </div>

                    <div className="text-white font-semibold">{safeQuantity}</div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={maxQuantity}
                    value={safeQuantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="mt-3 w-full accent-emerald-400"
                    disabled={!selected}
                  />

                  <div className="mt-3 flex items-center justify-between text-xs text-white/40">
                    <span>1</span>
                    <span>{maxQuantity}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <div className="flex items-center justify-between">
                    <Text className="text-emerald-200 font-semibold">
                      Total do montante
                    </Text>

                    <div className="text-right">
                      <div className="text-emerald-200 font-extrabold text-lg">
                        {totalPrice}{' '}
                        <span className="text-emerald-200/70 text-sm font-semibold">
                          {currency}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-200/60">
                        {(unitPrice || 0)} × {safeQuantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer fixo */}
          <div className="px-5 py-4 border-t border-white/10 flex items-center justify-end gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="
                rounded-xl px-4 py-2 text-sm font-semibold
                border border-white/10 bg-white/5 text-white/80
                hover:bg-white/10 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="
                rounded-xl px-4 py-2 text-sm font-semibold
                border border-emerald-400/30 bg-emerald-500/20 text-emerald-200
                hover:bg-emerald-500/30 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isSaving ? 'Publicando...' : 'Publicar anúncio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
