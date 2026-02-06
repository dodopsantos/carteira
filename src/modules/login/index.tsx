import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import { TextInput } from '@components/TextInput';
import { Checkbox } from '@components/Checkbox';
import { Button } from '@components/Button';

import { Lock, User, SpinnerGap } from 'phosphor-react';

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

type LoginProps = {
  signIn: (data: Inputs) => Promise<void>;
};

export function Login({ signIn }: LoginProps) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: { remember: false, username: '', password: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (isSubmitting) return; // evita double submit
    setFormError(null);
    setIsSubmitting(true);

    try {
      await signIn({
        username: data.username,
        password: data.password,
        remember: data.remember
      });
    } catch (err: any) {
      // tenta extrair mensagem da API (axios)
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error_description ||
        err?.response?.data?.error ||
        null;

      setFormError(apiMessage ?? 'Não foi possível autenticar. Verifique usuário e senha.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        relative flex min-h-screen w-screen items-center justify-center
        bg-[url('/updates-bg.webp')] bg-cover bg-center
        text-gray-100 py-10
      "
    >
      {/* overlay escurecendo o fundo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />

      {/* brilho espiritual suave no centro */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-teal-500/10 blur-3xl" />

      {/* conteúdo */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:items-stretch md:justify-between">
        {/* LADO ESQUERDO – Branding / Lore */}
        <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <span className="mb-2 inline-flex rounded-full border border-teal-500/40 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-300">
            Sword of Fate
          </span>

          <Heading
            size="lg"
            className="
              mb-3 bg-gradient-to-r from-teal-300 via-teal-100 to-teal-400
              bg-clip-text text-3xl font-extrabold uppercase text-transparent
            "
          >
            Acesse o Portal Espiritual
          </Heading>

          <Text size="md" asChild>
            <p className="max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
              Entre com suas credenciais para acessar o painel de controle de{' '}
              <span className="font-semibold text-teal-300">Sword of Fate</span>,
              gerenciar o mundo, acompanhar atualizações e organizar eventos com a comunidade.
            </p>
          </Text>

          <Text size="sm" asChild>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-500">
              Somente contas autorizadas podem acessar este painel.
            </p>
          </Text>
        </div>

        {/* LADO DIREITO – Card de login */}
        <div
          className="
            relative w-full md:w-[380px]
            rounded-[26px] border border-teal-500/45 bg-black/75
            px-6 py-7 shadow-[0_0_45px_rgba(20,184,166,0.55)] backdrop-blur-xl
            overflow-hidden
          "
        >
          {/* brilho interno vertical sutil */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-teal-500/10 blur-3xl" />

          {/* linha espiritual no topo do card */}
          <div className="relative mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="h-2 w-2 rounded-full bg-cyan-400/70" />
            </div>

            <div className="relative ml-4 h-[2px] flex-1 overflow-hidden rounded-full bg-gray-800/80">
              <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-teal-400 via-teal-200 to-transparent opacity-80" />
            </div>
          </div>

          <header className="relative mb-6 text-center md:text-left">
            <span className="mb-2 inline-flex rounded-full border border-teal-400/40 bg-black/60 px-3 py-[3px] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal-200">
              Minha conta
            </span>
            <Heading size="md" className="mt-2 mb-1">
              Login de acesso
            </Heading>
            <Text size="sm" className="text-gray-400">
              Autentique-se para continuar a sessão.
            </Text>
          </header>

          {/* ERRO GLOBAL */}
          {formError && (
            <div
              className="
                relative mb-4 rounded-xl
                border border-red-500/30 bg-red-500/10
                px-4 py-3
              "
            >
              <Text className="text-sm font-semibold text-red-200">{formError}</Text>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex w-full flex-col items-stretch gap-4"
          >
            {/* USERNAME */}
            <label htmlFor="username" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">Usuário</Text>
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <Text className="font-semibold text-teal-300" size="sm">
                      {message}
                    </Text>
                  )}
                />
              </div>
              <TextInput.Root>
                <TextInput.Icon>
                  <User />
                </TextInput.Icon>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: 'Preencha o campo' }}
                  render={({ field }) => (
                    <TextInput.Input
                      id="username"
                      type="text"
                      placeholder="Digite seu usuário"
                      disabled={isSubmitting}
                      {...field}
                    />
                  )}
                />
              </TextInput.Root>
            </label>

            {/* PASSWORD */}
            <label htmlFor="password" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">Senha</Text>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Text className="font-semibold text-teal-300" size="sm">
                      {message}
                    </Text>
                  )}
                />
              </div>
              <TextInput.Root>
                <TextInput.Icon>
                  <Lock />
                </TextInput.Icon>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Preencha o campo' }}
                  render={({ field }) => (
                    <TextInput.Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      {...field}
                    />
                  )}
                />
              </TextInput.Root>
            </label>

            {/* REMEMBER */}
            <label htmlFor="remember" className="mt-1 flex items-center gap-2">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={val => field.onChange(Boolean(val))}
                    disabled={isSubmitting}
                  />
                )}
              />
              <Text size="sm" className="text-gray-200">
                Manter conectado por 30 dias
              </Text>
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`
                mt-4 w-full justify-center font-semibold uppercase tracking-[0.16em]
                ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <SpinnerGap size={18} className="animate-spin" />
                  Autenticando...
                </span>
              ) : (
                'Entrar no painel'
              )}
            </Button>
          </form>

          <footer className="relative mt-6 flex flex-col gap-3 text-center md:text-left">
            <Text asChild size="sm">
              <a
                href="#"
                className="text-gray-400 underline underline-offset-2 hover:text-teal-300"
              >
                Esqueceu sua senha?
              </a>
            </Text>
            <Text asChild size="sm">
              <a
                href="#"
                className="text-gray-400 underline underline-offset-2 hover:text-teal-300"
              >
                Não possui conta? Fale com um administrador.
              </a>
            </Text>
          </footer>
        </div>
      </div>
    </div>
  );
}
