import { LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components';
import { useCart } from '../hooks/CartContext';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

export const CartResume = () => {
  const { cartProducts, clearCart } = useCart();
  const [deliveryTax, _setDeliveryTax] = useState(0);
  const [discount, _setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState({});

  const submitOrder = async () => {
    setIsLoading(true);

    try {
      const { status } = await api.post(
        '/orders',
        { products },
        { validateStatus: () => true },
      );

      if (status === 201 || status === 200) {
        clearCart();
        toast.success('Seu pedido foi realizado com sucesso');
      } else {
        throw new Error();
      }
    } catch (_err) {
      toast.error('Algo deu errado ao finalizar sua compra');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const totalProductsValue = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);

    setTotalPrice(totalProductsValue);

    const newProducts = cartProducts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
      };
    });

    setProducts(newProducts);
  }, [cartProducts]);

  return (
    <div className="p-6 rounded-xl border border-light-border shadow">
      <p className="text-xl font-extrabold">Resumo do pedido</p>

      <div className="mb-6 flex flex-col gap-1.5">
        <hr className="text-light-border my-4" />

        <div className="flex items-center justify-between">
          <p className="text-neutral">Subtotal</p>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-neutral">Taxa de entrega</p>
          <span>{formatCurrency(deliveryTax)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-primary">Desconto</p>
          <span className="text-primary">{`-${formatCurrency(discount)}`}</span>
        </div>

        <hr className="text-light-border my-4" />

        <div className="flex items-center justify-between">
          <p className="font-bold">Total</p>
          <span className="text-lg font-bold">
            {formatCurrency(totalPrice + deliveryTax - discount)}
          </span>
        </div>
      </div>

      <Button isLoading={isLoading} onClick={submitOrder}>
        <LockKeyhole color="#F9F9FF" size={18} /> Finalizar compra
      </Button>
    </div>
  );
};
