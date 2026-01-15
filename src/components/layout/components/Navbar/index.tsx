import React, { ReactElement } from 'react';
import NavMenu from '../NavMenu';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(): ReactElement {
  return (
    <nav className="fixed inset-x-0 top-0 z-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
        <div className="mt-3 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-4 shadow-lg backdrop-blur-md">
          <Link href="/">
            <a className="flex items-center gap-2">
              <Image
                src="/SOF.webp"
                alt="Sword of Fate"
                width={163}
                height={44}
                priority
              />
            </a>
          </Link>

          <NavMenu />
        </div>
      </div>
    </nav>
  );
}

