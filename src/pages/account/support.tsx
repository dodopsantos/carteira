import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@services/axios';
import { validateTokenSSR } from '@services/auth';
import { AccountSidebar } from '@modules/account/components/AccountSidebar';
import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import Navbar from '@components/layout/components/Navbar';
import Link from 'next/link';
import {
  ArrowLeft,
  ChatCircleDots,
  Users,
  Lock,
  ArrowRight,
  WarningCircle,
  CheckCircle,
} from 'phosphor-react';

interface Props {
  username: string;
}

// ─── Card de opção ────────────────────────────────────────────────────────────

function SupportCard({
  icon,
  title,
  description,
  badge,
  badgeColor,
  cta,
  href,
  recommended,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  cta: string;
  href: string;
  recommended?: boolean;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden transition-all ${
      recommended ? 'border-teal-500/40' : 'border-white/10'
    }`}>
      {recommended && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />
      )}
      {recommended && (
        <div className="absolute right-4 top-4 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-teal-300">
          Recomendado
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Ícone + badge */}
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${badgeColor}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <Text className="text-base font-bold text-slate-50">{title}</Text>
            <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold ${badgeColor}`}>
              {badge}
            </span>
          </div>
        </div>

        <Text className="text-sm leading-relaxed text-slate-400">{description}</Text>

        {/* Avisos */}
        {recommended && (
          <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/8 px-3 py-2.5">
            <CheckCircle size={14} weight="fill" className="mt-0.5 flex-shrink-0 text-emerald-400" />
            <Text className="text-xs text-emerald-300">
              Resposta mais rápida — nossa equipe monitora o canal ativamente.
            </Text>
          </div>
        )}
        {!recommended && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/8 px-3 py-2.5">
            <WarningCircle size={14} weight="fill" className="mt-0.5 flex-shrink-0 text-amber-400" />
            <Text className="text-xs text-amber-300">
              Para assuntos sensíveis como conta, pagamento ou punições.
            </Text>
          </div>
        )}
      </div>

      {/* Botão */}
      <div className="border-t border-white/8 p-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-all ${
            recommended
              ? 'border-teal-500/40 bg-teal-500/15 text-teal-300 hover:bg-teal-500/25'
              : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
          }`}
        >
          {cta}
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupportPage({ username }: Props) {
  return (
    <div className="relative min-h-screen bg-[url('/backgroundNews.webp')] bg-cover bg-top">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <Navbar />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row gap-6 px-4 pb-16 pt-[76px] lg:px-8">

        {/* Sidebar */}
        <div className="pt-10">
          <AccountSidebar active="support" username={username} />
        </div>

        {/* Conteúdo */}
        <main className="flex-1 min-w-0 flex flex-col gap-6 pt-10">

          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">
                Dashboard · Suporte
              </Text>
              <Heading size="lg" className="mt-0.5 text-xl font-extrabold uppercase tracking-wide text-white">
                Ajuda & Suporte
              </Heading>
            </div>
          </div>

          {/* Link voltar */}
          <Link
            href="/account"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-slate-100 transition-colors"
          >
            <ArrowLeft size={13} />
            Voltar ao perfil
          </Link>

          {/* Intro */}
          <div className="rounded-2xl border border-white/10 bg-black/80 p-5 shadow-lg shadow-black/50 backdrop-blur">
            <div className="flex items-start gap-3">
              <ChatCircleDots size={20} className="mt-0.5 flex-shrink-0 text-teal-300" />
              <div>
                <Text className="text-sm font-semibold text-slate-100">Como podemos ajudar?</Text>
                <Text className="mt-1 text-xs leading-relaxed text-slate-400">
                  Escolha abaixo a melhor forma de entrar em contato com nossa equipe.
                  Para dúvidas gerais ou bugs, prefira o canal público — a comunidade também pode ajudar.
                  Para questões privadas, fale diretamente com a staff.
                </Text>
              </div>
            </div>
          </div>

          {/* Cards de opção */}
          <div className="grid gap-5 md:grid-cols-2">
            <SupportCard
              recommended
              icon={<Users size={22} className="text-teal-300" />}
              title="Canal de Suporte"
              description="Acesse o canal #suporte no nosso servidor do Discord. Nossa equipe e a comunidade estão disponíveis para responder dúvidas, reportar bugs e acompanhar atualizações do jogo."
              badge="Público · Discord"
              badgeColor="border-teal-500/30 bg-teal-500/10 text-teal-300"
              cta="Abrir canal de suporte"
              href="https://discord.gg/wXKQk8QtwK"
            />

            <SupportCard
              icon={<Lock size={22} className="text-slate-300" />}
              title="Mensagem Privada"
              description="Para assuntos que exigem privacidade — problemas com conta, pagamentos, denúncias ou punições — entre em contato diretamente com a staff via mensagem privada no Discord."
              badge="Privado · Staff"
              badgeColor="border-white/10 bg-white/5 text-slate-400"
              cta="Enviar mensagem privada"
              href="https://discord.com/users/Dodo#3650"
            />
          </div>

          {/* FAQ rápido */}
          <div className="rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">
            <div className="border-b border-white/10 bg-black/40 px-5 py-3.5">
              <Text className="text-sm font-semibold text-slate-100">Perguntas frequentes</Text>
            </div>
            <div className="divide-y divide-white/5">
              {[
                {
                  q: 'Como reportar um bug?',
                  a: 'Acesse o canal #suporte no Discord e descreva o problema com o máximo de detalhes possível — prints e vídeos ajudam muito.',
                },
                {
                  q: 'Não recebi meus Soul Shards após a doação.',
                  a: 'O crédito é automático em até 5 minutos. Se passou desse tempo, entre em contato via mensagem privada com o comprovante do pagamento.',
                },
                {
                  q: 'Minha conta foi banida incorretamente.',
                  a: 'Recorreu de uma punição? Entre em contato por mensagem privada com a staff para análise do caso.',
                },
                {
                  q: 'Como usar um código de recompensa?',
                  a: 'Acesse Minha Conta → campo "Reivindicar código" e insira o código recebido. Os itens serão creditados automaticamente.',
                },
              ].map((item, i) => (
                <div key={i} className="px-5 py-4">
                  <Text className="text-xs font-semibold text-slate-200">{item.q}</Text>
                  <Text className="mt-1 text-xs leading-relaxed text-slate-500">{item.a}</Text>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const validUser = await validateTokenSSR(ctx);
  if (!validUser) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  return {
    props: { username: validUser.username },
  };
};
