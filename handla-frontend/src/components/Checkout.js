import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, placeOrder } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    console.log(localStorage.getItem('userId'));
    try {
      const orderPayload = {  
        orderItems: cartItems.map(item => ({
          product_Id: item.id,
          quantity: item.quantity,
          price: item.price
      })),      
          user_Id:parseInt(localStorage.getItem('userId')),
          total_Price:total.toFixed(2)
        
      
        
      };
      console.log(orderPayload,localStorage.getItem('userId'),localStorage);
  

      await placeOrder(orderPayload);
      navigate('/orders');
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  const total = cartItems ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="order-summary">
        {cartItems && cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <p>{item.name} (x{item.quantity})</p>
            <p>₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="order-total">
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </div>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
