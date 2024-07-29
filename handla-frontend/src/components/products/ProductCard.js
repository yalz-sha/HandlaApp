import React from 'react';
import '../../styles/ProductCard.css';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const {addToCart} = useCart();

  const handleAddToCart=(product)=>{
    addToCart(product);
  }
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p> ₹{product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
