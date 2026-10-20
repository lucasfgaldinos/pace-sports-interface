import { useStripe } from '@stripe/react-stripe-js';
import {
  BadgeCheck,
  Ban,
  CircleX,
  Info,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components';

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: 'Pagamento concluído',
    iconColor: '#00A74B',
    Icon: <BadgeCheck color="#F9F9FF" />,
    buttonText: 'Voltar para a Home',
    url: '/',
  },
  processing: {
    text: 'Seu pagamento está sendo processado.',
    iconColor: '#6366F1',
    Icon: <Info color="#F9F9FF" />,
    buttonText: 'Voltar para a Home',
    url: '/',
  },
  requires_payment_method: {
    text: 'Seu pagamento não foi realizado, por favor tente novamente.',
    iconColor: '#BA1A1A',
    Icon: <CircleX color="#F9F9FF" />,
    buttonText: 'Tentar novamente',
    url: '/carrinho',
  },
  default: {
    text: 'Algo deu errado, por favor tente novamente.',
    iconColor: '#BA1A1A',
    Icon: <Ban color="#F9F9FF" />,
    buttonText: 'Tentar novamente',
    url: '/carrinho',
  },
};

export const CheckoutCompleted = () => {
  const stripe = useStripe();

  const [status, setStatus] = useState('default');
  const [intentId, setIntentId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-10 py-30">
        <div className="p-8 rounded-xl shadow max-w-md mx-auto">
          <div
            className="rounded-full p-2 w-fit mx-auto"
            style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}
          >
            {STATUS_CONTENT_MAP[status].Icon}
          </div>
          <h2 className="py-6 text-xl font-bold text-center">
            {STATUS_CONTENT_MAP[status].text}
          </h2>
          {intentId && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-t border-neutral px-1 pt-2">
                <p className="font-medium">id</p>
                <p className="font-light text-neutral">{intentId}</p>
              </div>

              <div className="flex items-center justify-between border-b border-neutral px-1 pb-2">
                <p className="font-medium">status</p>
                <p className="font-light text-neutral">{status}</p>
              </div>
            </div>
          )}
          {intentId && (
            <div className="flex items-center justify-center py-8">
              <a
                className="text-tertiary flex items-center gap-1 underline"
                href={`https://dashboard.stripe.com/payments/${intentId}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Ver detalhes <SquareArrowOutUpRight color="#6366F1" size={12} />
              </a>
            </div>
          )}

          <Button onClick={() => navigate(STATUS_CONTENT_MAP[status].url)}>
            {STATUS_CONTENT_MAP[status].buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
