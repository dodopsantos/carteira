import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function MenuInfo(): ReactElement {
  return (
    <div className="flex justify-center align-center flex-col max-w-3xl z-10 p-6 rounded">
      <picture className="flex justify-center">
        <img src="/SOF2.png" className="header__logo" alt="Ravendawn Logo" />
      </picture>
      <div className="bg-gray-900/70 mb-16 rounded">
        <h1 className="text-2xl mb-5 text-center">
          Explore um Mundo Totalmente Novo!
        </h1>
        <p className=" text-center text-xl">
          Uma experiência épica de MMORPG, focada em jogabilidade, comunidade e
          no design único do Bleach!
        </p>
      </div>
      <div className="flex justify-around mb-14">
        <a
          className="flex gap-x-5 rounded border-2 border-solid text-white hover:text-yellow border-white hover:border-yellow bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 w-2/5 text-center justify-center"
          href=""
        >
          <Image src="/AccountIcon.svg" width="25.89" height="25.89" />
          CRIE UMA CONTA
        </a>
        <a
          className="flex gap-x-5 rounded border-2 border-solid text-white hover:text-yellow border-white hover:border-yellow bg-gradient-to-l from-gray-800 to-gray-900 py-6 px-9 w-2/5 text-center justify-center"
          href=""
        >
          <Image src="/download.svg" width="25.89" height="25.89" />
          BAIXAR JOGO
        </a>
      </div>
      <div className="relative block w-full max-w-3xl">
        <div
          className="absolute top-[calc(50%_-_9px)] right-1/2 w-[calc(100%_-_84px)] h-1 translate-x-1/2 translate-y-1/2 
            before:bg-[url('/label.webp')] 
            before:absolute 
            before:bg-repeat-x 
            before:block 
            before:w-full 
            before:h-1 
            before:top-1 
            before:left-0 
            before:bg-contain

            after:bg-[url('/label.webp')] 
            after:absolute 
            after:bg-repeat-x 
            after:block 
            after:w-full 
            after:h-1 
            after:bottom-1 
            after:left-0 
            after:bg-contain"
        >
          <span className="rounded block w-full h-1 absolute z-1 bg-black"></span>
          <span className="rounded block w-full h-1 absolute z-2 bg-[#b1d435] border-y border-[#8aaa1b] w-1/3"></span>
        </div>
        <ul className="flex flex-row align-center justify-between">
          <li className="relative min-w-28 gap-0.5 cursor-pointer text-center">
            <Image
              src="/bleachLogo.png"
              width="60px"
              height="60px"
              quality={100}
            />
            <p className="text-sm font-normal uppercase">Beta interno</p>
          </li>
          <li className="relative min-w-28 gap-0.5 cursor-pointer text-center">
            <Image src="/bleachLogo.png" width={60} height={60} quality={100} />
            <p className="text-sm font-normal uppercase">Beta fechado</p>
          </li>
          <li className="relative min-w-28 gap-0.5 cursor-pointer text-center">
            <Image src="/incomplete.png" width={60} height={60} quality={100} />
            <p className="text-sm font-normal uppercase">Beta aberto</p>
          </li>
          <li className="relative min-w-28 gap-0.5 cursor-pointer text-center">
            <Image src="/incomplete.png" width={60} height={60} quality={100} />
            <p className="text-sm font-normal uppercase">Lançamento</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
