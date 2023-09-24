import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface INavItemProps {
  title: string;
  to: string;
}

export default function NavItem({ title, to }: INavItemProps): ReactElement {
  const router = useRouter();
  function isCurrentRoute(route: string): boolean {
    return router.asPath === route;
  }

  return (
    <li
      className={`${
        isCurrentRoute(to)
          ? 'bg-teal-600 md:bg-teal-700'
          : 'md:hover:bg-teal-500 '
      } delay-40 mb-1 flex rounded transition ease-in-out last:mb-0 hover:scale-105 md:mb-0`}
    >
      <Link href={to}>
        <a
          className="h-full w-full rounded p-2 font-bold text-white"
          aria-current="page"
        >
          {title}
        </a>
      </Link>
    </li>
  );
}
