import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    shippingAddress: "",
  });

  useEffect(() => {
    fetch("https://laxmi-boutique-back-end.onrender.com/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      customer: { id: form.customerId },
      shippingAddress: form.shippingAddress,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      orderItems: items.map((i) => ({
        product: { id: i.id },
        quantity: i.quantity,
        price: i.price,
      })),
    };

    await fetch("https://laxmi-boutique-back-end.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("✅ Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div>
            <label>Select Customer</label>
            <select
              value={form.customerId}
              onChange={(e) =>
                setForm({ ...form, customerId: e.target.value })
              }
              required
            >
              <option value="">Choose a customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} ({c.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Shipping Address</label>
            <textarea
              rows={3}
              value={form.shippingAddress}
              onChange={(e) =>
                setForm({ ...form, shippingAddress: e.target.value })
              }
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="checkout-total-submit">
            <h5 className="checkout-total">
              Total: ₹
              {items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
            </h5>
            <button type="submit" className="checkout-submit-btn">
              🛍️ Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
