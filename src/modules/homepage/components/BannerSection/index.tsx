import React from 'react';
import Image from 'next/image';
import Typography from '@components/Typography';

export default function Home(): JSX.Element {
  return (
    <div>
      <div className="relative flex items-center justify-center w-screen h-[calc(100vh_-_204px)]">
        <div className="absolute text-center z-10 md:w-8/12 lg:w-7/12 mx-5 md:mx-0">
          <Typography
            textType="PageTitle"
            className=""
            color="white"
            text="Ajudando ONGs a Salvar Animais Vulneráveis"
          />
        </div>
        <div className="z-0">
          <Image
            alt="Cat"
            className="z-0 select-none"
            src="/banner.webp"
            layout="fill"
            objectFit="cover"
            objectPosition="center bottom"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
