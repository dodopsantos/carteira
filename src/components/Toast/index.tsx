import React, { useEffect, useState } from 'react';
import { WarningCircle, X } from 'phosphor-react';

type ToastType = 'warning' | 'error' | 'success';

type ToastProps = {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
};

const styles: Record<ToastType, string> = {
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  error:   'border-red-500/30 bg-red-500/10 text-red-200',
  success: 'border-teal-500/30 bg-teal-500/10 text-teal-200',
};

const iconStyles: Record<ToastType, string> = {
  warning: 'text-amber-400',
  error:   'text-red-400',
  success: 'text-teal-400',
};

export function Toast({ message, type = 'warning', duration = 5000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // pequeno delay para acionar a animação de entrada
    const enterTimer = setTimeout(() => setVisible(true), 50);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-24 left-1/2 z-[9999]
        flex items-center gap-3
        rounded-2xl border px-5 py-3.5
        shadow-xl shadow-black/50 backdrop-blur
        transition-all duration-300
        ${styles[type]}
        ${visible
          ? '-translate-x-1/2 translate-y-0 opacity-100'
          : '-translate-x-1/2 -translate-y-4 opacity-0'
        }
      `}
    >
      <WarningCircle size={18} weight="fill" className={iconStyles[type]} />

      <span className="text-sm font-medium">
        {message}
      </span>

      <button
        type="button"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Fechar"
      >
        <X size={14} />
      </button>
    </div>
  );
}
