import React, { useState } from 'react';
import BackgroundVideo from './components/backgroundVideo';
import MenuInfo from './components/menuInfo';
import Carousel from './components/carousel';
import { PatchNotesSection } from './components/patchNotesSection';
import Image from 'next/image';
import Effects from './components/effects';
import PlayableClasses from './components/playableClasses';
import { ArrowIndicator } from '@components/ArrowIndicator/arrowIndicator';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';

export default function Homepage(): JSX.Element {
  const [background, setBackground] = useState<Number>(0);

  return (
    <>
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden
             bg-gray-900 bg-[url('/backgroundNews.webp')] bg-cover bg-center
             text-gray-100 md:bg-none"
      >
        <BackgroundVideo />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-gray-900/95" />
        <div className="relative z-10 w-full px-4">
          <MenuInfo />
        </div>
        <div className="relative z-20">
          <ArrowIndicator />
        </div>
      </section>

      {/* SECTION 4 – Patch Notes */}
      <PatchNotesSection />

      {/* SECTION 2 – Explore um mundo de aventuras */}
      <section
        className="relative flex flex-col items-center justify-center
         bg-[url('/backgroundNews.webp')] bg-cover bg-center text-gray-100 py-32
         before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full
         before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x"
      >
        {/* overlay sutil para leitura */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-[#050608]/98" />

        <div className="relative z-10 w-full max-w-5xl px-6">
          {/* TÍTULO CENTRAL */}
          <Heading
            size="md"
            className="mb-3 text-center uppercase tracking-[0.18em] text-teal-300"
          >
            Explore um mundo de aventuras
          </Heading>

          {/* divisor */}
          <div className="mb-6 flex justify-center">
            <Image
              alt="Divisor"
              src="/divider.svg"
              width={80}
              height={80}
              quality={100}
            />
          </div>

          {/* TEXTO CENTRAL */}
          <Text size="md" asChild>
            <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-gray-200 md:text-base">
              Em <span className="font-semibold text-teal-300">Sword of Fate</span>,
              você explorará regiões deslumbrantes, enfrentará inimigos poderosos e
              descobrirá os mistérios entre o mundo humano, shinigamis e hollows.
            </p>
          </Text>

          {/* MOCKUP / CAROUSEL – GLASS MINIMAL */}
          <div className="mt-8 flex justify-center">
            <div
              className="
                relative w-full max-w-5xl p-0.5
                rounded-[32px] bg-black/30
                shadow-[0_0_40px_rgba(0,0,0,0.9)]
              "
            >
              <div
                className="
                  relative rounded-[30px]
                  border border-white/10
                  bg-black/40
                  backdrop-blur-md
                  overflow-hidden
                  shadow-[0_0_30px_rgba(0,0,0,0.7)]
                "
              >
                {/* barra superior + “camera” */}
                <div className="pointer-events-none absolute inset-x-0 top-4 flex items-center justify-center gap-2">
                  <span className="h-1 w-16 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                </div>

                {/* home button inferior */}
                <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center">
                  <span className="h-1 w-14 rounded-full bg-white/15" />
                </div>

                {/* CONTEÚDO DO CAROUSEL */}
                <div className="relative px-4 py-8 md:px-6 md:py-10">
                  {/* você pode trocar o variant aqui: 'fade' | 'slide' | 'blur' | 'bankai' */}
                  <Carousel variant="fade" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-20">
          <ArrowIndicator />
        </div>
      </section>

      {/* SECTION 3 – CLASSES JOGÁVEIS */}
      <section
        className={`relative flex justify-center items-center text-gray-100 overflow-hidden
          bg-cover bg-center bg-no-repeat py-32
          transition-all duration-700 ease-in-out
          ${background === 0
            ? "bg-[url('/ryujin.webp')]"
            : background === 1
              ? "bg-[url('/ulquiorra.webp')]"
              : background === 2
                ? "bg-[url('/quincy.webp')]"
                : background === 3
                  ? "bg-[url('/ryoka.webp')]"
                  : ""
          }
        `}
      >
        {/* overlay de leitura */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

        {/* textura superior */}
        <div className="absolute top-0 left-0 w-full h-7 bg-[url('/module.webp')] bg-repeat-x bg-contain opacity-60" />

        {/* conteúdo */}
        <div className="relative z-10 w-full max-w-5xl px-6">

          <Heading
            size="md"
            className="mx-auto mb-3 text-center uppercase tracking-[0.18em] text-teal-300"
          >
            Classes Jogáveis
          </Heading>

          <div className="flex justify-center mb-6">
            <Image
              alt="Divisor"
              src="/divider.svg"
              width={100}
              height={100}
              quality={100}
            />
          </div>

          <PlayableClasses callback={(e: Number) => setBackground(e)} />

          <div className="flex justify-center mt-16">
            <ArrowIndicator />
          </div>
        </div>
      </section>


      {/* SECTION 4 – Mecânicas e efeitos */}
      <section
        className="before:z-1 relative flex justify-center overflow-hidden bg-[#050608] text-gray-100
             before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full
             before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x"
      >
        {/* overlay de leitura */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-[#050608]/98" />

        {/* partículas espirituais */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* partículas pequenas */}
          <span className="absolute top-1/4 left-[12%] h-1.5 w-1.5 rounded-full bg-teal-300/50 blur-[2px] animate-pulse" />
          <span className="absolute top-1/3 right-[18%] h-1 w-1 rounded-full bg-teal-200/40 blur-[1px] animate-pulse" />
          <span className="absolute bottom-1/3 left-[30%] h-1.5 w-1.5 rounded-full bg-cyan-300/45 blur-[2px] animate-pulse" />
          <span className="absolute bottom-[22%] right-[28%] h-2 w-2 rounded-full bg-emerald-300/45 blur-[3px] animate-pulse" />
          {/* “orbes” maiores */}
          <span className="absolute top-[18%] left-[55%] h-8 w-8 rounded-full bg-teal-500/15 blur-[12px] animate-pulse" />
          <span className="absolute bottom-[18%] right-[10%] h-10 w-10 rounded-full bg-cyan-400/10 blur-[14px] animate-pulse" />
        </div>

        <div className="relative z-10 w-full max-w-6xl px-4 pt-24 pb-36 text-center md:px-6">
          <Heading
            size="md"
            className="mb-3 text-center uppercase tracking-[0.18em] text-teal-300"
          >
            Mecânicas e efeitos únicos
          </Heading>

          <div className="mb-6 flex justify-center">
            <Image
              alt="Logo"
              src="/divider.svg"
              width={100}
              height={100}
              quality={100}
            />
          </div>

          <Effects />
        </div>
      </section>
    </>
  );
}
