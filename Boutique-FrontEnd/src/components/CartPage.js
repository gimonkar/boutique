import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const getTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {items.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty. <Link to="/products">Browse Products</Link>
        </div>
      ) : (
        <div className="card shadow-lg">
          <div className="card-body">
            <table className="table table-hover align-middle">
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
                <tr>
                  <td colSpan="3" className="text-end fw-bold">
                    Total:
                  </td>
                  <td colSpan="2" className="fw-bold">
                    ₹{getTotal()}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/checkout" className="btn btn-success">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
