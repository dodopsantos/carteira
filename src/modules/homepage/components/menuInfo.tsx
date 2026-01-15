import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import React, { ReactElement } from 'react';
import Image from 'next/image';

export default function MenuInfo(): ReactElement {
  return (
    <div className="relative z-20 mx-auto mt-20 flex max-w-4xl flex-col items-center justify-center rounded-3xl border border-teal-500/20 bg-[#050608]/80 px-6 py-10 shadow-[0_0_60px_rgba(20,184,166,0.25)] backdrop-blur-lg md:mt-0 md:px-10 md:py-12">
      {/* inner rim light */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />

      {/* LOGO ESTILIZADA ANIME / HIGH-FANTASY */}
      <div className="mb-8 flex w-full flex-col items-center text-center">
        <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-teal-300/80">
          Bleach inspired mmorpg
        </span>

        <div className="relative inline-block">
          {/* camada de sombra / stroke */}
          <span
            className="
              pointer-events-none
              absolute inset-0
              translate-y-[2px]
              select-none
              text-3xl md:text-4xl lg:text-4xl
              font-extrabold uppercase tracking-[0.4em]
              text-black opacity-80
              blur-[2px]
            "
          >
            sword of fate
          </span>

          {/* camada principal com gradiente + glow */}
          <span
            className="
              relative inline-block
              text-3xl md:text-4xl lg:text-4xl
              font-extrabold uppercase tracking-[0.4em]
              text-transparent bg-clip-text
              bg-gradient-to-b from-amber-200 via-yellow-300 to-orange-500
              drop-shadow-[0_0_18px_rgba(250,204,21,0.75)]
            "
          >
            sword of fate
          </span>
        </div>

        {/* “energia espiritual” embaixo da logo */}
        <div className="mt-3 h-[2px] w-40 max-w-full bg-gradient-to-r from-transparent via-teal-400/80 to-transparent blur-[1px] drop-shadow-[0_0_14px_rgba(45,212,191,0.8)]" />
      </div>

      {/* CARD RPG - título + descrição */}
      <div className="mb-8 w-full rounded-xl border border-teal-500/10 bg-black/70 px-5 py-6 shadow-inner">
        <Heading
          size="md"
          className="mb-2 text-center uppercase tracking-wide text-teal-300"
        >
          Explore um mundo totalmente novo
        </Heading>

        <Text size="md" asChild>
          <p className="text-center text-gray-300 leading-relaxed">
            Mergulhe em um vasto universo inspirado em Bleach e enfrente
            desafios crescentes ao lado de aliados poderosos. Evolua, lute e
            escreva a sua própria história.
          </p>
        </Text>
      </div>

      {/* CTAs */}
      <div className="mb-10 flex w-full flex-col justify-center gap-3 md:flex-row md:gap-5">
        {/* Criar conta - secundário */}
        <Text size="lg" asChild>
          <a
            href="#"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/25
                       bg-gradient-to-r from-gray-900/90 via-gray-900/85 to-gray-800/80
                       px-8 py-4 text-center text-sm font-semibold tracking-wide text-white
                       hover:border-teal-400 hover:text-teal-300 hover:shadow-[0_0_24px_rgba(20,184,166,0.4)]
                       transition md:w-auto"
          >
            <Image
              src="/AccountIcon.svg"
              width={26}
              height={26}
              alt="Create"
            />
            CRIAR CONTA
          </a>
        </Text>

        {/* Baixar jogo - primário */}
        <Text size="lg" asChild>
          <a
            href="#"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-teal-500
                       bg-teal-500/10 px-8 py-4 text-center text-sm font-semibold tracking-wide text-teal-300
                       hover:bg-teal-400 hover:text-black hover:shadow-[0_0_24px_rgba(20,184,166,0.5)]
                       transition md:w-auto"
          >
            <Image
              src="/download.svg"
              width={26}
              height={26}
              alt="Download"
            />
            BAIXAR JOGO
          </a>
        </Text>
      </div>

      {/* Roadmap / barra de progresso */}
      <div className="relative w-full max-w-3xl">
        {/* Barra central */}
        <div className="relative mx-auto mb-8 h-2 w-full max-w-[520px]">
          {/* base */}
          <div className="absolute inset-0 rounded-full bg-black/75" />
          {/* progresso */}
          <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-teal-400/90 shadow-[0_0_12px_rgba(20,184,166,0.8)]" />
          {/* texturas */}
          <div className="pointer-events-none absolute inset-x-0 -top-2 h-3 bg-[url('/label.webp')] bg-contain bg-repeat-x opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 h-3 bg-[url('/label.webp')] bg-contain bg-repeat-x opacity-50" />
        </div>

        {/* Fases */}
        <ul className="flex flex-row justify-between text-xs font-medium text-gray-200 md:text-sm">
          <li className="flex min-w-24 flex-col items-center gap-1 text-center">
            <Image
              src="/bleachLogo.webp"
              width={60}
              height={60}
              quality={100}
              alt="Beta interno"
            />
            <Text asChild>
              <p className="uppercase text-gray-300 opacity-80">
                Beta interno
              </p>
            </Text>
          </li>

          <li className="flex min-w-24 flex-col items-center gap-1 text-center">
            <Image
              src="/bleachLogo.webp"
              width={60}
              height={60}
              quality={100}
              alt="Beta fechado"
            />
            <Text size="lg" asChild>
              <p className="uppercase text-hollow font-semibold opacity-90">
                Beta fechado
              </p>
            </Text>
          </li>

          <li className="flex min-w-24 flex-col items-center gap-1 text-center">
            <Image
              src="/incomplete.webp"
              width={60}
              height={60}
              quality={100}
              alt="Beta aberto"
            />
            <Text asChild>
              <p className="uppercase text-gray-400 opacity-70">Beta aberto</p>
            </Text>
          </li>

          <li className="flex min-w-24 flex-col items-center gap-1 text-center">
            <Image
              src="/incomplete.webp"
              width={60}
              height={60}
              quality={100}
              alt="Lançamento"
            />
            <Text asChild>
              <p className="uppercase text-gray-500 opacity-60">
                Lançamento
              </p>
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
}
