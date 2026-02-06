import React, { useState } from 'react';

import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import { TextInput } from '@components/TextInput';
import {
  Gift,
  UsersThree,
  ShoppingCart,
  Coins,
  ChatCircleDots,
  DownloadSimple,
  ShieldCheck,
  DiscordLogo,
  ClockAfternoon
} from 'phosphor-react';
import { Button } from '@components/Button';
import { User as UserInterface } from '@contexts/AuthContext';
import ModalComponent from '@components/Modal';

// se o tipo Character estiver em outro lugar, troque esse import:
import { Character } from '@pages/account';

import { AccountSidebar } from './components/AccountSidebar';
import { PanelCard } from './components/PanelCard';
import { ProfileCard } from './components/ProfileCard';

type AccountProps = {
  user: UserInterface;
  characters: Character[];
};

export default function Account({ user, characters }: AccountProps) {
  const [toggleModal, setToggleModal] = useState(false);
  console.log(characters)
  const totalCharacters = characters?.length ?? 0;
  const highestLevel =
    characters && characters.length > 0
      ? characters.reduce((max, c) => (c.Level > max ? c.Level : max), 0)
      : 0;

  const topCharacters = characters.slice(0, 3);

  const currencies = [
    { label: 'Soul Shards', amount: 12450, color: 'text-teal-300' },
    { label: 'Coins', amount: 876_540, color: 'text-amber-300' },
    { label: 'Crystals', amount: 320, color: 'text-fuchsia-300' }
  ];

  return (
    <>
      <section
        className="
          relative min-h-screen
          bg-[url('/backgroundNews.webp')] bg-cover bg-top
        "
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />

        <div
          className="
          relative z-10 mx-auto
          flex min-h-screen max-w-7xl
          flex-col lg:flex-row
          gap-6
          px-4 pb-10 pt-10
          lg:px-8
        "
        >
          {/* SIDEBAR */}
          <AccountSidebar username={user?.username} active="profile" />

          {/* MAIN */}
          <main className="flex-1">
            {/* Cabeçalho */}
            <header className="mb-6 border-b border-white/10 pb-4">
              <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
                Dashboard &gt; Profile
              </Text>
              <Heading
                size="lg"
                className="mt-1 text-2xl font-extrabold text-slate-50"
              >
                Bem-vindo,{' '}
                <span className="text-teal-300">
                  {user?.username ?? 'jogador'}!
                </span>
              </Heading>
              <Text size="sm" className="mt-1 text-sm text-slate-300">
                Gerencie sua conta, acompanhe seus personagens e acesse as
                principais funcionalidades do{' '}
                <span className="font-semibold text-teal-300">
                  Sword of Fate
                </span>
                .
              </Text>
            </header>

            {/* GRID PRINCIPAL – 3 colunas */}
            <div className="grid gap-7 lg:grid-cols-3">
              {/* PROFILE CARD – linha inteira */}
              <ProfileCard user={user} totalCharacters={totalCharacters} />

              {/* Reivindicar código */}
              <PanelCard
                title="Reivindicar código"
                icon={<Gift size={18} className="text-amber-300" />}
                className="lg:col-span-1"
              >
                <Text size="sm" className="mb-2 text-xs text-slate-300">
                  Insira um código de recompensa para receber itens dentro do
                  jogo.
                </Text>
                <div className="mb-3">
                  <TextInput.Root>
                    <TextInput.Input placeholder="Digite o código aqui" />
                  </TextInput.Root>
                </div>
                <Button className="w-full justify-center bg-slate-800 text-xs text-slate-300 font-semibold uppercase tracking-[0.16em] hover:bg-slate-700">
                  CÓDIGO DE REIVINDICAÇÃO
                </Button>
              </PanelCard>

              {/* Lista de personagens (resumo) */}
              <PanelCard
                title="List of Characters"
                icon={<UsersThree size={18} className="text-teal-300" />}
                className="lg:col-span-1"
                headerRight={
                  <span className="text-[0.7rem] text-slate-400">
                    Máx. nível{' '}
                    <span className="font-semibold text-teal-300">
                      {highestLevel}
                    </span>
                  </span>
                }
              >
                {totalCharacters === 0 ? (
                  <Text size="sm" className="text-sm text-slate-300">
                    Nenhum personagem criado ainda.
                  </Text>
                ) : (
                  <ul className="space-y-2 text-xs text-slate-200">
                    {topCharacters.map(char => (
                      <li
                        key={char.Name}
                        className="flex items-center justify-between rounded-lg bg-slate-900/80 px-3 py-2"
                      >
                        <span>{char.Name}</span>
                        <span className="text-teal-300">
                          Nível {char.Level}
                        </span>
                      </li>
                    ))}
                    {totalCharacters > topCharacters.length && (
                      <li className="mt-1 text-[0.7rem] text-slate-400">
                        + {totalCharacters - topCharacters.length} outros
                        personagens.
                      </li>
                    )}
                  </ul>
                )}

                <Button className="text-slate-300 mt-3 w-full justify-center bg-slate-800 text-[0.7rem] font-semibold uppercase tracking-[0.16em] hover:bg-slate-800">
                  Ver todos os personagens
                </Button>
              </PanelCard>

              {/* Suporte ao projeto */}
              <PanelCard
                title="Suporte ao projeto"
                icon={<ShoppingCart size={18} className="text-emerald-300" />}
                className="lg:col-span-1"
              >
                <div className="mb-3 rounded-xl bg-gradient-to-r from-teal-700/40 via-emerald-600/30 to-cyan-500/20 p-3 text-xs text-slate-100">
                  <Text className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                    #PlayToSupport
                  </Text>
                  <Text size="sm" className="mt-1 text-xs text-slate-100">
                    Ajude a manter os servidores e receba benefícios visuais
                    exclusivos dentro do jogo.
                  </Text>
                </div>

                <Button
                  type="button"
                  onClick={() => setToggleModal(true)}
                  className="text-slate-300 w-full justify-center bg-teal-600 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-teal-500"
                >
                  Área de doações
                </Button>
              </PanelCard>
            </div>

            {/* LINHA EXTRA: moedas espirituais + atividade recente */}
            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {/* Moedas espirituais */}
              <PanelCard
                title="Moedas espirituais"
                icon={<Coins size={18} className="text-amber-300" />}
                className="lg:col-span-2"
              >
                <ul className="grid gap-3 sm:grid-cols-3 text-sm">
                  {currencies.map(c => (
                    <li
                      key={c.label}
                      className="rounded-xl border border-white/5 bg-slate-900/80 px-4 py-3"
                    >
                      <p className="text-xs text-slate-400">{c.label}</p>
                      <p className={`mt-1 text-lg font-semibold ${c.color}`}>
                        {c.amount.toLocaleString('pt-BR')}
                      </p>
                    </li>
                  ))}
                </ul>
              </PanelCard>
            </div>
          </main>
        </div>
      </section>

      {/* MODAL DE DOAÇÃO */}
      <ModalComponent
        btnTitle="Salvar"
        callback={() => console.log('aa')}
        isOpen={toggleModal}
        onClose={() => setToggleModal(!toggleModal)}
        size="xl"
        title="Área de doações"
      >
        <>
          <p className="text-slate-200">
            Aqui você pode configurar o conteúdo da área de doações (texto,
            links, meios de pagamento etc.).
          </p>
        </>
      </ModalComponent>
    </>
  );
}
