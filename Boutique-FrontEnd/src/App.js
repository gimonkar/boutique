import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";


import "../src/App.css";

import ProductList from "./components/ProductList";
import CustomersPage from "./pages/CustomersPage";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetails";

import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerSearch from "./components/CustomerSearch";
import CustomerDetails from "./components/CustomerDetails";

import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";
import OrderDetail from "./components/OrderDetail";

import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

import AdminLogin from "./components/AdminLogin";

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';



import { AdminProvider } from './components/AdminContext';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/pages/customersPage" element={<CustomersPage />} />
            <Route path="/pages/orders" element={<OrdersPage />} />
            <Route path="/pages/products" element={<ProductsPage />} />
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Products */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Customers */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />
            <Route path="/customers/search" element={<CustomerSearch />} />
            <Route path="/customers/view/:id" element={<CustomerDetails />} />

            {/* Orders */}
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/orders/edit/:id" element={<OrderForm />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Admin Login (Old Logic) */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* New Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Fallback */}
            <Route path="*" element={<h3>Page Not Found</h3>} />
            <Route path="/cart" element={<CartPage />} />

            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetail />} />


          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
