import React, { ReactElement, useState, useRef } from 'react';
import NavItem from '../NavItem';
import menuItems from '@utils/data/menuItems.json';
import useOnClickOutside from '@hooks/onClickOutsideHook';

export default function NavMenu(): ReactElement {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setOpen(false));

  return (
    <div ref={menuRef} className="relative flex items-center">
      {/* Desktop */}
      <div className="hidden lg:block">
        <ul className="flex items-center gap-6 text-sm font-medium text-slate-200">
          {menuItems.map((item, key) => {
            const isDiscord = item.title?.toLowerCase().includes('discord');

            if (isDiscord) {
              // Estilo de CTA para Discord
              return (
                <li key={key}>
                  <NavItem
                    title={item.title}
                    to={item.to}
                    className="rounded-full border border-teal-500/70 bg-teal-500/10 px-4 py-1.5 text-xs uppercase tracking-wide text-teal-300 hover:bg-teal-500/20 hover:text-teal-200 transition"
                  />
                </li>
              );
            }

            return (
              <li key={key}>
                <NavItem
                  title={item.title}
                  to={item.to}
                  className="text-sm text-slate-100 hover:text-teal-300 transition-colors"
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Botão mobile */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-slate-200 hover:border-teal-400 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 lg:hidden"
        aria-controls="sof-navbar"
        aria-expanded={open}
      >
        <span className="sr-only">Abrir menu principal</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {open ? (
            // ícone X
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
              1.414L11.414 10l4.293 4.293a1 1 0 
              01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 
              01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 
              010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            // ícone hamburguer
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 
              110 2H4a1 1 0 01-1-1zm0 5a1 1 0 
              011-1h12a1 1 0 110 2H4a1 1 0 
              01-1-1zm0 5a1 1 0 011-1h12a1 1 0 
              110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div
          id="sof-navbar"
          className="absolute right-0 top-12 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium text-slate-200">
            {menuItems.map((item, key) => {
              const isDiscord = item.title?.toLowerCase().includes('discord');

              if (isDiscord) {
                return (
                  <li key={key} onClick={() => setOpen(false)}>
                    <NavItem
                      title={item.title}
                      to={item.to}
                      className="block rounded-xl border border-teal-500/70 bg-teal-500/10 px-3 py-2 text-xs uppercase tracking-wide text-teal-300 hover:bg-teal-500/20 hover:text-teal-200 transition"
                    />
                  </li>
                );
              }

              return (
                <li key={key} onClick={() => setOpen(false)}>
                  <NavItem
                    title={item.title}
                    to={item.to}
                    className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-teal-300 transition"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
