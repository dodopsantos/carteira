import React, { ReactNode } from 'react';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { PlusCircle } from 'phosphor-react';

export function MarketLayout({
  children,
  onCreate,
  total
}: {
  children: ReactNode;
  onCreate?: () => void;
  total?: number;
}) {
  return (
    <section className="relative h-screen overflow-hidden bg-[url('/backgroundNews.webp')] bg-cover bg-top">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />
      {/* rim de luz no topo — mesmo efeito do hero do Account */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 lg:px-8 h-full flex flex-col min-h-0">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">
              Sword of Fate · Market
            </Text>
            <Heading size="lg" className="mt-0.5 text-2xl font-extrabold text-white">
              Leilão do Reino
            </Heading>
            <Text className="mt-0.5 text-xs text-slate-400">
              Pesquise ofertas e compre direto pelo site.
              {typeof total === 'number' ? (
                <span className="ml-1 text-slate-500">({total} resultado{total !== 1 ? 's' : ''})</span>
              ) : null}
            </Text>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 self-start md:self-auto"
          >
            <PlusCircle size={16} />
            Anunciar item
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-h-0 pb-10">
          {children}
        </div>
      </div>
    </section>
  );
}
