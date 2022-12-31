import React, { ReactElement } from 'react';
import Image from 'next/image';

export default function Footer(): ReactElement {
  return (
    <div className="flex h-36 bg-teal-600 px-5 sm:px-20 items-center justify-between">
      <Image
        alt="Logo"
        src="/bleachLogo.png"
        width={100}
        height={100}
        quality={100}
      />
      <span className="text-white text-xs px-2 sm:px-0">
        Copyright © {new Date().getFullYear()}, D2k studios. Todos os direitos
        reservados.
      </span>
    </div>
  );
}
