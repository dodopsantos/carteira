import React, { useState } from 'react';
import Link from 'next/link';

import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import { TextInput } from '@components/TextInput';
import {
  Gift,
  UsersThree,
  ShoppingCart,
  Crown,
  ArrowRight,
  User,
} from 'phosphor-react';
import Navbar from '@components/layout/components/Navbar';
import { Button } from '@components/Button';
import { User as UserInterface } from '@contexts/AuthContext';
import ModalComponent from '@components/Modal';
import { DonationModal } from './components/DonationModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { Character } from '@pages/account';
import { AccountSidebar } from './components/AccountSidebar';
import { PanelCard } from './components/PanelCard';
import { ServerCard } from './components/ServerCard';

type AccountProps = {
  user: UserInterface;
  characters: Character[];
};

export default function Account({ user, characters }: AccountProps) {
  const [toggleModal, setToggleModal] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const totalCharacters = characters?.length ?? 0;
  const highestLevel =
    characters && characters.length > 0
      ? characters.reduce((max, c) => (c.Level > max ? c.Level : max), 0)
      : 0;
  const topCharacters = characters.slice(0, 3);

  const currencies = [
    { label: 'Soul Shards', amount: 12450,  color: 'text-teal-300',    border: 'border-teal-500/25',    bg: 'bg-teal-500/10'    },
    { label: 'Coins',       amount: 876540, color: 'text-amber-300',   border: 'border-amber-500/25',   bg: 'bg-amber-500/10'   },
    { label: 'Crystals',    amount: 320,    color: 'text-fuchsia-300', border: 'border-fuchsia-500/25', bg: 'bg-fuchsia-500/10' },
  ];

  const hasUser = !!user?.username;
  const initials = hasUser ? user.username.slice(0, 2).toUpperCase() : null;

  return (
    <>
      <section className="relative min-h-screen bg-[url('/backgroundNews.webp')] bg-cover bg-top">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

        <Navbar />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row gap-6 px-4 pb-4 pt-[76px] lg:px-8">

          {/* SIDEBAR */}
          <div className="pt-10">
            <AccountSidebar
              username={user?.username}
              active="profile"
              onChangePassword={() => setChangePasswordOpen(true)}
            />
          </div>

          {/* MAIN */}
          <main className="flex-1 min-w-0 flex flex-col gap-5 pt-10">

            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg shadow-black/50 backdrop-blur">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />
              <div className="pointer-events-none absolute -top-10 left-10 h-40 w-60 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5">

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-teal-500/50 bg-slate-900 shadow-[0_0_24px_rgba(20,184,166,0.35)]">
                    {initials ? (
                      <span className="text-2xl font-extrabold text-teal-300">{initials}</span>
                    ) : (
                      <User size={40} weight="thin" className="text-slate-500" />
                    )}
                  </div>
                  {user?.vip && (
                    <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/20">
                      <Crown size={12} className="text-amber-300" weight="fill" />
                    </span>
                  )}
                </div>

                {/* Info principal */}
                <div className="flex-1 min-w-0">
                  <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">
                    Dashboard · Perfil
                  </Text>
                  <Heading size="lg" className="mt-0.5 truncate text-2xl font-extrabold text-white">
                    {user?.username ?? 'Jogador'}
                  </Heading>
                  <Text className="mt-0.5 text-xs text-slate-400">
                    {user?.email ?? '—'}
                  </Text>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {user?.vip && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-200">
                        <Crown size={10} weight="fill" /> VIP
                      </span>
                    )}
                    <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-teal-300">
                      Temporada · Nível 23
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-400">
                      Membro desde {user?.createdAt ?? '—'}
                    </span>
                  </div>
                </div>

                {/* Moedas espirituais */}
                <div className="flex gap-3 sm:flex-shrink-0">
                  {currencies.map(c => (
                    <div key={c.label} className={`flex flex-col items-center rounded-xl border ${c.border} ${c.bg} px-4 py-3`}>
                      <Text className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-slate-300">
                        {c.label}
                      </Text>
                      <span className={`mt-1 text-base font-extrabold tabular-nums ${c.color}`}>
                        {c.amount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GRID 2 COLUNAS */}
            <div className="grid gap-4 lg:grid-cols-2">

              {/* COLUNA ESQUERDA */}
              <div className="flex flex-col gap-6">

                {/* PERSONAGENS */}
                <PanelCard
                  title="Personagens"
                  icon={<UsersThree size={16} className="text-teal-300" />}
                  headerRight={
                    <span className="text-[0.7rem] text-slate-400">
                      Máx. nível{' '}
                      <span className="font-semibold text-teal-300">{highestLevel}</span>
                    </span>
                  }
                >
                  {totalCharacters === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                      <User size={36} weight="thin" className="text-slate-600" />
                      <Text size="sm" className="text-sm text-slate-500">
                        Nenhum personagem criado ainda.
                      </Text>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {topCharacters.map(char => (
                        <li
                          key={char.Name}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/80 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                              <User size={15} weight="fill" className="text-teal-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-100">{char.Name}</span>
                          </div>
                          <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-0.5 text-xs font-bold text-teal-300">
                            Lv {char.Level}
                          </span>
                        </li>
                      ))}
                      {totalCharacters > topCharacters.length && (
                        <li className="px-1 pt-1 text-[0.7rem] text-slate-500">
                          + {totalCharacters - topCharacters.length} outros personagens
                        </li>
                      )}
                    </ul>
                  )}

                  <Link
                    href="/account/characters"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Ver todos os personagens
                    <ArrowRight size={13} />
                  </Link>
                </PanelCard>

              </div>

              {/* COLUNA DIREITA */}
              <div className="flex flex-col gap-4">

                {/* Reivindicar código */}
                <PanelCard
                  title="Reivindicar código"
                  icon={<Gift size={16} className="text-amber-300" />}
                >
                  <Text size="sm" className="mb-3 text-xs text-slate-300">
                    Insira um código de recompensa para receber itens no jogo.
                  </Text>
                  <div className="mb-3">
                    <TextInput.Root>
                      <TextInput.Input placeholder="Digite o código aqui" />
                    </TextInput.Root>
                  </div>
                  <Button className="w-full justify-center rounded-xl border border-teal-500/30 bg-teal-500/15 text-xs font-semibold uppercase tracking-[0.14em] text-teal-200 hover:bg-teal-500/25">
                    Resgatar código
                  </Button>
                </PanelCard>

                {/* Suporte ao projeto */}
                <PanelCard
                  title="Suporte ao projeto"
                  icon={<ShoppingCart size={16} className="text-emerald-300" />}
                >
                  <div className="mb-4 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 via-teal-900/25 to-black/40 p-4">
                    <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      #PlayToSupport
                    </Text>
                    <Text size="sm" className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      Doe via PIX e ganhe <span className="font-bold text-teal-300">Soul Shards</span> para usar no Market. Cada real doado equivale a 1 Shard.
                    </Text>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setToggleModal(true)}
                    className="w-full justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200 hover:bg-emerald-500/25"
                  >
                    Fazer uma doação
                  </Button>
                </PanelCard>

              </div>
            </div>

            {/* SERVIDOR & EVENTOS */}
            <ServerCard />

          </main>
        </div>
      </section>

      {/* MODAL DE DOAÇÃO */}
      {toggleModal && <DonationModal onClose={() => setToggleModal(false)} />}
      {changePasswordOpen && <ChangePasswordModal onClose={() => setChangePasswordOpen(false)} />}
    </>
  );
}
