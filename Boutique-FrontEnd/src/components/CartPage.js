// src/components/CartPage.js
import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const getTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-header">🛒 Your Cart</h2>

      {items.length === 0 ? (
        <div className="empty-cart-alert">
          Your cart is empty. <Link to="/products">Browse Products</Link>
        </div>
      ) : (
        <div className="cart-card">
          <table className="table table-hover cart-table align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th style={{ width: "150px" }}>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="form-control form-control-sm"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="cart-total-row">
                <td colSpan="3" className="text-end">
                  Total:
                </td>
                <td colSpan="2">₹{getTotal()}</td>
              </tr>
            </tfoot>
          </table>

          <div className="cart-buttons">
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/checkout" className="btn btn-success">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
