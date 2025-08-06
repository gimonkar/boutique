import React, { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../api/customerApi";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";
import "./CustomersPage.css"; // ← External CSS

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

  return (
    <div className="customers-container">
      {loading ? (
        <p className="status-msg">Loading customers...</p>
      ) : error ? (
        <p className="status-msg error">{error}</p>
      ) : (
        <>
          <h2 className="heading">👥 Customer Management</h2>
          <CustomerForm onSuccess={fetchCustomers} />
          <CustomerList customers={customers} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default CustomersPage;
