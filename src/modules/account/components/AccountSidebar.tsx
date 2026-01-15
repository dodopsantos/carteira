import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import {
  House,
  UserCircle,
  UsersThree,
  ListBullets,
  ShoppingBag,
  ChatCircleDots,
  SignOut,
  X
} from 'phosphor-react';

export type AccountSidebarActive =
  | 'profile'
  | 'characters'
  | 'transactions'
  | 'market'
  | 'support';

type AccountSidebarProps = {
  active?: AccountSidebarActive;
  username?: string;
};

type SidebarSectionProps = {
  label: string;
  children: ReactNode;
};

type SidebarItemProps = {
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
  onNavigate?: () => void;
};

/* ========= SECTION ========= */

function SidebarSection({ label, children }: SidebarSectionProps) {
  return (
    <div className="mt-6">
      <Text className="mb-2 px-1 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </Text>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

/* ========= ITEM ========= */

function SidebarItem({ label, icon, href, active, onNavigate }: SidebarItemProps) {
  return (
    <Link href={href} passHref>
      <a
        onClick={onNavigate}
        className={`
          flex items-center gap-3
          rounded-xl px-3 py-2
          border transition-colors
          ${
            active
              ? `
                border-teal-500/40
                bg-teal-500/15
                text-slate-100
              `
              : `
                border-transparent
                text-slate-200
                hover:bg-white/5
                hover:border-white/10
              `
          }
        `}
      >
        <span
          className={`
            flex h-8 w-8 items-center justify-center rounded-md
            ${
              active
                ? 'bg-teal-500/20 text-teal-300'
                : 'bg-slate-900/80 text-teal-300'
            }
          `}
        >
          {icon}
        </span>

        <span
          className={`
            text-[0.95rem] font-medium
            ${active ? 'text-slate-100' : 'text-slate-200'}
          `}
        >
          {label}
        </span>
      </a>
    </Link>
  );
}

/* ========= CONTENT (shared desktop + mobile) ========= */

function SidebarContent({
  active,
  username,
  onNavigate
}: AccountSidebarProps & { onNavigate?: () => void }) {
  return (
    <>
      {/* Cabeçalho */}
      <div className="mb-4">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-teal-300">
          Sword of Fate
        </span>

        <Heading
          size="sm"
          className="mt-1 text-lg font-extrabold uppercase text-white"
        >
          Painel do jogador
        </Heading>

        {username && (
          <Text className="mt-1 text-sm text-slate-300">
            Conectado como{' '}
            <span className="font-semibold text-teal-300">{username}</span>
          </Text>
        )}
      </div>

      {/* divisor */}
      <div className="mb-4 h-px w-full bg-white/10" />

      {/* Navegação */}
      <nav className="flex-1">
        <div className="space-y-1">
          <SidebarItem
            label="Perfil"
            href="/account"
            active={active === 'profile'}
            icon={<UserCircle size={18} />}
            onNavigate={onNavigate}
          />
          <SidebarItem
            label="Personagens"
            href="/account/characters"
            active={active === 'characters'}
            icon={<UsersThree size={18} />}
            onNavigate={onNavigate}
          />
        </div>

        <SidebarSection label="Atividade">
          <SidebarItem
            label="Transações"
            href="/account/transactions"
            active={active === 'transactions'}
            icon={<ListBullets size={18} />}
            onNavigate={onNavigate}
          />
        </SidebarSection>

        <SidebarSection label="Market">
          <SidebarItem
            label="Market"
            href="/market"
            active={active === 'market'}
            icon={<ShoppingBag size={18} />}
            onNavigate={onNavigate}
          />
        </SidebarSection>

        <SidebarSection label="Suporte">
          <SidebarItem
            label="Ajuda & suporte"
            href="/account/support"
            active={active === 'support'}
            icon={<ChatCircleDots size={18} />}
            onNavigate={onNavigate}
          />
        </SidebarSection>
      </nav>

      {/* Rodapé */}
      <div className="mt-4 border-t border-white/10 pt-4">
        <Link href="/" passHref>
          <a
            onClick={onNavigate}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
          >
            <House size={16} />
            Voltar ao site
          </a>
        </Link>

        {/* BOTÃO SAIR – sempre vermelho claro */}
        <button
          type="button"
          className="
            mt-2 flex w-full items-center gap-2
            rounded-xl px-3 py-2 text-sm font-medium
            border border-red-500/30
            bg-red-500/15
            text-red-300
            hover:bg-red-500/25
            transition-colors
          "
        >
          <SignOut size={16} />
          Sair da conta
        </button>
      </div>
    </>
  );
}

/* ========= SIDEBAR ========= */

export function AccountSidebar({
  active = 'profile',
  username
}: AccountSidebarProps) {
  const [open, setOpen] = useState(false);

  // Fecha o drawer ao trocar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false); // lg
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* MOBILE TOP BAR (substitui "hidden lg:flex" no mobile) */}
      <div className="lg:hidden mb-3 flex items-center justify-between">
        <div>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-teal-300">
            Sword of Fate
          </span>
          <div className="mt-1 text-white text-base font-semibold tracking-wide">
            Painel do jogador
          </div>
          {username && (
            <div className="mt-1 text-xs text-slate-300">
              Conectado como{' '}
              <span className="font-semibold text-teal-300">{username}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            rounded-xl px-4 py-2
            border border-white/10
            bg-white/5
            text-sm font-medium text-white/80
            hover:bg-white/10
            transition-colors
          "
        >
          Menu
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden lg:flex
          w-64 flex-shrink-0 flex-col
          rounded-2xl border border-white/10
          bg-black/80 p-5
          shadow-lg shadow-black/50
          backdrop-blur
        "
      >
        <SidebarContent active={active} username={username} />
      </aside>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* overlay */}
          <button
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />

          {/* painel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm p-4">
            <div
              className="
                h-full flex flex-col
                rounded-2xl border border-white/10
                bg-black/80 p-5
                shadow-lg shadow-black/50
                backdrop-blur
              "
            >
              {/* header do drawer */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-teal-300">
                    Sword of Fate
                  </span>
                  <div className="mt-1 text-white text-base font-semibold tracking-wide">
                    Menu
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    rounded-xl px-3 py-2
                    border border-white/10
                    bg-white/5
                    text-white/80
                    hover:bg-white/10
                    transition-colors
                  "
                >
                  <X size={16} />
                </button>
              </div>

              <SidebarContent
                active={active}
                username={username}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
