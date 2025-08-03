import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    shippingAddress: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/customers")
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

    await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("✅ Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg rounded-4 p-4">
            <h2 className="mb-4 text-center text-primary fw-bold">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Customer</label>
                <select
                  className="form-select"
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

              <div className="mb-3">
                <label className="form-label fw-semibold">Shipping Address</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.shippingAddress}
                  onChange={(e) =>
                    setForm({ ...form, shippingAddress: e.target.value })
                  }
                  placeholder="Enter full address"
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h5 className="fw-bold text-success">
                  Total: ₹
                  {items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                  )}
                </h5>
                <button type="submit" className="btn btn-lg btn-success">
                  🛍️ Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
