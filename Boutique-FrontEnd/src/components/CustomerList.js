import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Customer List</h2>
        <Link to="/customers/new" className="btn btn-primary">
          <i className="bi bi-person-plus"></i> Add Customer
        </Link>
      </div>

      {customers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.email}</td>
                  <td>{c.firstName} {c.lastName}</td>
                  <td>{c.phone || "N/A"}</td>
                  <td className="text-center">
                    <Link
                      to={`/customers/view/${c.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      <i className="bi bi-eye"></i> View
                    </Link>
                    <Link
                      to={`/customers/edit/${c.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button
                      onClick={() => deleteCustomer(c.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No customers found.</div>
      )}
    </div>
  );
}

export default CustomerList;
