import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminProvider } from './components/AdminContext';
import { CartProvider } from "./components/CartContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminProvider>
      <CartProvider>
    <App />
  </CartProvider>
  </AdminProvider>
);