import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface INavItemProps {
  title: string;
  to: string;
}

export default function NavItem({ title, to }): ReactElement<INavItemProps> {
  const router = useRouter();

  function isCurrentRoute(route: string): boolean {
    return router.pathname === route;
  }

  return (
    <li
      className={`${
        isCurrentRoute(to) ? 'bg-sky-600 md:bg-sky-700' : 'md:hover:bg-sky-500 '
      } rounded flex md:mb-0 mb-1 last:mb-0 transition ease-in-out delay-40 hover:scale-105`}
    >
      <Link href={to}>
        <a
          className="font-bold text-white w-full h-full rounded p-2"
          aria-current="page"
        >
          {title}
        </a>
      </Link>
    </li>
  );
}
