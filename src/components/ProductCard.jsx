import { ShoppingCartPlus } from 'lucide-react';
import { useCart } from '../hooks/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from './Button';

export const ProductCard = ({ product, ...props }) => {
  const { addProductToCard } = useCart();

  return (
    <div {...props} className="shadow-sm w-full rounded-xl">
      <div
        style={{ backgroundImage: `url('${product.url}')` }}
        className="h-55 w-full min-w-55 bg-cover bg-no-repeat bg-center rounded-t-xl"
      />

      <div className="p-4">
        <p
          title={product.name}
          className="text-nowrap overflow-hidden text-ellipsis font-medium"
        >
          {product.name}
        </p>
        <div className="flex items-center justify-between mt-6">
          <p className="font-extrabold text-lg">
            {formatCurrency(product.price)}
          </p>
          <Button
            onClick={() => addProductToCard(product)}
            size="icon"
            title="Adicionar ao carrinho"
          >
            <ShoppingCartPlus color="#F9F9FF" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};
