import React, { SelectHTMLAttributes } from 'react';

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
};

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <select
      className={`
        h-10 w-full rounded-xl border border-white/10
        bg-black/40 px-3 text-sm text-slate-200
        outline-none transition
        hover:border-white/20
        focus:border-teal-500/40 focus:bg-black/60
        ${className}
      `}
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
