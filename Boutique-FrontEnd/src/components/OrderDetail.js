import React, { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus, deleteOrder } from "../api/orderApi";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetail.css"; // Import external CSS

const OrderDetail = () => {
  const { id } = useParams();
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
    <div className="container mt-4 order-detail">
      <div className="order-detail-card">
        <div className="order-detail-header">
          <h3>Order #{order.id}</h3>
          <span className={`badge bg-${getStatusColor(order.status)} order-badge`}>
            {order.status}
          </span>
        </div>

        <p><strong>Total:</strong> ₹{order.total}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>

        <div className="order-items">
          <h5>🧾 Order Items</h5>
          <ul>
            {order.orderItems.map(item => (
              <li key={item.id}>
                <div>
                  <strong>{item.product.name}</strong><br />
                  <p>₹{item.product.price} × {item.quantity}</p>
                </div>
                <span>₹{item.subtotal}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="delete-button" onClick={handleDelete}>
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
  switch (status?.toLowerCase()) {
    case "delivered": return "success";
    case "pending": return "warning";
    case "cancelled": return "danger";
    case "processing": return "info";
    case "shipped": return "primary";
    default: return "secondary";
  }
};

export default OrderDetail;
