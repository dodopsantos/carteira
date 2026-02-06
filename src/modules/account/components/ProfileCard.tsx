import React from 'react';

import { Text } from '@components/Text';
import { User as UserInterface } from '@contexts/AuthContext';
import { Crown } from 'phosphor-react';

import { PanelCard } from './PanelCard';

export type ProfileCardProps = {
  user: UserInterface;
  totalCharacters: number;
};

export function ProfileCard({ user, totalCharacters }: ProfileCardProps) {
  return (
    <PanelCard
      title={user?.username || 'Jogador'}
      icon={<span className="text-teal-300">👤</span>}
      className="lg:col-span-3 bg-gradient-to-b from-slate-900/95 via-black/95 to-black/95"
      headerRight={
        user?.vip ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-[2px] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-amber-200 border border-amber-400/50">
            <Crown size={14} className="text-amber-300" />
            VIP
          </span>
        ) : null
      }
    >
      <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="h-16 w-16 rounded-full border border-teal-500/60 bg-[url('/ryoka.png')] bg-cover bg-center shadow-[0_0_20px_rgba(20,184,166,0.7)]" />
        <div className="space-y-1 text-sm">
          <div>
            <Text className="text-xs text-slate-400">E-mail{' '}</Text>
            <Text className="text-sm text-slate-100">
              {user?.email ?? '—'}
            </Text>
          </div>

          <div>
            <Text className="text-xs text-slate-400">Membro desde{' '}</Text>
            <Text className="text-sm text-slate-100">
              {user?.createdAt ?? '—'}
            </Text>
          </div>

          <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
            <span>
              Personagens:{' '}
              <span className="font-semibold text-teal-300">
                {totalCharacters}
              </span>
            </span>
            <span>
              Status VIP:{' '}
              <span className="font-semibold">
                {user?.vip ? 'Ativo' : 'Não ativo'}
              </span>
            </span>
            <span>
              Patamar de temporada:{' '}
              <span className="font-semibold text-emerald-300">Nível 23</span>
            </span>
          </div>
        </div>
      </div>
    </PanelCard>
  );
}
