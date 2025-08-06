import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../api/orderApi";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading orders...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">Order Management</h2>
      <OrderForm onSuccess={fetchOrders} />
      <OrderList orders={orders} onDelete={handleDelete} />
    </div>
  );
};

export default OrdersPage;
