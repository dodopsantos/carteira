import React, { ReactElement, useState } from 'react';
import effects from '@utils/data/effects.json';
import dynamic from 'next/dynamic';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { motion, AnimatePresence } from 'framer-motion';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

type EffectItem = {
  title: string;
  description: string;
  source: string;
};

// meta: badge + ícone + cor principal
const EFFECT_META: Record<
  string,
  { badge: string; icon: string; color: string }
> = {
  Sorte: { badge: 'Atributo', icon: '🎲', color: '#2DD4BF' }, // teal
  'Regeneração de vida': { badge: 'Regeneração', icon: '❤️', color: '#22C55E' }, // verde
  'Regeneração de mana': { badge: 'Regeneração', icon: '💧', color: '#0EA5E9' }, // azul
  'Roubo de vida': { badge: 'Mecânica passiva', icon: '🩸', color: '#F97316' }, // laranja
  'Roubo de mana': { badge: 'Mecânica passiva', icon: '🔮', color: '#A855F7' }, // roxo
  Resiliência: { badge: 'Defesa', icon: '🛡️', color: '#38BDF8' }, // sky
  'Velocidade de ataque': { badge: 'Ofensivo', icon: '⚔️', color: '#FB923C' }, // laranja quente
  'Bônus de EXP': { badge: 'Progressão', icon: '⭐', color: '#FACC15' }, // amarelo
  'Taxa crítica': { badge: 'Ofensivo', icon: '⚡', color: '#F97316' } // laranja
};

const DEFAULT_META = {
  badge: 'Mecânica',
  icon: '✨',
  color: '#2DD4BF'
};

export default function Effects(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = effects[activeIndex] as EffectItem;
  const meta = EFFECT_META[current?.title] ?? DEFAULT_META;

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl">
      {/* GRID GERAL – 1 col no mobile, 2 col no md+ */}
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        {/* LISTA DE MECÂNICAS */}
        <div className="md:pr-2">
          <Text size="md" asChild>
            <p className="mb-6 text-left text-sm leading-relaxed text-gray-200 md:text-base">
              Descubra como atributos e mecânicas avançadas impactam cada
              combate, progressão e recompensa dentro de{' '}
              <span className="font-semibold text-teal-300">Sword of Fate</span>.
            </p>
          </Text>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-3 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <ul className="flex flex-col gap-2 md:gap-3">
              {effects.map((item: EffectItem, idx: number) => {
                const isActive = idx === activeIndex;
                const itemMeta = EFFECT_META[item.title] ?? DEFAULT_META;

                return (
                  <li key={idx}>
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      whileHover={{ scale: 1.02 }}
                      animate={{ scale: isActive ? 1.03 : 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className={`
                        flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm md:px-4 md:py-3
                        border transition-all
                        ${isActive
                          ? 'bg-black/60'
                          : 'border-white/10 bg-white/5 hover:border-teal-300/60 hover:bg-white/10'
                        }
                      `}
                      style={
                        isActive
                          ? {
                            borderColor: itemMeta.color,
                            boxShadow: `0 0 22px ${itemMeta.color}99`
                          }
                          : undefined
                      }
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs"
                          style={{ border: `1px solid ${itemMeta.color}` }}
                        >
                          {itemMeta.icon}
                        </span>
                        <Text size="md" asChild>
                          <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gray-100 md:text-[0.75rem]">
                            {item.title}
                          </span>
                        </Text>
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* DETALHE / VÍDEO */}
        <div className="md:pl-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto rounded-2xl border bg-black/40 px-5 py-5 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-md md:px-7 md:py-6"
              style={{
                borderColor: meta.color,
                boxShadow: `0 0 40px ${meta.color}44`
              }}
            >
              {/* BADGE + ÍCONE (pulse leve) */}
              <motion.div
                key={current.title + '-badge'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="mb-2 flex items-center justify-center gap-2 md:justify-center"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg"
                  style={{ border: `1px solid ${meta.color}` }}
                >
                  {meta.icon}
                </span>

                <motion.span
                  className="rounded-full border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    borderColor: meta.color,
                    color: meta.color,
                    backgroundColor: 'rgba(0,0,0,0.65)'
                  }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: 'mirror'
                  }}
                >
                  {meta.badge}
                </motion.span>
              </motion.div>

              <Heading
                size="md"
                className="mb-3 text-center uppercase tracking-[0.18em]"
                style={{ color: meta.color }}
              >
                {current.title}
              </Heading>

              <Text size="lg" asChild>
                <p className="mb-5 text-left text-sm leading-relaxed text-gray-200 md:text-base md:text-justify">
                  {current.description}
                </p>
              </Text>

              {/* PLAYER – DESKTOP */}
              <div className="mt-4 hidden overflow-hidden rounded-xl border border-teal-400/40 bg-black/70 shadow-inner md:block">
                <ReactPlayer
                  light="/thumbnail.png"
                  url={current.source}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>

              {/* PLACEHOLDER ESTILIZADO – MOBILE */}
              <div className="mt-4 block rounded-xl border border-teal-400/40 bg-gradient-to-br from-black/80 via-slate-900/90 to-teal-900/40 p-4 shadow-inner md:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-400/70 bg-black/70 text-lg">
                    ▶
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                      Prévia disponível em vídeo
                    </p>
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-gray-200">
                      Para ver os efeitos completos desta mecânica, assista aos vídeos
                      em um dispositivo desktop.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
