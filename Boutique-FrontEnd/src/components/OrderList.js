import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://laxmi-boutique-back-end.onrender.com/api/orders")
      .then(response => {
        console.log("API response:", response.data);
        const data = response.data;
        setOrders(Array.isArray(data) ? data : data.content || data.orders || []);
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      {Array.isArray(orders) && orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td data-label="Order ID">{order.id}</td>
                <td data-label="Customer">{order.customer?.firstName} {order.customer?.lastName}</td>
                <td data-label="Status">{order.status}</td>
                <td data-label="Total">₹{order.total}</td>
                <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td data-label="Details">
                  <Link to={`/orders/${order.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
