import { ButtonHTMLAttributes, ReactNode } from 'react';
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
        'py-3 px-4 bg-teal-400 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-teal-300 focus:ring-2 ring-white',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
