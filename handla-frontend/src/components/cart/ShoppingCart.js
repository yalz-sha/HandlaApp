import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../../contexts/CartContext';
import '../../styles/ShoppingCart.css';

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart(); 
  const navigate = useNavigate();

  // Ensure cartItems is not undefined before using reduce
  const total = cartItems ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems && cartItems.map(item => (
        <CartItem item={item} handleRemoveFromCart={removeFromCart} />
      ))}
      <div className="cart-total">
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
