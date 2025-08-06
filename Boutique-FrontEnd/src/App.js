import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { AdminProvider } from "./components/AdminContext";

// Global CSS
import "./App.css";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";

// Product Components
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetails";

// Customer Components
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerSearch from "./components/CustomerSearch";
import CustomerDetails from "./components/CustomerDetails";

// Order Components
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";
import OrderDetail from "./components/OrderDetail";

// Cart & Checkout
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

// Admin Login (Old system)
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Home & Auth */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Product Routes */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/pages/products" element={<ProductsPage />} />

            {/* Customer Routes */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />
            <Route path="/customers/search" element={<CustomerSearch />} />
            <Route path="/customers/view/:id" element={<CustomerDetails />} />
            <Route path="/pages/customersPage" element={<CustomersPage />} />

            {/* Order Routes */}
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/orders/edit/:id" element={<OrderForm />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/pages/orders" element={<OrdersPage />} />

            {/* Cart & Checkout */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<h3>Page Not Found</h3>} />
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
