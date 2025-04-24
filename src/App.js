import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'; 
import HomePage from './components/HomePage/HomePage';
import Products from './components/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
