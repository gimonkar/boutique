import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://laxmi-boutique-back-end.onrender.com/api/orders")
      .then(response => {
        console.log("API response:", response.data);
        const data = response.data;
        // Adjust this based on your actual API structure:
        setOrders(Array.isArray(data) ? data : data.content || data.orders || []);
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      {Array.isArray(orders) && orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="table">
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
                <td>{order.id}</td>
                <td>{order.customer?.firstName} {order.customer?.lastName}</td>
                <td>{order.status}</td>
                <td>₹{order.total}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {/* <a href={`http://localhost:8080/api/orders/${order.id}`}>View</a> */}
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
