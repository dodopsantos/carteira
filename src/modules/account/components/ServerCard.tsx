import React from 'react';
import { Text } from '@components/Text';
import { PanelCard } from '@components/PanelCard';
import { useServerStatus } from '@hooks/useServerStatus';
import { SpinnerGap, WarningCircle } from 'phosphor-react';

type GameEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  tag: string;
  tagColor: string;
};

const upcomingEvents: GameEvent[] = [
  {
    id: 1,
    title: 'Invasão de Hollows',
    description: 'Ondas de Menos e Adjuchas invadem Soul Society.',
    date: 'Hoje, 20:00',
    tag: 'Ao vivo',
    tagColor: 'border-red-500/30 bg-red-500/10 text-red-300',
  },
  {
    id: 2,
    title: 'Reset semanal de missões',
    description: 'Missões de guilda e recompensas diárias são renovadas.',
    date: 'Sex, 00:00',
    tag: 'Em breve',
    tagColor: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  },
  {
    id: 3,
    title: 'Torneio Espiritual',
    description: 'PvP classificatório com prêmios em Soul Shards.',
    date: 'Sáb, 15:00',
    tag: 'Evento',
    tagColor: 'border-teal-500/30 bg-teal-500/10 text-teal-300',
  },
];

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function ServerCard() {
  const { status, loading, error } = useServerStatus();

  const isOnline = !error && status?.online === true;

  return (
    <PanelCard
      title="Servidor & Eventos"
      icon={
        <span
          className={`h-2 w-2 rounded-full ${
            loading   ? 'bg-slate-500 animate-pulse' :
            isOnline  ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' :
                        'bg-red-400'
          }`}
        />
      }
    >
      {/* STATUS DO SERVIDOR */}
      <div className="mb-5 rounded-xl border border-white/5 bg-slate-900/60 p-4">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400">
            <SpinnerGap size={14} className="animate-spin" />
            <Text className="text-xs">Verificando servidor...</Text>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-400">
            <WarningCircle size={14} weight="fill" />
            <Text className="text-xs">Não foi possível contactar o servidor.</Text>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                {isOnline && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                )}
                <span className={`relative inline-flex h-3 w-3 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </span>
              <Text className={`text-sm font-semibold ${isOnline ? 'text-slate-100' : 'text-red-300'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Text className="text-lg font-extrabold tabular-nums text-teal-300">
                  {status?.onlineCount ?? 0}
                </Text>
                <Text className="text-xs text-slate-500">jogadores</Text>
              </div>

              <div className="flex items-center gap-1.5 border-l border-white/10 pl-4">
                <Text className="text-[0.65rem] text-slate-500">Uptime</Text>
                <Text className="text-[0.65rem] font-semibold tabular-nums text-slate-400">
                  {status?.uptime ? formatUptime(status.uptime) : '—'}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRÓXIMOS EVENTOS */}
      <div>
        <Text className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Próximos eventos
        </Text>
        <ul className="space-y-2">
          {upcomingEvents.map(event => (
            <li
              key={event.id}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/50 px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Text className="text-sm font-semibold text-slate-100">
                    {event.title}
                  </Text>
                  <span className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-semibold ${event.tagColor}`}>
                    {event.tag}
                  </span>
                </div>
                <Text className="mt-0.5 text-xs text-slate-400">
                  {event.description}
                </Text>
              </div>
              <span className="flex-shrink-0 whitespace-nowrap pt-0.5 text-[0.65rem] font-medium text-slate-500">
                {event.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelCard>
  );
}
