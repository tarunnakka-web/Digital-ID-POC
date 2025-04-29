import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Cart from './components/Cart/Cart';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserDetails from './components/UserDetails/UserDetails';
import Verification from './components/Verification/Verification';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// Wrapper to conditionally render Header based on current path
const HeaderWrapper = () => {
  const location = useLocation();
  // Hide header on login page
  if (location.pathname === '/login') return null;
  return <Header />;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <HeaderWrapper />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Verification/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
