import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@services/axios';
import { validateTokenSSR } from '@services/auth';
import { Character } from '@pages/account';
import { AccountSidebar } from '@modules/account/components/AccountSidebar';
import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import Navbar from '@components/layout/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { assetNpc } from '@utils/assets';
import {
  ArrowLeft,
  ArrowRight,
  User,
  SpinnerGap,
} from 'phosphor-react';

// ─── Sprite ──────────────────────────────────────────────────────────────────
// Spritesheet 4×4: coluna = frame animação, linha = direção
// Dir: 0=up 1=down(frente) 2=left 3=right
// Usamos frame 1 (col=1) que é o pose parado

const DIR_LABELS: Record<number, string> = { 0: '↑', 1: '↓', 2: '←', 3: '→' };
const DIR_ORDER = [1, 3, 0, 2]; // frente → direita → costas → esquerda

function CharacterSprite({
  sprite,
  dir,
  size = 96,
}: {
  sprite: string;
  dir: number;
  size?: number;
}) {
  if (!sprite || sprite === 'None' || sprite === '') {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-white/5"
      >
        <User size={size * 0.4} weight="thin" className="text-slate-600" />
      </div>
    );
  }

  // Coluna 0 = pose parada (primeira coluna da spritesheet)
  const col = 0;
  const row = dir;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(\${assetNpc(sprite)})`,
        backgroundPosition: `-${col * size}px -${row * size}px`,
        backgroundSize: `${4 * size}px ${4 * size}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function expPercent(exp: number, next: number) {
  if (!next || next <= 0) return 100;
  return Math.min(100, Math.round((exp / next) * 100));
}

function StatBar({
  label,
  value,
  max,
  bar,
  barColor,
}: {
  label: string;
  value: number;
  max: number;
  bar?: boolean;
  barColor?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 100;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Text className="text-[0.65rem] text-slate-500">{label}</Text>
        <Text className="text-[0.65rem] font-semibold tabular-nums text-slate-400">
          {value.toLocaleString('pt-BR')}
        </Text>
      </div>
      {bar && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full ${barColor} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

const STAT_LABELS  = ['ATK', 'AP', 'DEF', 'MR', 'SPD'];
const STAT_COLORS  = [
  'text-red-300',
  'text-purple-300',
  'text-blue-300',
  'text-teal-300',
  'text-sky-300',
];
const STAT_BG = [
  'bg-red-500/10 border-red-500/20',
  'bg-purple-500/10 border-purple-500/20',
  'bg-blue-500/10 border-blue-500/20',
  'bg-teal-500/10 border-teal-500/20',
  'bg-sky-500/10 border-sky-500/20',
];

// ─── CharacterCard ────────────────────────────────────────────────────────────

function CharacterCard({ char }: { char: Character }) {
  const [dirIdx, setDirIdx] = useState(2); // 2 = up no DIR_ORDER [1,3,0,2]

  const currentDir = DIR_ORDER[dirIdx];

  const prevDir = () => setDirIdx(i => (i - 1 + DIR_ORDER.length) % DIR_ORDER.length);
  const nextDir = () => setDirIdx(i => (i + 1) % DIR_ORDER.length);

  const xpPct = expPercent(char.Exp, char.ExperienceToNextLevel);
  const totalStats = char.BaseStats.map((b, i) => b + char.StatPointAllocations[i]);

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden">

      {/* Header: sprite + nome + nível */}
      <div className="relative flex flex-col items-center gap-3 border-b border-white/8 bg-slate-900/40 px-5 pt-6 pb-5">
        {char.Dead && (
          <span className="absolute right-3 top-3 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[0.6rem] font-semibold text-red-400">
            Morto
          </span>
        )}

        {/* Sprite com controles de direção */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevDir}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
            aria-label="Direção anterior"
          >
            <ArrowLeft size={14} />
          </button>

          <div className="flex flex-col items-center gap-1">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
              <CharacterSprite sprite={char.Sprite} dir={currentDir} size={80} />
            </div>
            <span className="text-[0.6rem] text-slate-600">{DIR_LABELS[currentDir]}</span>
          </div>

          <button
            type="button"
            onClick={nextDir}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
            aria-label="Próxima direção"
          >
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="text-center">
          <Text className="text-base font-extrabold text-slate-50">{char.Name}</Text>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[0.65rem] font-bold text-teal-300">
              Lv {char.Level}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-400">
              {char.Gender === 0 ? 'Masculino' : 'Feminino'}
            </span>
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="flex flex-col gap-4 p-5">

        {/* EXP */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Text className="text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">Experiência</Text>
            <Text className="text-[0.65rem] font-semibold tabular-nums text-amber-300">{xpPct}%</Text>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-amber-400 transition-all"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <Text className="text-[0.6rem] tabular-nums text-slate-600">
              {char.Exp.toLocaleString('pt-BR')} EXP
            </Text>
            <Text className="text-[0.6rem] tabular-nums text-slate-600">
              próximo: {char.ExperienceToNextLevel.toLocaleString('pt-BR')}
            </Text>
          </div>
        </div>

        {/* Vitais — exibe apenas o valor máximo */}
        <div className="flex flex-col gap-2">
          <StatBar
            label="HP máx."
            value={char.MaxVitals[0]}
            max={char.MaxVitals[0]}
            bar
            barColor="bg-red-500"
          />
          <StatBar
            label="MP máx."
            value={char.MaxVitals[1]}
            max={char.MaxVitals[1]}
            bar
            barColor="bg-blue-500"
          />
        </div>

        {/* Stats */}
        <div>
          <Text className="mb-2 text-[0.65rem] text-slate-500 uppercase tracking-[0.15em]">
            Atributos
            {char.StatPoints > 0 && (
              <span className="ml-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0 text-amber-300">
                +{char.StatPoints} pontos
              </span>
            )}
          </Text>
          <div className="grid grid-cols-5 gap-1.5">
            {STAT_LABELS.map((label, i) => (
              <div
                key={label}
                className={`flex flex-col items-center rounded-xl border py-2 gap-0.5 ${STAT_BG[i]}`}
              >
                <Text className={`text-[0.65rem] font-bold ${STAT_COLORS[i]}`}>
                  {totalStats[i]}
                </Text>
                <Text className="text-[0.55rem] text-slate-500">{label}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Último acesso */}
        <div className="border-t border-white/8 pt-3">
          <Text className="text-[0.65rem] text-slate-600">
            Último acesso: <span className="text-slate-500">{formatDate(char.LastOnline)}</span>
          </Text>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  characters: Character[];
  username: string;
}

export default function CharactersPage({ characters, username }: Props) {
  return (
    <div className="relative min-h-screen bg-[url('/backgroundNews.webp')] bg-cover bg-top">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/95 to-black/98" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <Navbar />

      <div className="relative z-10 mx-auto flex h-[calc(100vh-76px)] max-w-7xl flex-col lg:flex-row gap-6 px-4 pb-6 pt-[76px] lg:px-8">

        {/* Sidebar */}
        <div className="pt-10">
          <AccountSidebar active="characters" username={username} />
        </div>

        {/* Conteúdo */}
        <main className="flex-1 min-w-0 flex flex-col gap-4 min-h-0 overflow-hidden pt-4">

          {/* Breadcrumb + título */}
          <div className="flex items-center justify-between pt-10">
            <div>
              <Text className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-teal-300/80">
                Dashboard · Personagens
              </Text>
              <Heading size="lg" className="mt-0.5 text-xl font-extrabold uppercase tracking-wide text-white">
                Meus Personagens
              </Heading>
            </div>
            <span className="hidden lg:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
              {characters.length} personagem{characters.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Link voltar */}
          <Link
            href="/account"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-slate-100 transition-colors"
          >
            <ArrowLeft size={13} />
            Voltar ao perfil
          </Link>

          {/* Grid de personagens — card com scroll interno */}
          {characters.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/80 py-20 text-center backdrop-blur">
              <User size={40} weight="thin" className="text-slate-600" />
              <Text className="text-sm text-slate-500">Nenhum personagem criado ainda.</Text>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/80 shadow-lg shadow-black/50 backdrop-blur overflow-hidden flex flex-col flex-1 min-h-0">
              {/* Header do card */}
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3.5">
                <Text className="text-sm font-semibold text-slate-100">Personagens</Text>
                <Text className="text-xs text-slate-500">
                  {characters.length} personagem{characters.length !== 1 ? 's' : ''}
                </Text>
              </div>

              {/* Área com scroll */}
              <div className="overflow-y-auto flex-1 p-5 market-scroll">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {characters.map(char => (
                    <CharacterCard key={char.Id || char.Name} char={char} />
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  // Valida JWT — redireciona para login se inválido ou expirado
  const validUser = await validateTokenSSR(ctx);
  if (!validUser) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const api = getAPIClient(ctx);

  try {
    const res = await api.get('/users/me/characters');
    return {
      props: {
        characters: res.data.characters ?? [],
        username: validUser.username,
      },
    };
  } catch {
    return {
      props: {
        characters: [],
        username: validUser.username,
      },
    };
  }
};
