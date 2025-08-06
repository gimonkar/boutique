import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CustomerForm.css';

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
      fetch(`https://laxmi-boutique-back-end.onrender.com/api/customers/${id}`)
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
      ? `https://laxmi-boutique-back-end.onrender.com/api/customers/${id}`
      : `https://laxmi-boutique-back-end.onrender.com/api/customers`;

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
    <div className="customer-form-container">
      <div className="customer-form-card">
        <h3 className="customer-form-title">
          {isEdit ? "✏️ Edit Customer" : "➕ Add New Customer"}
        </h3>

        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-row mb-3">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={customer.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={customer.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="form-row mb-3">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="customer-form-btn">
              {isEdit ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
