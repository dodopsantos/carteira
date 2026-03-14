import React, { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

interface INavItemProps {
  title: string;
  to: string;
  className?: string; // permite personalizar o estilo
  disabled?: boolean;
}

export default function NavItem({ title, to, className, disabled }: INavItemProps): ReactElement {
  const router = useRouter();

  const isActive = router.asPath === to;

  if (disabled) {
    return (
      <span className={`${className} opacity-50 cursor-not-allowed`}>
        {title}
      </span>
    );
  }

  return (
    <Link href={to} className={clsx(
      // base
      'block rounded px-3 py-2 font-medium transition duration-150',

      // active route
      isActive && 'text-teal-400 relative after:absolute after:left-1/2 after:top-full after:h-[2px] after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-teal-400',

      // custom classes via props
      className
    )}
      aria-current={isActive ? 'page' : undefined}>

      {title}
    </Link>
  );
}
