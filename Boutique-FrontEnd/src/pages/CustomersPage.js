
import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../api/customerApi";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Management</h2>
      <CustomerForm onSuccess={fetchCustomers} />
      <CustomerList customers={customers} onDelete={handleDelete} />
    </div>
  );
};

export default CustomersPage;
