import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap your app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  

  // Remove a specific item
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Increase quantity of item
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  // Decrease quantity of item (not below 1)
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
