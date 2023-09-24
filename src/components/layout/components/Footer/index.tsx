import React, { ReactElement } from 'react';
import Image from 'next/image';

export default function Footer(): ReactElement {
  return (
    <div className="before:z-1 relative flex h-36 items-center justify-between bg-gray-700 px-5 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x sm:px-20">
      <Image alt="Logo" src="/SOF.webp" width={300} height={80} quality={100} />
      <span className="px-2 text-xs text-white sm:px-0">
        Copyright © {new Date().getFullYear()}, D2k studios. Todos os direitos
        reservados.
      </span>
    </div>
  );
}
