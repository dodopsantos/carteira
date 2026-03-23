import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Text } from '@components/Text';
import { TextInput } from '@components/TextInput';
import { X, Lock, Check, SpinnerGap, WarningCircle } from 'phosphor-react';
import { api } from '@services/api';
import { parseCookies } from 'nookies';

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

interface Props {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: Props) {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess]           = useState(false);
  const [formError, setFormError]       = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (isSubmitting) return;
    setFormError(null);
    setIsSubmitting(true);

    try {
      const { 'nextauth-token': token } = parseCookies();
      await api.post(
        '/auth/change-password',
        { currentPassword: data.currentPassword, newPassword: data.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      reset();
      // Fecha após 2s
      setTimeout(onClose, 2000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Não foi possível alterar a senha. Verifique a senha atual.';
      setFormError(msg);
      setIsSubmitting(false);
    }
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm my-auto overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10">
              <Lock size={16} className="text-teal-300" />
            </div>
            <div>
              <Text className="text-sm font-bold text-slate-50">Alterar senha</Text>
              <Text className="text-[0.65rem] text-slate-500">Credenciais da sua conta</Text>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-5">
          {/* Sucesso */}
          {success && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <Check size={18} weight="bold" className="flex-shrink-0 text-emerald-300" />
              <Text className="text-sm font-semibold text-emerald-200">
                Senha alterada com sucesso!
              </Text>
            </div>
          )}

          {/* Erro */}
          {formError && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <WarningCircle size={16} weight="fill" className="mt-0.5 flex-shrink-0 text-red-400" />
              <Text className="text-sm text-red-200">{formError}</Text>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Senha atual */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Text className="text-xs font-semibold text-slate-300">Senha atual</Text>
                  {errors.currentPassword && (
                    <Text className="text-xs text-red-400">{errors.currentPassword.message}</Text>
                  )}
                </div>
                <TextInput.Root>
                  <TextInput.Icon><Lock /></TextInput.Icon>
                  <Controller
                    name="currentPassword"
                    control={control}
                    rules={{ required: 'Obrigatória' }}
                    render={({ field }) => (
                      <TextInput.Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field}
                      />
                    )}
                  />
                </TextInput.Root>
              </div>

              {/* Nova senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Text className="text-xs font-semibold text-slate-300">Nova senha</Text>
                  {errors.newPassword && (
                    <Text className="text-xs text-red-400">{errors.newPassword.message}</Text>
                  )}
                </div>
                <TextInput.Root>
                  <TextInput.Icon><Lock /></TextInput.Icon>
                  <Controller
                    name="newPassword"
                    control={control}
                    rules={{
                      required: 'Obrigatória',
                      minLength: { value: 4, message: 'Mín. 4 caracteres' },
                      validate: val =>
                        val !== watch('currentPassword') || 'Deve ser diferente da atual',
                    }}
                    render={({ field }) => (
                      <TextInput.Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field}
                      />
                    )}
                  />
                </TextInput.Root>
              </div>

              {/* Confirmar nova senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Text className="text-xs font-semibold text-slate-300">Confirmar nova senha</Text>
                  {errors.confirmPassword && (
                    <Text className="text-xs text-red-400">{errors.confirmPassword.message}</Text>
                  )}
                </div>
                <TextInput.Root>
                  <TextInput.Icon><Lock /></TextInput.Icon>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Obrigatória',
                      validate: val =>
                        val === watch('newPassword') || 'As senhas não coincidem',
                    }}
                    render={({ field }) => (
                      <TextInput.Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field}
                      />
                    )}
                  />
                </TextInput.Root>
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-teal-500/40 bg-teal-500/15 py-2.5 text-xs font-semibold text-teal-300 hover:bg-teal-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerGap size={14} className="animate-spin" />
                      Alterando...
                    </>
                  ) : (
                    <>
                      <Check size={14} weight="bold" />
                      Confirmar
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
}
