import React, { useState } from 'react';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { ArrowIndicator } from '@components/ArrowIndicator/arrowIndicator';

type PatchCategory = 'balance' | 'content' | 'qol';

type PatchNote = {
  version: string;
  title: string;
  date: string;
  tag: string;
  category: PatchCategory;
  highlights: string[];
  fixes: string[];
};

const patchNotes: PatchNote[] = [
  {
    version: '0.4.1',
    title: 'Despertar Espiritual',
    date: '10 Mar 2026',
    tag: 'Balanceamento + Conteúdo',
    category: 'qol',
    highlights: [
      'Nova árvore de talentos espiritual para Shinigamis de suporte.',
      'Eventos dinâmicos em mapa aberto com ondas de Hollows.',
      'Recompensas sazonais vinculadas à participação em incursões.'
    ],
    fixes: [
      'Ajuste na chance de drop de itens lendários em chefes de raid.',
      'Correção de travamentos ocasionais ao trocar de mapa rapidamente.',
      'Melhorias na responsividade da interface de grupos e party.'
    ]
  },
  {
    version: '0.4.0',
    title: 'Ecos do Hueco Mundo',
    date: '22 Fev 2026',
    tag: 'Novo Mapa',
    category: 'content',
    highlights: [
      'Introdução de área instanciada no Hueco Mundo com novo boss.',
      'Sistema de resistência espiritual aplicado a todas as builds.',
      'Novos conjuntos de equipamentos focados em dano crítico.'
    ],
    fixes: [
      'Correção de erros visuais em alguns efeitos de habilidades.',
      'Melhora no carregamento de assets em conexões mais lentas.'
    ]
  },
  {
    version: '0.3.5',
    title: 'Afinamento de Combate',
    date: '05 Fev 2026',
    tag: 'Balanceamento',
    category: 'balance',
    highlights: [
      'Revisão de escalonamento de dano para build de Quincy à distância.',
      'Aprimoramento da IA de inimigos em áreas de progressão inicial.'
    ],
    fixes: [
      'Correção de tooltips incorretos em atributos avançados.',
      'Ajustes na câmera em algumas arenas de chefe.'
    ]
  }
];

export function PatchNotesSection(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePatch = patchNotes[activeIndex];

  const activeBorderGlow =
    activePatch.category === 'balance'
      ? 'border-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.45)]'
      : activePatch.category === 'content'
        ? 'border-fuchsia-400/70 shadow-[0_0_40px_rgba(232,121,249,0.5)]'
        : 'border-teal-400/70 shadow-[0_0_40px_rgba(45,212,191,0.55)]';

  const activeTitleColor =
    activePatch.category === 'balance'
      ? 'text-amber-300'
      : activePatch.category === 'content'
        ? 'text-fuchsia-300'
        : 'text-teal-300';

  const activeChipBorder =
    activePatch.category === 'balance'
      ? 'border-amber-400/80 text-amber-300'
      : activePatch.category === 'content'
        ? 'border-fuchsia-400/80 text-fuchsia-300'
        : 'border-teal-400/80 text-teal-300';

  const activeBulletColor =
    activePatch.category === 'balance'
      ? 'bg-amber-400'
      : activePatch.category === 'content'
        ? 'bg-fuchsia-400'
        : 'bg-teal-400';

  return (
    <section
      id="patch-notes"
      className="
        relative flex justify-center overflow-hidden
        bg-[url('/updates-bg.webp')] bg-cover bg-center text-gray-100
        py-32 md:py-40
        scroll-mt-24 md:scroll-mt-32
        before:absolute before:top-0 before:left-0 before:block
        before:h-7 before:w-full before:bg-[url('/module.webp')]
        before:bg-contain before:bg-repeat-x
      "
    >
      {/* overlay mais suave pra não matar o background nem o module.webp */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/75 to-black/40" />

      {/* conteúdo principal */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* título da seção */}
        <div className="mb-12 text-center">
          <Heading
            size="md"
            className="mb-2 uppercase tracking-[0.18em] text-teal-300"
          >
            Atualizações & Patch Notes
          </Heading>

          <Text size="md" asChild>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-200 md:text-base">
              Fique por dentro das mudanças mais recentes em{' '}
              <span className="font-semibold text-teal-300">Sword of Fate</span>:
              ajustes de balanceamento, novos conteúdos e melhorias de qualidade
              de vida para a comunidade.
            </p>
          </Text>
        </div>

        {/* bloco de patch + timeline lateral */}
        <div
          className="
            grid gap-8
            lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]
          "
        >
          {/* PATCH EM DESTAQUE */}
          <div
            className={`
              flex h-[460px] flex-col md:h-[500px]
              rounded-3xl bg-black/75
              px-5 py-6 md:px-7 md:py-7
              backdrop-blur-md border ${activeBorderGlow}
            `}
          >
            {/* header: versão + tag + data + Novo */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`
                    rounded-full border bg-black/80 px-3 py-1 text-xs font-semibold
                    uppercase tracking-[0.18em]
                    ${activeChipBorder}
                  `}
                >
                  Patch {activePatch.version}
                </span>

                <span className="rounded-full bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-gray-300">
                  {activePatch.tag}
                </span>

                {activeIndex === 0 && (
                  <span className="rounded-full border border-emerald-400/70 bg-emerald-500/15 px-2 py-[3px] text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Novo
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{activePatch.date}</span>
            </div>

            {/* título do patch */}
            <Heading
              size="lg"
              className={`mb-3 text-left uppercase tracking-[0.14em] ${activeTitleColor}`}
            >
              {activePatch.title}
            </Heading>

            {/* conteúdo scrollável */}
            <div className="mt-1 flex-1 overflow-y-auto pr-2">
              {/* destaques */}
              <div className="mb-5">
                <Text size="md" asChild>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                    Principais destaques
                  </p>
                </Text>

                <ul className="space-y-2 text-sm leading-relaxed text-gray-200">
                  {activePatch.highlights.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span
                        className={`
                          mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full
                          ${activeBulletColor}
                        `}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* correções */}
              {activePatch.fixes?.length > 0 && (
                <div>
                  <Text size="md" asChild>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                      Ajustes e correções
                    </p>
                  </Text>

                  <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                    {activePatch.fixes.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-[6px] h-[3px] w-4 flex-shrink-0 rounded-full bg-gray-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* TIMELINE + LISTA DE PATCHES */}
          <div
            className="
              rounded-3xl border border-white/10 bg-black/75
              p-4 shadow-[0_0_30px_rgba(15,23,42,0.75)] backdrop-blur-md
            "
          >
            <Text size="md" asChild>
              <p className="mb-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                Histórico recente
              </p>
            </Text>

            <div className="relative mt-2 max-h-72 overflow-y-auto pr-2">
              <div
                className="
                  pointer-events-none absolute left-4 top-3 bottom-4
                  w-px bg-gradient-to-b from-teal-400/80 via-teal-500/25 to-teal-400/0
                "
              />

              <ul className="space-y-3 pl-8">
                {patchNotes.map((patch, idx) => {
                  const isActive = idx === activeIndex;

                  const activeTimelineColor =
                    patch.category === 'balance'
                      ? 'border-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.55)]'
                      : patch.category === 'content'
                        ? 'border-fuchsia-400/80 shadow-[0_0_8px_rgba(232,121,249,0.55)]'
                        : 'border-teal-400/80 shadow-[0_0_8px_rgba(45,212,191,0.55)]';

                  const dotActiveColor =
                    patch.category === 'balance'
                      ? 'border-amber-200 bg-amber-400'
                      : patch.category === 'content'
                        ? 'border-fuchsia-200 bg-fuchsia-400'
                        : 'border-teal-200 bg-teal-400';

                  return (
                    <li key={patch.version}>
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`
                          relative flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm
                          border transition-all
                          ${isActive
                            ? `bg-black/90 ${activeTimelineColor}`
                            : 'border-white/5 bg-white/5 hover:border-teal-400/60 hover:bg-white/10'
                          }
                        `}
                      >
                        {/* <span
                          className={`
                            absolute left-[10px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border
                            ${isActive
                              ? dotActiveColor
                              : 'border-gray-600 bg-gray-800'
                            }
                          `}
                        /> */}

                        <div className="flex flex-col">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gray-300">
                            Patch {patch.version}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {patch.title}
                          </p>

                          {idx === 0 && (
                            <span className="mt-1 inline-flex w-fit rounded-full border border-emerald-400/70 bg-emerald-500/15 px-2 py-[2px] text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                              Novo
                            </span>
                          )}
                        </div>
                        <span className="ml-3 text-[0.7rem] text-gray-500">
                          {patch.date}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-4 text-[0.7rem] text-gray-500">
              Mais notas de versão estarão disponíveis em breve na Wiki oficial.
            </p>
          </div>
        </div>

        {/* indicador de scroll para próxima seção */}
        <div className="relative z-10 mt-16">
          <ArrowIndicator />
        </div>
      </div>
    </section>
  );
}
