import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/CartItem.css';


const CartItem = ({ item, handleRemoveFromCart }) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <button onClick={() => handleRemoveFromCart(item.id)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default CartItem;
