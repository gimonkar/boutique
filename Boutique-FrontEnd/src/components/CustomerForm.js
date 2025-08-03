import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [customer, setCustomer] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/api/customers/${id}`)
        .then(res => res.json())
        .then(data => setCustomer(data))
        .catch(err => console.error('Error loading customer:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const method = isEdit ? 'PUT' : 'POST';
  const url = isEdit
    ? `http://localhost:8080/api/customers/${id}`
    : `http://localhost:8080/api/customers`;

  // Only include necessary fields
  const sanitizedCustomer = {
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
  };

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sanitizedCustomer)
  })
    .then(res => {
      if (res.ok) {
        alert(isEdit ? 'Customer updated successfully!' : 'Customer created successfully!');
        navigate('/customers');
      } else {
        res.text().then(msg => alert("Error: " + msg));
      }
    })
    .catch(err => alert("Error: " + err.message));
};


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="mb-4">{isEdit ? "✏️ Edit Customer" : "➕ Add New Customer"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={customer.firstName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={customer.lastName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary px-4">
              {isEdit ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
