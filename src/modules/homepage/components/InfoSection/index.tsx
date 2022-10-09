import React from 'react';
import InfoCard from '@components/InfoCard';

export default function Home(): JSX.Element {
  return (
    <div className="p-5 sm:p-0 sm:h-64 flex item-center">
      <div className="w-full justify-center item-center self-center inline-grid sm:flex gap-y-5 sm:gap-y-0 sm:gap-x-32 lg:gap-x-64">
        <InfoCard
          link="/"
          text="Econtre animais para adotar"
          icon="/dogIcon.svg"
          alt="dog"
        />
        <InfoCard
          link="/"
          text="Ajude animais necessitados"
          icon="/helpIcon.svg"
          alt="help"
        />
        <InfoCard
          link="/"
          text="Acompanhe Notícias de ONGs"
          icon="/newsIcon.svg"
          alt="news"
        />
      </div>
    </div>
  );
}
