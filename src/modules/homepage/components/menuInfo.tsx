import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function MenuInfo(): ReactElement {
  return (
    <div className="align-center z-10 mt-[10vh] flex max-w-3xl flex-col justify-center rounded p-6 md:mt-0">
      <div className="flex w-full justify-center">
        <Image
          src="/SOF2.webp"
          className="header__logo"
          alt="Sword of Fate Logo"
          width={3500}
          height={696}
        />
      </div>
      <div className="mb-16 rounded bg-gray-900/70">
        <Heading size="lg" className="mb-5 text-center">
          Explore um Mundo Totalmente Novo!
        </Heading>
        <Text size="xl" asChild>
          <p className=" text-center">
            Uma experiência épica de MMORPG, focada em jogabilidade, comunidade
            e no design único do Bleach!
          </p>
        </Text>
      </div>
      <div className="mb-14 flex flex-col justify-around gap-2 md:flex-row md:gap-0">
        <Text size="lg" asChild>
          <a
            className="flex w-full justify-center gap-x-5 rounded border-2 border-solid border-white bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 text-center text-white hover:border-yellow hover:text-yellow md:w-2/5"
            href="#"
          >
            <Image
              src="/AccountIcon.svg"
              width="25.89"
              height="25.89"
              alt="Create"
            />
            CRIE UMA CONTA
          </a>
        </Text>
        <Text size="lg" asChild>
          <a
            className="flex w-full justify-center gap-x-5 rounded border-2 border-solid border-white bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 text-center text-white hover:border-yellow hover:text-yellow md:w-2/5"
            href="#"
          >
            <Image
              src="/download.svg"
              width="25.89"
              height="25.89"
              alt="download"
            />
            BAIXAR JOGO
          </a>
        </Text>
      </div>
      <div className="relative block w-full max-w-3xl">
        <div
          className="absolute top-[calc(50%_-_9px)] right-1/2 h-1 w-[calc(100%_-_84px)] translate-x-1/2 translate-y-1/2 
            before:absolute 
            before:top-1 
            before:left-0 
            before:block 
            before:h-1 
            before:w-full 
            before:bg-[url('/label.webp')] 
            before:bg-contain 
            before:bg-repeat-x

            after:absolute 
            after:bottom-1 
            after:left-0 
            after:block 
            after:h-1 
            after:w-full 
            after:bg-[url('/label.webp')] 
            after:bg-contain 
            after:bg-repeat-x"
        >
          <span className="z-1 absolute block h-1 w-full rounded bg-black"></span>
          <span className="z-2 absolute block h-1 w-full w-1/3 rounded border-y border-[#8aaa1b] bg-[#b1d435]"></span>
        </div>
        <ul className="align-center flex flex-row justify-between">
          <li className="min-w-28 relative cursor-pointer gap-0.5 text-center">
            <Image
              src="/bleachLogo.webp"
              width="60px"
              height="60px"
              quality={100}
              alt="logo"
            />
            <Text asChild>
              <p className="md:uppercase">Beta interno</p>
            </Text>
          </li>
          <li className="min-w-28 relative cursor-pointer gap-0.5 text-center">
            <Image
              src="/bleachLogo.webp"
              width={60}
              height={60}
              quality={100}
              alt="logo"
            />
            <Text size="lg" asChild>
              <p className="text-hollow md:uppercase">Beta fechado</p>
            </Text>
          </li>
          <li className="min-w-28 relative cursor-pointer gap-0.5 text-center">
            <Image
              src="/incomplete.webp"
              width={60}
              height={60}
              quality={100}
              alt="logo"
            />
            <Text asChild>
              <p className="md:uppercase">Beta aberto</p>
            </Text>
          </li>
          <li className="min-w-28 relative cursor-pointer gap-0.5 text-center">
            <Image
              src="/incomplete.webp"
              width={60}
              height={60}
              quality={100}
              alt="logo"
            />
            <Text asChild>
              <p className="md:uppercase">Lançamento</p>
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
}
