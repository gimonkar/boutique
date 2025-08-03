import React, { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus, deleteOrder } from "../api/orderApi";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  // const [order, setOrder] = useState("http://localhost:8080/api/orders");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderById(id).then(setOrder);
  }, [id]);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    updateOrderStatus(id, status).then(setOrder);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id).then(() => navigate("/orders"));
    }
  };

  if (!order) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-primary">Order #{order.id}</h3>
          <span className={`badge bg-${getStatusColor(order.status)} fs-6`}>
            {order.status}
          </span>
        </div>

        {/* <div className="mb-3">
          <label className="form-label"><strong>Update Status:</strong></label>
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="form-select w-auto d-inline-block ms-2"
          >
            {["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div> */}

        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>

        <h5 className="mt-4">🧾 Order Items</h5>
        <ul className="list-group mb-3">
          {order.orderItems.map(item => (
            <li className="list-group-item d-flex justify-content-between align-items-center " key={item.id}>
              <div>
                <strong>{item.product.name}</strong><br />
                <p>₹{item.product.price} × {item.quantity}</p>
              </div>
              <span className="badge bg-secondary rounded-pill">₹{item.subtotal}</span>
            </li>
          ))}
        </ul>

        <button className="btn btn-outline-danger w-100" onClick={handleDelete}>
          🗑️ Delete Order
        </button>
      </div>
    </div>
  );
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered": return "success";
    case "pending": return "warning";
    case "cancelled": return "danger";
    case "processing": return "info";
    case "shipped": return "primary";
    default: return "secondary";
  }
};

export default OrderDetail;
