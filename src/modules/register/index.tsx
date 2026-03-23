import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Link from 'next/link';
import Router from 'next/router';

import { Text } from '@components/Text';
import { Heading } from '@components/Heading';
import { TextInput } from '@components/TextInput';
import { Button } from '@components/Button';
import { Lock, User, Envelope, SpinnerGap, Check } from 'phosphor-react';
import { api } from '@services/api';

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Register() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError]       = useState<string | null>(null);
  const [success, setSuccess]           = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (isSubmitting) return;
    setFormError(null);
    setIsSubmitting(true);

    try {
      await api.post('/auth/register', {
        username: data.username,
        password: data.password,
        email: data.email,
      });
      setSuccess(true);
      // Redireciona para login após 2.5s
      setTimeout(() => Router.push('/login'), 2500);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Não foi possível criar a conta. Tente novamente.';
      setFormError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center bg-[url('/updates-bg.webp')] bg-cover bg-center text-gray-100 py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-64 bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:items-stretch md:justify-between">
        {/* Branding */}
        <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <span className="mb-2 inline-flex rounded-full border border-teal-500/40 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-300">
            Sword of Fate
          </span>
          <Heading size="lg" className="mb-3 bg-gradient-to-r from-teal-300 via-teal-100 to-teal-400 bg-clip-text text-3xl font-extrabold uppercase text-transparent">
            Crie sua conta
          </Heading>
          <Text size="md" asChild>
            <p className="max-w-md text-sm leading-relaxed text-gray-300 md:text-base">
              Registre-se para entrar no mundo de{' '}
              <span className="font-semibold text-teal-300">Sword of Fate</span>, acessar o Market e gerenciar seus personagens.
            </p>
          </Text>
          <Text size="sm" asChild>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-500">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
                Faça login
              </Link>
            </p>
          </Text>
        </div>

        {/* Card */}
        <div className="relative w-full md:w-[400px] rounded-[26px] border border-teal-500/45 bg-black/75 px-6 py-7 shadow-[0_0_45px_rgba(20,184,166,0.55)] backdrop-blur-xl overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-teal-500/10 blur-3xl" />

          {/* Dots decoration */}
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
              Nova conta
            </span>
            <Heading size="md" className="mt-2 mb-1">Cadastro</Heading>
            <Text size="sm" className="text-gray-400">Preencha os dados para criar sua conta.</Text>
          </header>

          {/* Sucesso */}
          {success && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <Check size={18} className="text-emerald-300 flex-shrink-0" weight="bold" />
              <Text className="text-sm font-semibold text-emerald-200">
                Conta criada! Redirecionando para o login...
              </Text>
            </div>
          )}

          {/* Erro */}
          {formError && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <Text className="text-sm font-semibold text-red-200">{formError}</Text>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full flex-col items-stretch gap-4">
            {/* USERNAME */}
            <label htmlFor="reg-username" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">Usuário</Text>
                <ErrorMessage errors={errors} name="username" render={({ message }) => (
                  <Text className="font-semibold text-teal-300" size="sm">{message}</Text>
                )} />
              </div>
              <TextInput.Root>
                <TextInput.Icon><User /></TextInput.Icon>
                <Controller name="username" control={control}
                  rules={{ required: 'Obrigatório', minLength: { value: 3, message: 'Mín. 3 caracteres' } }}
                  render={({ field }) => (
                    <TextInput.Input id="reg-username" type="text" placeholder="Seu nome de usuário" disabled={isSubmitting || success} {...field} />
                  )} />
              </TextInput.Root>
            </label>

            {/* EMAIL */}
            <label htmlFor="reg-email" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">E-mail</Text>
                <ErrorMessage errors={errors} name="email" render={({ message }) => (
                  <Text className="font-semibold text-teal-300" size="sm">{message}</Text>
                )} />
              </div>
              <TextInput.Root>
                <TextInput.Icon><Envelope /></TextInput.Icon>
                <Controller name="email" control={control}
                  rules={{ required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } }}
                  render={({ field }) => (
                    <TextInput.Input id="reg-email" type="email" placeholder="seu@email.com" disabled={isSubmitting || success} {...field} />
                  )} />
              </TextInput.Root>
            </label>

            {/* PASSWORD */}
            <label htmlFor="reg-password" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">Senha</Text>
                <ErrorMessage errors={errors} name="password" render={({ message }) => (
                  <Text className="font-semibold text-teal-300" size="sm">{message}</Text>
                )} />
              </div>
              <TextInput.Root>
                <TextInput.Icon><Lock /></TextInput.Icon>
                <Controller name="password" control={control}
                  rules={{ required: 'Obrigatória', minLength: { value: 4, message: 'Mín. 4 caracteres' } }}
                  render={({ field }) => (
                    <TextInput.Input id="reg-password" type="password" placeholder="••••••••" disabled={isSubmitting || success} {...field} />
                  )} />
              </TextInput.Root>
            </label>

            {/* CONFIRM PASSWORD */}
            <label htmlFor="reg-confirm" className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Text className="text-sm font-semibold">Confirmar senha</Text>
                <ErrorMessage errors={errors} name="confirmPassword" render={({ message }) => (
                  <Text className="font-semibold text-teal-300" size="sm">{message}</Text>
                )} />
              </div>
              <TextInput.Root>
                <TextInput.Icon><Lock /></TextInput.Icon>
                <Controller name="confirmPassword" control={control}
                  rules={{
                    required: 'Obrigatório',
                    validate: val => val === watch('password') || 'As senhas não coincidem'
                  }}
                  render={({ field }) => (
                    <TextInput.Input id="reg-confirm" type="password" placeholder="••••••••" disabled={isSubmitting || success} {...field} />
                  )} />
              </TextInput.Root>
            </label>

            <Button type="submit" disabled={isSubmitting || success}
              className={`mt-2 w-full justify-center font-semibold uppercase tracking-[0.16em] ${(isSubmitting || success) ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <SpinnerGap size={18} className="animate-spin" />
                  Criando conta...
                </span>
              ) : success ? (
                <span className="flex items-center gap-2">
                  <Check size={18} weight="bold" />
                  Conta criada!
                </span>
              ) : 'Criar conta'}
            </Button>
          </form>

          <footer className="relative mt-6 text-center md:text-left">
            <Text asChild size="sm">
              <Link href="/login" className="text-gray-400 underline underline-offset-2 hover:text-teal-300">
                Já tenho uma conta — fazer login
              </Link>
            </Text>
          </footer>
        </div>
      </div>
    </div>
  );
}
