import React, { ReactElement } from 'react';
import Image from 'next/image';

export default function Footer(): ReactElement {
  return (
    <div className="flex flex-none h-36 bg-sky-600 px-5 sm:px-20 items-center justify-between">
      <Image
        alt="Logo"
        src="/patasAmigas.png"
        width={141}
        height={141}
        quality={100}
      />
      <span className="text-white text-xs">
        Copyright © {new Date().getFullYear()}, PatasAmigas. Todos os direitos
        reservados.
      </span>
    </div>
  );
}
