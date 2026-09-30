import { UserProvider } from './user-context';

export const AppProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
