import React, { ReactElement } from 'react';
import Image from 'next/image';

export default function Footer(): ReactElement {
  return (
    <div className="flex relative h-36 bg-gray-700 px-5 sm:px-20 items-center justify-between before:bg-[url('/module.webp')] before:absolute before:bg-repeat-x before:block before:w-full before:h-7 before:z-1 before:top-0 before:left-0 before:bg-contain">
      <Image alt="Logo" src="/SOF.png" width={300} height={80} quality={100} />
      <span className="text-white text-xs px-2 sm:px-0">
        Copyright © {new Date().getFullYear()}, D2k studios. Todos os direitos
        reservados.
      </span>
    </div>
  );
}
