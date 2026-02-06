import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Heading } from '@components/Heading';
import { clsx } from 'clsx';

export interface CardRootProps {
  children: ReactNode;
  className?: string;
}

function CardRoot({ children, className }: CardRootProps) {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col gap-5 rounded-lg bg-[#0f141c]/95 p-5',
        className
      )}
    >
      {children}
    </div>
  );
}

CardRoot.displayName = 'Card.Root';

export interface CardBgFullProps {
  children: ReactNode;
  backgroundUrl: string;
  className?: string;
}

function CardBgFull({ children, backgroundUrl, className }: CardBgFullProps) {
  return (
    <div
      className={clsx(
        `flex h-full w-full flex-col gap-5 rounded-lg bg-[url('/${backgroundUrl}')] bg-cover bg-center p-5`,
        className
      )}
    >
      {children}
    </div>
  );
}

CardBgFull.displayName = 'Card.BgFull';

export interface CardBgHeaderProps {
  children: ReactNode;
  backgroundUrl: string;
  title: string;
  className?: string;
}

function CardBgHeader({
  children,
  backgroundUrl,
  title,
  className
}: CardBgHeaderProps) {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col gap-5 rounded-lg bg-[#0f141c]/95 p-5',
        className
      )}
    >
      <div
        className={clsx(
          `flex h-1/3 items-center justify-center bg-cover bg-center`,
          backgroundUrl && `bg-[url('/${backgroundUrl}')]`
        )}
      >
        <Heading size="lg">{title}</Heading>
      </div>
      {children}
    </div>
  );
}

CardBgHeader.displayName = 'Card.BgHeader';

export interface CardInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function CardInput(props: CardInputProps) {
  return (
    <input
      className="flex-1 bg-transparent text-xs text-gray-100 outline-none placeholder:text-gray-400"
      {...props}
    />
  );
}

CardInput.displayName = 'Card.Input';

export const Card = {
  Root: CardRoot,
  BgFull: CardBgFull,
  Input: CardInput,
  BgHeader: CardBgHeader
};
