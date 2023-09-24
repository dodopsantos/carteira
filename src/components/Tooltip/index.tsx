import React, { ReactNode, useRef } from 'react';

export interface TooltipProps {
  children: ReactNode;
  ItemId: string;
}

export function Tooltip({ children, ItemId }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !containerRef.current) return;
        const { left } = containerRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className="group relative inline-block"
    >
      {children}
      <div
        ref={tooltipRef}
        className="invisible absolute top-full mt-2 rounded bg-gray-400 p-1 text-white opacity-0 transition group-hover:visible group-hover:opacity-100"
      >
        {ItemId}
      </div>
    </div>
  );
}
