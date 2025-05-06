import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Cart from './components/Cart/Cart';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserDetails from './components/UserDetails/UserDetails';
import SelectID from './components/SelectID/SelectID.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import ScanFingerprintForLogin from './components/ScanFingerprintForLogin/ScanFingerprintForLogin.js';
import AddFingerprintForRegistration from './components/AddFingerprintForRegistration/AddFingerprintForRegistration.js';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import theme from './context/theme'; 
import { ThemeProvider } from '@mui/material/styles';
import ProductDetails from './components/ProductDetails/ProductDetails.js';


// Wrapper to conditionally render Header on specific routes
const HeaderWrapper = () => {
  const location = useLocation();
  const hiddenHeaderRoutes = [
    '/login',
    '/register',
    '/selectID',
    '/scan-finger-print-forLogin',
    '/add-finger-print-forRegistration'
  ];
  return hiddenHeaderRoutes.includes(location.pathname) ? null : <Header />;

};

function App() {
  return (
    <ThemeProvider theme={theme}> 
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <HeaderWrapper />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path="/add-finger-print-forRegistration" element={<AddFingerprintForRegistration />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/selectID" element={<SelectID />} />
            <Route path="/scan-finger-print-forLogin" element={<ScanFingerprintForLogin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="*" element={<div style={{ padding: 140 , fontSize:"22px" , textAlign:"center", fontWeight:"bold", color:"blue" }}>404 - Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
