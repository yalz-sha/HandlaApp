import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
   //Check if product in  cart
    const existingItem = cartItems.findIndex(item => item.id === product.id);

    //If product already in the cart increase the quantity
    if (existingItem !== -1) {      
      const tempCartItems = [...cartItems];
      tempCartItems[existingItem].quantity++;
      setCartItems(tempCartItems);
      
    }
    
    // If product not in the cart, add it with quantity 1
     else {      
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== productId));
  };

  const placeOrder = async (orderPayload) => {
    const response = await fetch('https://localhost:44342/api/orders/placeorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderPayload)
    });
    if (response.ok) {
      setCartItems([]);
      return await response.json();
    } else {
      throw new Error('Order placement failed');
    }
  };
  const clearCart = ()=>{
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,placeOrder,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
