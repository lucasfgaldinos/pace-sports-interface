import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import loginBanner from '../../assets/login-banner.jpg';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { api } from '../../services/api';

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      name: yup
        .string()
        .min(2, 'O nome deve ter no mínimo 2 caracteres')
        .max(50, 'O nome não pode ter mais que 50 caracteres')
        .required('O nome é obrigatório'),
      email: yup
        .string()
        .max(100, 'O email não pode ter mais que 100 caracteres')
        .email('Isso não é um email válido')
        .required('O email é obrigatório'),
      password: yup
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .max(50, 'A senha não pode ter mais que 50 caracteres')
        .required('A senha é obrigatória'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
        .required('Confirmar a senha é obrigatório'),
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
      const response = await api.post('/users', data);

      console.log(response);

      toast.success('Cadastro realizado com sucesso!');

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
          <p className="font-bold text-2xl">Crie uma conta</p>
          <p className="text-neutral mb-6 text-sm mt-2.5">
            Cadastre-se para poder acessar
          </p>

          <Input
            type="text"
            {...register('name')}
            label={'Nome'}
            id={'register-name'}
            placeholder={'Seu nome'}
            errorMessage={errors.name?.message}
          />

          <Input
            type="email"
            {...register('email')}
            label={'Email'}
            id={'register-email'}
            placeholder={'email@exemplo.com'}
            errorMessage={errors.email?.message}
          />

          <Input
            type="password"
            {...register('password')}
            label={'Senha'}
            id={'register-password'}
            placeholder={'Crie sua senha secreta'}
            errorMessage={errors.password?.message}
          />

          <Input
            type="password"
            {...register('confirmPassword')}
            label={'Confirme sua senha'}
            id={'register-confirm-password'}
            placeholder={'Confirme sua senha'}
            errorMessage={errors.confirmPassword?.message}
          />

          <div className="my-8">
            <Button isLoading={isLoading} type="submit">
              Criar conta
            </Button>
          </div>

          <div className="flex items-center">
            <div className="w-full border-t border-neutral h-px" />
            <p className="text-center text-xs mx-2">Ou</p>
            <div className="w-full border-t border-neutral h-px" />
          </div>

          <div className="my-8">
            <Button>Fazer login</Button>
          </div>

          <p className="text-[10px] text-neutral text-center">
            Ao se cadastrar, você concorda com os Termos de Uso e Política de
            Privacidade
          </p>
        </form>
      </section>
    </div>
  );
};
