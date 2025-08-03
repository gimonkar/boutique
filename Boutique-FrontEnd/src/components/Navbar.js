import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn, logout, currentUser } = useContext(AdminContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🛍️ Laxmi-Boutique</Link>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li className={isActive("/products") ? "active" : ""}>
          <Link to="/products">Products</Link>
        </li>

        {isAdmin && (
          <>
            <li className={isActive("/products/new") ? "active" : ""}>
              <Link to="/products/new">Add Product</Link>
            </li>
            <li className={isActive("/customers") ? "active" : ""}>
              <Link to="/customers">Customers</Link>
            </li>
            <li className={isActive("/orders") ? "active" : ""}>
              <Link to="/orders">Orders</Link>
            </li>
            <li className={isActive("/cart") ? "active" : ""}>
              <Link to="/cart">Cart</Link>
            </li>
            <li className={isActive("/checkout") ? "active" : ""}>
              <Link to="/checkout">Checkout</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;