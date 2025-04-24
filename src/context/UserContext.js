// context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <UserContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
