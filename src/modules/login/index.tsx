import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { Text } from '@components/Text';
import { Logo } from '@assets/logo';
import { Heading } from '@components/Heading';
import { TextInput } from '@components/TextInput';
import { Lock, User } from 'phosphor-react';
import { Checkbox } from '@components/Checkbox';
import { Button } from '@components/Button';

type Inputs = {
  username: string;
  password: string;
  remember: any;
};

export function Login({ signIn }) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: { remember: false }
  });

  const onSubmit: SubmitHandler<Inputs> = data => signIn(data);

  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-100">
      <header className="flex flex-col items-center">
        <Logo />
        <Heading size="lg" className="mt-4">
          Carteira
        </Heading>
        <Text size="lg" className="text-gray-400 mt-1">
          Faça login e comece a usar!
        </Text>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10"
      >
        <label htmlFor="username" className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Text className="font-semibold">Endereço de e-mail</Text>
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
                  {...field}
                />
              )}
            />
          </TextInput.Root>
        </label>
        <label htmlFor="password" className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Text className="font-semibold">Sua senha</Text>
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
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </TextInput.Root>
        </label>
        <label htmlFor="remember" className="flex items-center gap-2">
          <Controller
            name="remember"
            control={control}
            render={({ field: props }) => (
              <Checkbox
                onCheckedChange={e => props.onChange(e)}
                checked={props.value}
                id="remember"
                {...props}
              />
            )}
          />
          <Text size="sm" className="text-gray-200">
            Lembrar de mim por 30 dias
          </Text>
        </label>
        <Button type="submit" className="mt-4">
          Entrar na plataforma
        </Button>
      </form>

      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size="sm">
          <a href="#" className="text-gray-400 underline hover:text-gray-200">
            Esqueceu sua senha?
          </a>
        </Text>
        <Text asChild size="sm">
          <a href="#" className="text-gray-400 underline hover:text-gray-200">
            Não possui conta? Crie uma agora!
          </a>
        </Text>
      </footer>
    </div>
  );
}
