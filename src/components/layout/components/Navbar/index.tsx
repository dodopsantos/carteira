import React, { ReactElement } from 'react';
import NavMenu from '../NavMenu';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(): ReactElement {
  return (
    <nav className="fixed p-2.5 w-full z-20">
      <div className="flex h-[70px] rounded-md justify-between items-center px-5 md:px-20px bg-header">
        <Link href="/">
          <a href="http://localhost:3000" className="flex items-center">
            {/* <h1 className="font-bold text-white text-2xl cursor-pointer">
              Soul Reaper
            </h1> */}
            {/* <img src= alt="Logo" /> */}
            <Image
              src={'/SOF.png'}
              alt="Picture of the author"
              width={163}
              height={44}
            />
          </a>
        </Link>
        <NavMenu />
      </div>
    </nav>
  );
}
