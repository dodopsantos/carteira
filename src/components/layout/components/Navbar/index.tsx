import React, { ReactElement } from 'react';
import NavMenu from '../NavMenu';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(): ReactElement {
  return (
    <nav className="fixed z-20 w-full p-2.5">
      <div className="md:px-20px flex h-[70px] items-center justify-between rounded-md bg-header px-5">
        <Link href="/">
          <a href="/" className="flex items-center">
            {/* <h1 className="font-bold text-white text-2xl cursor-pointer">
              Soul Reaper
            </h1> */}
            {/* <img src= alt="Logo" /> */}
            <Image
              src={'/SOF.webp'}
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
