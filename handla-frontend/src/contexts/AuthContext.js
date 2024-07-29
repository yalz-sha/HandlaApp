import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  const login = async (username, email, password) => {
    try {
      const response = await axios.post('https://localhost:44342/api/auth/login', { username, email, password });
      const { token, userId } = response.data;
      setToken(token);
      setUserId(userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('https://localhost:44342/api/auth/register', { username, email, password });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
