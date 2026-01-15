import React, { ReactNode } from 'react';
import { Text } from '@components/Text';

export type PanelCardProps = {
  title?: string;
  icon?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function PanelCard({
  title,
  icon,
  headerRight,
  children,
  className = ''
}: PanelCardProps) {
  return (
    <div
      className={`
        flex justify-between flex-col rounded-2xl border border-white/10
        bg-black/80 p-5 shadow-lg shadow-black/50 backdrop-blur
        ${className}
      `}
    >
      {title && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900/90">
                {icon}
              </span>
            )}
            <Text className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-slate-200">
              {title}
            </Text>
          </div>
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
}
