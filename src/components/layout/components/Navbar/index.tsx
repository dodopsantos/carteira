import React, { ReactElement } from 'react';
import NavMenu from '../NavMenu';
import Link from 'next/link';

export default function Navbar(): ReactElement {
  return (
    <nav className="flex flex-none h-60px bg-teal-600 items-center">
      <div className="h-full flex flex-wrap justify-between items-center px-5 md:px-20 w-full">
        <Link href="/">
          <a href="http://localhost:3000" className="flex items-center">
            <h1 className="font-volkhov font-bold text-white text-2xl cursor-pointer">
              Bleach
            </h1>
          </a>
        </Link>
        <NavMenu />
      </div>
    </nav>
  );
}
