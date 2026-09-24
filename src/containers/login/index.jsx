import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import loginBanner from '../../assets/login-960.webp';
import logoPaceSports from '../../assets/pace-sports-branco-rascunho.png';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { api } from '../../services/api';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup
    .object({
      email: yup
        .string()
        .max(100, 'O email não pode ter mais que 100 caracteres')
        .email('Isso não é um email válido')
        .required('O email é obrigatório'),
      password: yup
        .string()
        .max(100, 'A senha não pode ter mais que 100 caracteres')
        .required('A senha é obrigatória'),
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
      const { status } = await api.post(
        '/sessions',
        {
          email: data.email,
          password: data.password,
        },
        { validateStatus: () => true },
      );

      function unlockButton() {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }

      if (status === 200 || status === 201) {
        toast.success('Seja muito bem-vindo(a)!');
        navigate('/');
      } else if (status === 401) {
        toast.error('Email e/ou senha incorretos!');
      } else {
        throw new Error();
      }
      unlockButton();
    } catch (_err) {
      toast.error('Algo inesperado deu errado.');
      unlockButton();
    }
  };

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <section
        className="bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${loginBanner})` }}
      >
        <img className="w-[50%]" src={logoPaceSports} alt="logo-pace-sports" />
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
            errorMessage={errors.email?.message}
          />

          <Input
            type="password"
            {...register('password')}
            label={'Senha'}
            id={'login-password'}
            placeholder={'Sua senha secreta'}
            errorMessage={errors.password?.message}
          />

          <div className="my-8">
            <Button isLoading={isLoading} type="submit">
              Entrar
            </Button>
          </div>

          <div className="flex items-center">
            <div className="w-full border-t border-neutral h-px" />
            <p className="text-center text-xs mx-2">Ou</p>
            <div className="w-full border-t border-neutral h-px" />
          </div>

          <div className="my-8">
            <Button onClick={() => navigate('/cadastro')}>Cadastre-se</Button>
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
