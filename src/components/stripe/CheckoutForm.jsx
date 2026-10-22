import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { Button } from '../Button';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { clientSecret },
  } = useLocation();

  const { cartProducts, clearCart } = useCart();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || isLoading) {
      setMessage('Algo deu errado com Stripe.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setMessage(submitError.message);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        redirect: 'if_required',
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });

        try {
          const { status } = await api.post(
            '/orders',
            { products },
            { validateStatus: () => true },
          );

          if (status === 200 || status === 201) {
            toast.success('Pedido realizado com sucesso!');
            setTimeout(() => {
              navigate(
                `/checkout-completo?payment_intent_client_secret=${paymentIntent.client_secret}`,
              );
              clearCart();
            }, 1500);
          } else {
            throw new Error('Falha ao realizar pedido');
          }
        } catch (_err) {
          toast.error(err.message);
        }
      } else {
        toast.error('Algo inesperado deu errado.');
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-xl w-full mx-auto" onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'accordion' }} />
      <div className="mt-6">
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !stripe || !elements}
        >
          Pagar agora
        </Button>
      </div>
      <p className="py-4 text-neutral">
        * Os métodos de pagamento são disponibilizados de acordo com a sua
        região.
      </p>

      {message && <p className="text-center text-pace-red">{message}</p>}
    </form>
  );
};
