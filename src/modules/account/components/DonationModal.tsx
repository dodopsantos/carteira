import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Text } from '@components/Text';
import { X, Check, ArrowRight, Coins } from 'phosphor-react';

// Chave PIX e nome do recebedor — ajuste conforme necessário
const PIX_KEY = 'suporte@swordoffate.com';
const PIX_RECEIVER = 'Sword of Fate';

const PRESET_VALUES = [5, 10, 20, 50, 100];

type Step = 'select' | 'pix' | 'done';

interface Props {
  onClose: () => void;
}

function generatePixCode(amount: number): string {
  // Payload PIX estático simplificado (formato real exige CRC16 — use sua lib de produção)
  return `00020126360014BR.GOV.BCB.PIX0114${PIX_KEY}5204000053039865802BR5913${PIX_RECEIVER}6009SAO PAULO62070503***6304ABCD`;
}

export function DonationModal({ onClose }: Props) {
  const [step, setStep]           = useState<Step>('select');
  const [amount, setAmount]       = useState<string>('');
  const [copied, setCopied]       = useState(false);
  const [customFocus, setCustomFocus] = useState(false);

  const numericAmount = parseFloat(amount.replace(',', '.')) || 0;
  const shards        = Math.floor(numericAmount);
  const isValid       = numericAmount >= 1;
  const pixCode       = generatePixCode(numericAmount);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleCopy() {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handlePreset(val: number) {
    setAmount(String(val));
  }

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md my-auto overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-64 rounded-full bg-emerald-500/8 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <Coins size={16} className="text-emerald-300" />
            </div>
            <div>
              <Text className="text-sm font-bold text-slate-50">Área de doações</Text>
              <Text className="text-[0.65rem] text-slate-500">#PlayToSupport · 1 Real = 1 Shard</Text>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* ── STEP 1: Selecionar valor ── */}
        {step === 'select' && (
          <div className="p-5 space-y-5">
            {/* Banner */}
            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 via-teal-900/25 to-black/40 p-4">
              <Text className="text-xs font-semibold text-emerald-300 uppercase tracking-[0.15em]">
                Como funciona
              </Text>
              <Text className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Doe via PIX e receba <span className="font-bold text-emerald-300">Soul Shards</span> diretamente no seu personagem. Os Shards são usados no Market para comprar e vender itens entre jogadores.
              </Text>
            </div>

            {/* Valores predefinidos */}
            <div>
              <Text className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Valor da doação
              </Text>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {PRESET_VALUES.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handlePreset(val)}
                    className={`rounded-xl border py-2.5 text-sm font-bold transition-all ${
                      amount === String(val)
                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    R${val}
                  </button>
                ))}
              </div>

              {/* Campo customizado */}
              <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
                customFocus ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 bg-black/40'
              }`}>
                <span className="text-sm font-semibold text-slate-500">R$</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Outro valor"
                  value={PRESET_VALUES.includes(Number(amount)) ? '' : amount}
                  onFocus={() => setCustomFocus(true)}
                  onBlur={() => setCustomFocus(false)}
                  onChange={e => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-600 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Preview de shards */}
            {isValid && (
              <div className="flex items-center justify-between rounded-xl border border-teal-500/20 bg-teal-500/8 px-4 py-3">
                <Text className="text-xs text-slate-400">Você receberá</Text>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tabular-nums text-teal-300">
                    {shards.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-sm font-semibold text-teal-400">Soul Shards</span>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!isValid}
              onClick={() => setStep('pix')}
              className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/15 py-3 text-sm font-bold uppercase tracking-[0.14em] text-emerald-300 transition-all hover:bg-emerald-500/25 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Gerar código PIX
            </button>
          </div>
        )}

        {/* ── STEP 2: Código PIX ── */}
        {step === 'pix' && (
          <div className="p-5 space-y-5">
            {/* Resumo */}
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-slate-900/60 px-4 py-3">
              <div>
                <Text className="text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">Valor</Text>
                <Text className="text-lg font-extrabold text-slate-50">
                  R$ {numericAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-right">
                <Text className="text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">Soul Shards</Text>
                <Text className="text-lg font-extrabold text-teal-300">{shards.toLocaleString('pt-BR')}</Text>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-right">
                <Text className="text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">Chave PIX</Text>
                <Text className="text-xs font-semibold text-slate-300">{PIX_KEY}</Text>
              </div>
            </div>

            {/* Código PIX Copia e Cola */}
            <div>
              <Text className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                PIX Copia e Cola
              </Text>
              <div className="rounded-xl border border-white/8 bg-slate-900/60 p-3">
                <code className="block break-all font-mono text-[0.6rem] leading-relaxed text-slate-400 select-all">
                  {pixCode}
                </code>
              </div>
            </div>

            {/* Botão copiar */}
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold uppercase tracking-[0.14em] transition-all ${
                copied
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                  : 'border-teal-500/30 bg-teal-500/15 text-teal-300 hover:bg-teal-500/25'
              }`}
            >
              {copied ? <Check size={16} weight="bold" /> : <ArrowRight size={16} />}
              {copied ? 'Copiado!' : 'Copiar código PIX'}
            </button>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
              <Text className="text-xs text-amber-200 leading-relaxed">
                <span className="font-bold">Após o pagamento</span>, os Shards serão creditados automaticamente no seu personagem em até <span className="font-bold">5 minutos</span>.
              </Text>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep('done')}
                className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/15 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
              >
                Já paguei
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirmação ── */}
        {step === 'done' && (
          <div className="p-5 flex flex-col items-center gap-5 text-center py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.25)]">
              <Check size={28} weight="bold" className="text-emerald-300" />
            </div>

            <div>
              <Text className="text-lg font-extrabold text-slate-50">Obrigado pelo suporte!</Text>
              <Text className="mt-1 text-sm text-slate-400">
                Seu pagamento de <span className="font-bold text-slate-200">R$ {numericAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> está sendo processado.
              </Text>
            </div>

            <div className="w-full rounded-xl border border-teal-500/20 bg-teal-500/8 px-4 py-4">
              <Text className="text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">Você receberá</Text>
              <Text className="mt-1 text-2xl font-extrabold tabular-nums text-teal-300">
                {shards.toLocaleString('pt-BR')} Soul Shards
              </Text>
              <Text className="mt-1 text-xs text-slate-500">Em até 5 minutos no seu personagem</Text>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-slate-100 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
}
