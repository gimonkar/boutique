// src/index.js or src/main.js (depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Global styles

import { AdminProvider } from './components/AdminContext';
import { CartProvider } from './components/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AdminProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AdminProvider>
  </React.StrictMode>
);
