import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

export const AppProvider = ({ children }) => {
  return (
    <CartProvider>
      <UserProvider>{children}</UserProvider>
    </CartProvider>
  );
};
