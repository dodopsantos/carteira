import { ReactNode, useRef } from 'react';

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
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-400 text-white p-1 rounded absolute top-full mt-2"
      >
        {ItemId}
      </div>
    </div>
  );
}
