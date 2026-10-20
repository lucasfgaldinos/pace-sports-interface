import { Elements } from '@stripe/react-stripe-js';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';
import { CheckoutForm } from '../components';
import { stripePromise } from '../config/stripeConfig';

export const Checkout = () => {
  const {
    state: { clientSecret },
  } = useLocation();

  if (!clientSecret) {
    <div className="min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-10 py-30">
        <p className="font-bold text-center">
          Algo deu errado, por favor volte e tente novamente
        </p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-10 py-30">
        <span className="text-neutral flex items-center gap-2 text-sm">
          Home
          <ChevronRight className="ml-3" color="#6B7280" size={14} />
          Carrinho
          <ChevronRight className="ml-3" color="#6B7280" size={14} />
          <b className="text-dark">Checkout</b>
        </span>
        <h1 className="text-dark font-extrabold text-5xl mt-6">Checkout</h1>
        <hr className="text-neutral/20 my-7" />

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};
