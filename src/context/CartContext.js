import React, { createContext, useState, useContext, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap your app
export const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart or increase quantity if already exists
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { 
                ...i, 
                quantity: i.quantity + 1, 
                price: item.price * (i.quantity + 1) 
              }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1, price: item.price }];
    });
  };

  // Remove a specific item
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear from localStorage as well
  };

  // Increase quantity of item and update price based on quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantity: item.quantity + 1, 
              price: item.price + item.price / item.quantity
            }
          : item
      )
    );
  };

  // Decrease quantity of item (not below 1) and update price based on quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { 
              ...item, 
              quantity: item.quantity - 1, 
              price: item.price - item.price / item.quantity
            }
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
