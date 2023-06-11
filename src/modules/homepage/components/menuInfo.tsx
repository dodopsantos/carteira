import Image from 'next/image';
import React, { ReactElement } from 'react';

export default function MenuInfo(): ReactElement {
  return (
    <div className="flex justify-center align-center flex-col max-w-3xl z-10 bg-gray-900/30 p-6 rounded">
      <picture className="flex justify-center">
        <source
          srcSet="https://cdn.ravendawn.online/img/ravendawn-logo.webp?v=0"
          type="image/webp"
        />
        <source
          srcSet="https://cdn.ravendawn.online/img/ravendawn-logo.png?v=0"
          type="image/png"
        />
        <img
          src="https://cdn.ravendawn.online/img/ravendawn-logo.png?v=0"
          className="header__logo"
          alt="Ravendawn Logo"
        />
      </picture>
      <h1 className="text-2xl mb-5 text-center">
        Explore um Mundo Totalmente Novo!
      </h1>
      <p className="mb-16 text-center text-xl">
        Uma experiência épica de MMORPG, focada em jogabilidade, comunidade e no
        design único do Bleach!
      </p>
      <div className="flex justify-around">
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
    </div>
  );
}
