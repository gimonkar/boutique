import React from "react";

const OrderCard = ({ order, onClick }) => {
  return (
    <div className="card mb-3 shadow-sm border-0 rounded-4 order-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0 text-primary">🧾 Order #{order.id}</h5>
          <span className={`badge bg-${getStatusColor(order.status)} text-uppercase`}>
            {order.status}
          </span>
        </div>
        <p className="mb-1"><strong>Total:</strong> ₹{order.total}</p>
        <p className="mb-0 text-muted"><small>📅 Placed on: {formatDate(order.createdAt)}</small></p>
      </div>
    </div>
  );
};

// Format date string to readable form
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Assign Bootstrap badge color based on order status
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
