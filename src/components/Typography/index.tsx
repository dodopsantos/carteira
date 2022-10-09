import React, { ReactElement } from 'react';

enum TextTypeEnum {
  PageTitle = 'text-xl md:text-6xl font-bold',
  Title = '',
  Subtitle = '',
  Description = '',
  Right = ''
}

enum TextColorEnum {
  white = 'text-white'
}

interface ITypographyProps {
  text: string;
  textType: keyof typeof TextTypeEnum;
  color: keyof typeof TextColorEnum;
  className: string;
}

export default function Home({
  text,
  color = 'white',
  textType,
  className
}): ReactElement<ITypographyProps> {
  return (
    <span
      className={`${TextTypeEnum[textType]} ${TextColorEnum[color]} ${className}`}
    >
      {text}
    </span>
  );
}
