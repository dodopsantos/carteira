import React, { useState } from 'react';
import { useServerStatus } from '@hooks/useServerStatus';
import { Text } from '@components/Text';
import { SpinnerGap, UsersThree, X } from 'phosphor-react';

export function ServerStatusBadge() {
  const { status, loading, error } = useServerStatus();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isOnline = !error && status?.online === true;
  const playersOnline = status?.onlineCount ?? 0;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur">

        {/* Indicador */}
        <div className="relative flex-shrink-0">
          {loading ? (
            <SpinnerGap size={16} className="animate-spin text-slate-400" />
          ) : (
            <>
              <span
                className={`block h-3 w-3 rounded-full ${
                  error || !isOnline ? 'bg-red-400' : 'bg-emerald-400'
                }`}
              />
              {isOnline && !error && (
                <span className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}
            </>
          )}
        </div>

        {/* Texto */}
        <div className="flex flex-col">
          <Text className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Sword of Fate
          </Text>
          {loading ? (
            <Text className="text-xs text-slate-500">Verificando...</Text>
          ) : error || !isOnline ? (
            <Text className="text-xs font-semibold text-red-400">Offline</Text>
          ) : (
            <div className="flex items-center gap-1.5">
              <Text className="text-xs font-semibold text-emerald-400">Online</Text>
              {playersOnline > 0 && (
                <>
                  <span className="text-slate-600 text-xs">·</span>
                  <UsersThree size={11} className="text-slate-400" />
                  <Text className="text-xs tabular-nums text-slate-300">
                    {playersOnline.toLocaleString('pt-BR')}
                  </Text>
                </>
              )}
            </div>
          )}
        </div>

        {/* Fechar */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="ml-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:text-slate-300"
          aria-label="Fechar"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
