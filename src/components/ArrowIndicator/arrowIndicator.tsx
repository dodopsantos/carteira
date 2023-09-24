import React, { ReactNode } from 'react';

export function ArrowIndicator() {
  return (
    <svg className="absolute left-2/4 bottom-5 ml-[-30px] h-[72px] w-[60px]">
      <path
        className="animation-delay:-1s; animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]"
        d="M0 0 L30 32 L60 0"
      ></path>
      <path
        className="animation-delay:-0.5s animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]"
        d="M0 20 L30 52 L60 20"
      ></path>
      <path
        className="animation-delay:0s animate-[arrow_2s_infinite] fill-transparent stroke-[#2994D1] stroke-[1px]"
        d="M0 40 L30 72 L60 40"
      ></path>
    </svg>
  );
}
