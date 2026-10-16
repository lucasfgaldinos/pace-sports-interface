import { ChevronRight } from 'lucide-react';
import { CartItens } from '../components/CartItens';
import { CartResume } from '../components/CartResume';

export const Cart = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-5xl mx-auto px-10 pt-30 ">
        <span className="text-neutral flex items-center gap-2 text-sm">
          Home
          <ChevronRight className="ml-3" color="#6B7280" size={14} />
          <b className="text-dark">Carrinho</b>
        </span>
        <h1 className="text-dark font-extrabold text-5xl mt-6">Seu carrinho</h1>
        <hr className="text-neutral/20 my-7" />
      </div>

      <div className="grid grid-cols-6 gap-6 w-full max-w-5xl mx-auto px-10 pb-20 overflow-hidden">
        <div className="col-span-4">
          <CartItens />
        </div>

        <div className="col-span-2">
          <CartResume />
        </div>
      </div>
    </div>
  );
};
