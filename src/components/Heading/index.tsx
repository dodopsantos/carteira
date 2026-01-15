import React, { ReactNode, CSSProperties } from 'react';
import { clsx } from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export interface HeadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  style?: CSSProperties; // <-- adicionamos isso
}

export function Heading({
  size = 'md',
  children,
  asChild,
  className,
  style
}: HeadingProps) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      style={style} // <-- aplicamos aqui
      className={clsx(
        'font-sans font-bold text-gray-100',
        {
          'text-lg': size === 'sm',
          'text-xl': size === 'md',
          'text-2xl': size === 'lg'
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
