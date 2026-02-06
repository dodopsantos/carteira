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
    <section
      className="
        relative h-screen overflow-hidden
        bg-[url('/backgroundNews.webp')] bg-cover bg-top
        overflow-hidden
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />

      {/* ✅ vira um “app shell”: header + content (content pode rolar internamente) */}
      <div className="relative z-10 mx-auto max-w-7xl
  px-4 pt-20 lg:px-8
  h-full flex flex-col min-h-0">
        {/* Header fixo */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-teal-300">
              Sword of Fate
            </span>
            <Heading size="lg" className="mt-2 text-white">
              Market • Leilão do Reino
            </Heading>
            <Text className="mt-2 text-white/60">
              Pesquise ofertas e compre direto pelo site.
              {typeof total === 'number' ? ` (${total} resultado(s))` : ''}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCreate}
              className="
                inline-flex items-center gap-2
                rounded-2xl border border-emerald-400/25
                bg-emerald-500/15 px-4 py-3
                text-sm font-semibold text-emerald-200
                shadow-[0_0_14px_rgba(52,211,153,0.25)]
                hover:bg-emerald-500/20 transition
              "
            >
              <PlusCircle size={18} />
              Anunciar item
            </button>
          </div>
        </div>

        {/* ✅ área que “encolhe” e permite scroll interno dos filhos */}
        <div className="flex-1 min-h-0 pb-10">
          {children}
        </div>
      </div>
    </section>
  );
}
