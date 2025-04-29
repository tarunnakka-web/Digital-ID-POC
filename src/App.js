import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Cart from './components/Cart/Cart';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserDetails from './components/UserDetails/UserDetails';
import Verification from './components/SelectID/SelectID.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import FingerprintPage from './components/Fingerprint/Fingerprint.js';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';


// Wrapper to conditionally render Header on specific routes
const HeaderWrapper = () => {
  const location = useLocation();
  const hiddenHeaderRoutes = ['/login', '/verification'];
  return hiddenHeaderRoutes.includes(location.pathname) ? null : <Header />;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <HeaderWrapper />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/finger-print" element={<FingerprintPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="*" element={<div style={{ padding: 20 }}>404 - Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
