import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import HomePage from './components/HomePage/HomePage';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserDetails from './components/UserDetails/UserDetails';
import { CartProvider } from './context/CartContext';  // Import the CartProvider

function App() {
  return (
    <CartProvider>  {/* Wrap your routes with CartProvider */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
