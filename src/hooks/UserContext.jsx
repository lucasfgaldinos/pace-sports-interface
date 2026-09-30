import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const putUserData = (userData) => {
    setUserInfo(userData);

    localStorage.setItem('paceSports:userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo({});
    localStorage.removeItem('paceSports:userData');
  };

  useEffect(() => {
    const userInfoLocalStorage = localStorage.getItem('paceSports:userData');

    if (userInfoLocalStorage) {
      setUserInfo(JSON.parse(userInfoLocalStorage));
    }
  });

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be a valid context');
  }

  return context;
};
