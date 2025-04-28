import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import HomePage from './components/HomePage/HomePage';
// import ProductCards from './components/ProductCards/ProductCards';
import Cart from './components/Cart/Cart';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserDetails from './components/UserDetails/UserDetails';
// import ProductDetails from './components/ProductDetails/ProductDetails'; // Import ProductDetails 
import { CartProvider } from './context/CartContext';  // Import the CartProvider

function App() {
  return (
    <CartProvider>  {/* Wrap your routes with CartProvider */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
