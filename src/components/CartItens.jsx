import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../hooks/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const CartItens = () => {
  const {
    cartProducts,
    removeProductFromCart,
    increaseProduct,
    decreaseProduct,
  } = useCart();

  return (
    <div className="flex flex-col gap-4">
      {cartProducts?.length > 0 ? (
        cartProducts.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl border border-light-border shadow flex items-center gap-3"
          >
            <img
              className="w-25 h-25 rounded-lg aspect-square"
              src={p.url}
              alt={p.name}
            />

            <div
              style={{ height: 'stretch' }}
              className="flex flex-col flex-1 justify-between"
            >
              <p className="font-bold text-lg">{p.name}</p>

              <div className="flex items-center">
                <button
                  onClick={() => decreaseProduct(p.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-tl-lg rounded-bl-lg cursor-pointer border border-light-border shadow-sm hover:bg-light-border/20 active:scale-95 transition-all"
                  type="button"
                >
                  <Minus color="#111827" size={14} />
                </button>
                <div className="w-8 h-8 border-y border-light-border shadow-sm flex items-center justify-center">
                  {p.quantity}
                </div>
                <button
                  onClick={() => increaseProduct(p.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-tr-lg rounded-br-lg cursor-pointer border border-light-border shadow-sm hover:bg-light-border/20 active:scale-95 transition-all"
                  type="button"
                >
                  <Plus color="#111827" size={14} />
                </button>
              </div>
            </div>

            <div
              className="flex flex-col items-end justify-between"
              style={{ height: 'stretch' }}
            >
              <button
                onClick={() => removeProductFromCart(p.id)}
                type="button"
                className="cursor-pointer p-1 rounded-lg hover:bg-pace-red/10 active:scale-95 transition-all"
              >
                <X color="#BA1A1A" size={18} />
              </button>

              <div className="flex flex-col gap-1 items-end">
                <p className="text-xs font-medium">
                  <span className="font-light">Unidade: </span>
                  {formatCurrency(p.price)}
                </p>
                <p className="font-bold">
                  <span className="font-light">Total: </span>
                  {formatCurrency(p.price * p.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full">Seu carrinho está vazio</div>
      )}
    </div>
  );
};
