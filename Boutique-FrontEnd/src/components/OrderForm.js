import React, { useState, useEffect } from "react";
import { createOrder, updateOrder, getOrderById } from "../api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderForm.css";

const OrderForm = () => {
  const { id } = useParams(); // order id for edit
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [order, setOrder] = useState({
    customer: { id: "" },
    total: "",
    shippingAddress: "",
    status: "PENDING",
  });

  useEffect(() => {
    if (isEdit) {
      getOrderById(id).then((data) => {
        setOrder({
          customer: { id: data.customer.id },
          total: data.total,
          shippingAddress: data.shippingAddress,
          status: data.status,
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customerId") {
      setOrder({ ...order, customer: { id: value } });
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateOrder(id, order);
      alert("Order updated!");
    } else {
      await createOrder(order);
      alert("Order created!");
    }
    navigate("/orders");
  };

  return (
    <div className="container mt-4">
      <div className="order-form-container">
        <h3>{isEdit ? "Edit" : "Create"} Order</h3>
        <form onSubmit={handleSubmit} className="order-form">
          <div>
            <label>Customer ID</label>
            <input
              type="text"
              name="customerId"
              value={order.customer.id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Total (₹)</label>
            <input
              type="number"
              name="total"
              value={order.total}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div>
            <label>Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={order.shippingAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Status</label>
            <select
              name="status"
              value={order.status}
              onChange={handleChange}
            >
              {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button type="submit">
            {isEdit ? "Update Order" : "Create Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
