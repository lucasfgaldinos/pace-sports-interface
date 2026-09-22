import loginBanner from '../../assets/login-banner.jpg';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

export const Login = () => {
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
        <form className="p-10 w-full max-w-lg">
          <p className="font-bold text-2xl">Seja bem-vindo(a)</p>
          <p className="text-neutral mb-6 text-sm mt-2.5">
            Acesse sua conta para continuar
          </p>

          <Input
            label={'Email'}
            name={'login-email'}
            id={'login-email'}
            placeholder={'email@exemplo.com'}
          />

          <Input
            label={'Senha'}
            name={'login-password'}
            id={'login-password'}
            placeholder={'********'}
          />

          <div className="mb-8">
            <Button>Entrar</Button>
          </div>

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
