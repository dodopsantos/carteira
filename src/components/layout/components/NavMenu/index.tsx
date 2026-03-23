import React, { ReactElement, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@contexts/AuthContext';
import useOnClickOutside from '@hooks/onClickOutsideHook';
import { SignOut, User, ShoppingBag } from 'phosphor-react';

// Links estáticos — sempre visíveis
const PUBLIC_LINKS = [
  { title: 'Início',       to: '/' },
  { title: 'Patch Notes',  to: '/#patch-notes' },
  { title: 'Wiki',         to: '/wiki' },
];

export default function NavMenu(): ReactElement {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const [open, setOpen]         = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const router  = useRouter();

  useOnClickOutside(menuRef, () => setOpen(false));
  useOnClickOutside(userRef, () => setUserOpen(false));

  const isActive = (to: string) => router.asPath === to;

  const linkClass = (to: string) =>
    `text-sm font-medium transition-colors ${
      isActive(to) ? 'text-teal-300' : 'text-slate-200 hover:text-teal-300'
    }`;

  return (
    <div className="flex items-center gap-6">
      {/* ── Desktop ── */}
      <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {PUBLIC_LINKS.map(item => (
          <li key={item.to}>
            <Link href={item.to} className={linkClass(item.to)}>
              {item.title}
            </Link>
          </li>
        ))}

        {/* Market só aparece quando logado */}
        {isAuthenticated && (
          <li>
            <Link href="/market" className={linkClass('/market')}>
              Market
            </Link>
          </li>
        )}

        {/* Discord CTA */}
        <li>
          <a
            href="https://discord.gg/wXKQk8QtwK"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-500/70 bg-teal-500/10 px-4 py-1.5 text-xs uppercase tracking-wide text-teal-300 hover:bg-teal-500/20 hover:text-teal-200 transition"
          >
            Discord
          </a>
        </li>

        {/* Auth — logado: avatar dropdown | deslogado: botões */}
        {isAuthenticated ? (
          <li ref={userRef} className="relative">
            <button
              type="button"
              onClick={() => setUserOpen(p => !p)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10 hover:text-teal-300 transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-teal-500/40 bg-teal-500/15 text-teal-300">
                <User size={13} weight="bold" />
              </span>
              <span className="max-w-[100px] truncate font-medium">{user?.username}</span>
            </button>

            {userOpen && (
              <div className="absolute right-0 top-11 w-48 rounded-2xl border border-white/10 bg-black/90 p-2 shadow-xl backdrop-blur z-50">
                <Link
                  href="/account"
                  onClick={() => setUserOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-teal-300 transition-colors"
                >
                  <User size={15} />
                  Minha Conta
                </Link>
                <Link
                  href="/market"
                  onClick={() => setUserOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-teal-300 transition-colors"
                >
                  <ShoppingBag size={15} />
                  Market
                </Link>
                <div className="my-1 h-px bg-white/10" />
                <button
                  type="button"
                  onClick={() => { setUserOpen(false); signOut(); }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <SignOut size={15} />
                  Sair da conta
                </button>
              </div>
            )}
          </li>
        ) : (
          <li className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-teal-300 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-teal-500/40 bg-teal-500/15 px-4 py-1.5 text-sm font-medium text-teal-300 hover:bg-teal-500/25 transition-colors"
            >
              Cadastrar
            </Link>
          </li>
        )}
      </ul>

      {/* ── Mobile ── */}
      <div ref={menuRef} className="relative lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(p => !p)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-slate-200 hover:border-teal-400 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-expanded={open}
        >
          <span className="sr-only">Abrir menu</span>
          <svg className="h-6 w-6" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            )}
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl backdrop-blur">
            <ul className="flex flex-col gap-1 text-sm font-medium text-slate-200">
              {PUBLIC_LINKS.map(item => (
                <li key={item.to} onClick={() => setOpen(false)}>
                  <Link href={item.to} className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-teal-300 transition">
                    {item.title}
                  </Link>
                </li>
              ))}

              {isAuthenticated && (
                <>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/account" className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-teal-300 transition">
                      Minha Conta
                    </Link>
                  </li>
                  <li onClick={() => setOpen(false)}>
                    <Link href="/market" className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-teal-300 transition">
                      Market
                    </Link>
                  </li>
                </>
              )}

              <li>
                <a href="https://discord.gg/wXKQk8QtwK" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-teal-300 hover:bg-slate-800 transition">
                  Discord
                </a>
              </li>

              <li className="my-1 border-t border-white/10 pt-1">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-1 text-xs text-slate-500">{user?.username}</div>
                    <button type="button" onClick={() => { setOpen(false); signOut(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 transition">
                      <SignOut size={15} />
                      Sair da conta
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-1">
                    <Link href="/login" onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-teal-300 transition">
                      Entrar
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-teal-300 hover:bg-slate-800 transition">
                      Cadastrar
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
