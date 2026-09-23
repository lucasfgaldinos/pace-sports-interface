import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import loginBanner from '../../assets/login-banner.jpg';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { api } from '../../services/api';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await api.post('/sessions', data);

      console.log(response);

      toast.success('Seja muito bem-vindo(a)!');

      setTimeout(() => {
        setIsLoading(false);
        console.log('Destravou o botão');
      }, 2000);
    } catch (_err) {
      toast.error('Verifique seus dados e tente novamente.');

      setTimeout(() => {
        setIsLoading(false);
        console.log('Destravou o botão');
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <section
        className="bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${loginBanner})` }}
      >
        <strong className="text-pace-white text-[50px] font-extrabold">
          Pace Sports
        </strong>
      </section>

      <section className="flex items-center justify-center">
        <form
          className="p-10 w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="font-bold text-2xl">Seja bem-vindo(a)</p>
          <p className="text-neutral mb-6 text-sm mt-2.5">
            Acesse sua conta para continuar
          </p>

          <Input
            type="email"
            {...register('email')}
            label={'Email'}
            id={'login-email'}
            placeholder={'email@exemplo.com'}
          />

          <Input
            type="password"
            {...register('password')}
            label={'Senha'}
            id={'login-password'}
            placeholder={'Sua senha secreta'}
          />

          <div className="mb-5">
            <Button isLoading={isLoading} type="submit">
              Entrar
            </Button>
          </div>

          <p className="text-center text-red-700 text-sm mb-4 h-3.5">
            {(errors.email || errors.password) &&
              'Dados de login incompletos ou inválidos'}
          </p>

          <div className="flex items-center">
            <div className="w-full border-t border-neutral h-px" />
            <p className="text-center text-xs mx-2">Ou</p>
            <div className="w-full border-t border-neutral h-px" />
          </div>

          <div className="mb-8 mt-8">
            <Button>Cadastre-se</Button>
          </div>

          <p className="text-[10px] text-neutral text-center">
            Ao entrar, você concorda com os Termos de Uso e Política de
            Privacidade
          </p>
        </form>
      </section>
    </div>
  );
};
