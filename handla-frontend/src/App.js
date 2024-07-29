import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/products/ProductList';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ShoppingCart from './components/cart/ShoppingCart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const { clearCart } = useCart();
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    
      <div className="App">
        {!hideNavbar && <nav className="navbar">
          <Link to="/" className="navbar-brand">Handla!</Link>
          <div className="navbar-nav">
            <Link to={isAuthenticated?"/cart":"/login"} className="nav-link">Cart</Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="nav-link">Orders</Link>
                <Link onClick={()=>{logout();clearCart();}} to="/" className="nav-link">Logout</Link>
              
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </nav>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
   
  );
}

const AppWithContext = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router> <App /></Router>       
      </CartProvider>
    </AuthProvider>
  );
};

export default AppWithContext;
