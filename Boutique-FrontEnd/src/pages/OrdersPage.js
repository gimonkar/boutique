
import React, { useEffect, useState } from "react";
import { getAllOrders, deleteOrder } from "../api/orderApi";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";

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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Management</h2>
      <OrderForm onSuccess={fetchOrders} />
      <OrderList orders={orders} onDelete={handleDelete} />
    </div>
  );
};

export default OrdersPage;
