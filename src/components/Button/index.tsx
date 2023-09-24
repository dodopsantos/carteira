import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Button({
  children,
  asChild,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={clsx(
        'w-full rounded bg-teal-400 py-3 px-4 text-sm font-semibold text-black ring-white transition-colors hover:bg-teal-300 focus:ring-2',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
