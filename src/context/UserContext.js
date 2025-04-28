// context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthorized', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.setItem('isAuthorized', 'false');
    }
  }, [user]);

  // Load user from localStorage on first app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthorized');

    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthorized(true);
    }
  }, []);

  // Function to register a new user
  const registerUser = async (registrationData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const userData = await response.json();
      setUser(userData); // Save user
      setIsAuthorized(true); // Set authorized
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Function to load already logged-in user data
  const loadUserData = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // If session cookie
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
      setIsAuthorized(true);
    } catch (error) {
      console.error('Load user error:', error);
      setIsAuthorized(false);
      setUser(null);
    }
  };

  // Function to log out
  const logoutUser = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem('user');
    localStorage.setItem('isAuthorized', 'false');
  };

  return (
    <UserContext.Provider
      value={{
        isAuthorized,
        user,
        setIsAuthorized,
        setUser,
        registerUser,
        loadUserData,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);
