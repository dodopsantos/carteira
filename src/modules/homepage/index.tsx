import React from 'react';
import BackgroundVideo from './components/backgroundVideo';
import MenuInfo from './components/menuInfo';
import Carousel from './components/carousel';
import Image from 'next/image';

export default function Homepage({ rank }): JSX.Element {
  console.log(rank);
  return (
    <>
      <section className="h-screen md:bg-gray-900 flex items-center justify-center text-gray-100">
        <BackgroundVideo />
        <MenuInfo />
      </section>
      <section className="relative text-center h-screen bg-[url('/backgroundNews.jpg')]  flex justify-center text-gray-100 z-1 before:bg-[url('/module.webp')] before:absolute before:bg-repeat-x before:block before:w-full before:h-7 before:z-1 before:top-0 before:left-0 before:bg-contain after:bg-[url('/module.webp')] after:absolute after:bg-repeat-x after:block after:w-full after:h-7 after:z-1 after:bottom-0 after:left-0 after:bg-contain">
        <div className="pt-24 pb-36 px-6">
          <h2 className="text-center uppercase text-2xl">
            Explore um mundo de aventuras
          </h2>
          <Image
            alt="Logo"
            src="/divider.svg"
            width={100}
            height={100}
            quality={100}
          />
          <p className="text-base max-w-3xl text-center mx-auto my-0">
            Em Sword of Fate, o mundo é seu para conquistar! A imensidão dos
            mapas permite que você explore praticamente em qualquer lugar -
            Entre o mundo dos humanos, shinigamis e hollows. Tudo o que você
            precisa fazer é adquirir poder e reunir amigos para estabelecer seu
            dominio e construir sua própria guild. Sword of Fate é a sua nova
            experiencia no universo de Bleach, construi sua história e
            principalmente, divirta-se!
          </p>
          <Carousel />
        </div>
      </section>
      <section className="relative text-center h-screen bg-[url('/mechanics.jpg')]  flex justify-center text-gray-100 z-1 after:bg-[url('/module.webp')] after:absolute after:bg-repeat-x after:block after:w-full after:h-7 after:z-1 after:bottom-0 after:left-0 after:bg-contain">
        <div className="pt-24 pb-36 px-6">
          <h2 className="text-center uppercase text-2xl">
            Mêcanicas e efeitos únicos
          </h2>
          <Image
            alt="Logo"
            src="/divider.svg"
            width={100}
            height={100}
            quality={100}
          />
        </div>
      </section>
    </>
  );
}
