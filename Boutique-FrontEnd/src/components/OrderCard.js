import React from "react";
import "./OrderCard.css"; // Import external CSS

const OrderCard = ({ order, onClick }) => {
  return (
    <div
      className="card mb-3 shadow-sm border-0 order-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">🧾 Order #{order.id}</h5>
          <span className={`badge bg-${getStatusColor(order.status)} text-uppercase`}>
            {order.status}
          </span>
        </div>
        <p><strong>Total:</strong> ₹{order.total}</p>
        <p className="text-muted"><small>📅 Placed on: {formatDate(order.createdAt)}</small></p>
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
    case "completed":
    case "delivered":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

export default OrderCard;
