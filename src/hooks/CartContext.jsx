import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCard = (product) => {
    const i = cartProducts.findIndex((p) => p.id === product.id);

    let newProductsInCart;

    if (i >= 0) {
      newProductsInCart = [...cartProducts];

      newProductsInCart[i].quantity++;

      setCartProducts(newProductsInCart);
      updateLocalStorage(newProductsInCart);
    } else {
      product.quantity = 1;

      setCartProducts((prev) => [...prev, product]);
      updateLocalStorage([...cartProducts, product]);
    }
  };

  const removeProductFromCart = (productId) => {
    const newCart = cartProducts.filter((p) => p.id !== productId);
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const increaseProduct = (productId) => {
    const newCart = cartProducts.map((p) => {
      return p.id === productId ? { ...p, quantity: p.quantity + 1 } : p;
    });

    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const decreaseProduct = (productId) => {
    const i = cartProducts.findIndex((p) => p.id === productId);

    if (i >= 0) {
      if (cartProducts[i].quantity > 1) {
        const newProductsInCart = cartProducts.map((p) => {
          return p.id === productId ? { ...p, quantity: p.quantity - 1 } : p;
        });

        setCartProducts(newProductsInCart);
        updateLocalStorage(newProductsInCart);
      } else {
        removeProductFromCart(productId);
      }
    }
  };

  const updateLocalStorage = (products) => {
    localStorage.setItem('paceSports:cartData', JSON.stringify(products));
  };

  const clearCart = () => {
    setCartProducts([]);
    updateLocalStorage([]);
  };

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem('paceSports:cartData'),
    );

    if (cartFromLocalStorage) {
      setCartProducts(cartFromLocalStorage);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCard,
        removeProductFromCart,
        increaseProduct,
        decreaseProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be a valid context');
  }

  return context;
};
