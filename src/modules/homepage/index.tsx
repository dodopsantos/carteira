import React, { useState } from 'react';
import BackgroundVideo from './components/backgroundVideo';
import MenuInfo from './components/menuInfo';
import Carousel from './components/carousel';
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
      <section className="flex min-h-screen items-center justify-center bg-gray-900 bg-[url('/backgroundNews.webp')] text-gray-100 md:bg-none">
        <BackgroundVideo />
        <MenuInfo />
        <ArrowIndicator />
      </section>
      <section className="z-1 before:z-1 relative flex justify-center bg-[url('/backgroundNews.webp')] text-center text-gray-100 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x after:bg-[url('/module.webp')]">
        <div className="pt-24 pb-36 md:px-6">
          <Heading size="lg" className="uppercase">
            Explore um mundo de aventuras
          </Heading>
          <Image
            alt="Logo"
            src="/divider.svg"
            width={100}
            height={100}
            quality={100}
          />
          <Text size="lg" asChild>
            <p className="mx-auto my-0 max-w-3xl px-6 text-center text-justify md:px-0">
              Em Sword of Fate, o mundo é seu para conquistar! A imensidão dos
              mapas permite que você explore praticamente em qualquer lugar -
              Entre o mundo dos humanos, shinigamis e hollows. Tudo o que você
              precisa fazer é adquirir poder e reunir amigos para estabelecer
              seu dominio e construir sua própria guild. Sword of Fate é a sua
              nova experiencia no universo de Bleach, construi sua história e
              principalmente, divirta-se!
            </p>
          </Text>
          <div className="flex items-center gap-1">
            <div className="relative h-8 w-8 max-w-[10vw]">
              <Image
                src="/arrow-left.svg"
                color="teal"
                layout="fill"
                objectFit="contain"
                alt="arrows-left"
              />
            </div>

            <Carousel />
            <div className="relative h-8 w-8 max-w-[10vw]">
              <Image
                src="/arrow-right.svg"
                color="teal"
                layout="fill"
                objectFit="contain"
                alt="arrows-right"
              />
            </div>
          </div>
        </div>
        <ArrowIndicator />
      </section>
      <section
        className={`before:z-1 relative flex justify-center bg-[#242424] ${
          background === 0
            ? 'bg-[url(/ryujin.webp)]'
            : background === 1
            ? 'bg-[url(/ulquiorra.webp)]'
            : background === 2
            ? 'bg-[url(/quincy.webp)]'
            : background === 3
            ? 'bg-[url(/ryoka.webp)]'
            : ''
        }   bg-bottom bg-no-repeat text-center text-gray-100 duration-300 ease-in before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x`}
      >
        <div className="px-6 pt-24 pb-36">
          <Heading
            size="lg"
            className={`mx-auto w-fit rounded bg-gray-800/95 px-2 uppercase`}
          >
            Classes jogáveis
          </Heading>
          <Image
            alt="Logo"
            src="/divider.svg"
            width={100}
            height={100}
            quality={100}
          />
          <PlayableClasses callback={(e: Number) => setBackground(e)} />
          <ArrowIndicator />
        </div>
      </section>
      <section className="before:z-1 relative flex justify-center bg-[#242424] bg-[url('/mechanics.webp')]  bg-bottom bg-no-repeat text-center text-gray-100 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x">
        <div className="px-6 pt-24 pb-36">
          <Heading size="lg" className="uppercase">
            Mecânicas e efeitos únicos
          </Heading>
          <Image
            alt="Logo"
            src="/divider.svg"
            width={100}
            height={100}
            quality={100}
          />
          <Effects />
        </div>
      </section>
    </>
  );
}
