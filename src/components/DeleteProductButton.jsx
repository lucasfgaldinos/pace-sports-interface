import { Trash } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export function DeleteProductButton({ onConfirm, productName }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="p-2 rounded-full hover:bg-pace-red/20 cursor-pointer active:scale-95 transition-all"
      >
        <Trash color="#E11D48" size={18} />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80">
            <div className="bg-pace-white p-6 rounded-3xl">
              <p>Tem certeza que quer excluir este produto?</p>
              <span className="mb-6 text-xs inline-block">{productName}</span>

              <div className="flex items-center justify-between">
                <button
                  className="bg-neutral/70 rounded-2xl py-2 text-pace-white px-3 cursor-pointer hover:bg-neutral active:scale-95 transition-all"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>

                <button
                  className="bg-pace-red/70 rounded-2xl py-2 text-pace-white px-3 cursor-pointer hover:bg-pace-red active:scale-95 transition-all"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onConfirm();
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
