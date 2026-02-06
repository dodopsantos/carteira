import React from 'react';

export function ArrowIndicator() {
  return (
    <div
      className="
        absolute left-1/2 -translate-x-1/2
        flex flex-col items-center justify-center gap-1
        opacity-80
      "
    >
      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        className="animate-arrow stroke-teal-300/80 stroke-[2px] fill-none"
        style={{ animationDelay: "-1s" }}
      >
        <path d="M2 2 L18 20 L34 2" />
      </svg>

      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        className="animate-arrow stroke-teal-300/70 stroke-[2px] fill-none"
        style={{ animationDelay: "-0.5s" }}
      >
        <path d="M2 2 L18 20 L34 2" />
      </svg>

      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        className="animate-arrow stroke-teal-300/60 stroke-[2px] fill-none"
        style={{ animationDelay: "0s" }}
      >
        <path d="M2 2 L18 20 L34 2" />
      </svg>
    </div>
  );
}
