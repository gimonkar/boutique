import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://laxmi-boutique-back-end.onrender.com/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));
  }, []);

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(`https://laxmi-boutique-back-end.onrender.com/api/customers/${id}`, {
        method: "DELETE",
      })
        .then(() => setCustomers(customers.filter(c => c.id !== id)))
        .catch(() => alert("Failed to delete customer."));
    }
  };

  return (
    <div className="customer-container">
      <div className="customer-header">
        <h2>Customer List</h2>
        <Link to="/customers/new" className="add-btn">
          <i className="bi bi-person-plus"></i> Add Customer
        </Link>
      </div>

      {customers.length > 0 ? (
        <div className="customer-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.email}</td>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.phone || "N/A"}</td>
                  <td>
                    <Link
                      to={`/customers/view/${c.id}`}
                      className="btn btn-info"
                    >
                      View
                    </Link>
                    <Link
                      to={`/customers/edit/${c.id}`}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCustomer(c.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info mt-3">No customers found.</div>
      )}
    </div>
  );
}

export default CustomerList;
