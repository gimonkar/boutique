import React, { useState } from "react";
import { createOrder, updateOrder, getOrderById } from "../api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

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
      <h3>{isEdit ? "Edit" : "Create"} Order</h3>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Customer ID</label>
          <input
            type="text"
            className="form-control"
            name="customerId"
            value={order.customer.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Total (₹)</label>
          <input
            type="number"
            className="form-control"
            name="total"
            value={order.total}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label>Shipping Address</label>
          <textarea
            className="form-control"
            name="shippingAddress"
            value={order.shippingAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            name="status"
            value={order.status}
            onChange={handleChange}
          >
            {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          {isEdit ? "Update Order" : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
