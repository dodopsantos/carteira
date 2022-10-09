import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IInfoCardProps {
  icon: string;
  text: string;
  alt: string;
  link: string;
}

export default function InfoCard({
  text,
  icon,
  alt,
  link
}): ReactElement<IInfoCardProps> {
  return (
    <Link href={link}>
      <div className="mx-auto sm:mx-0 w-28 h-32 cursor-pointer">
        <div className="flex w-full justify-center">
          <Image src={icon} alt={alt} width={60} height={60} quality={100} />
        </div>
        <div className="w-28 h-16 flex justify-center items-center text-center">
          <span className="text-sm font-semibold text-black">{text}</span>
        </div>
      </div>
    </Link>
  );
}
