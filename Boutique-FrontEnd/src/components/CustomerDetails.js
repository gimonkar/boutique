import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch(() => alert("⚠️ Error fetching customer details."));
  }, [id]);

  if (!customer) return <p className="text-center mt-4">Loading customer data...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 rounded-4">
        <h2 className="text-primary mb-4 text-center fw-bold">Customer Details</h2>
        <div className="row">
          <div className="col-md-6">
            <p><strong>📧 Email:</strong> {customer.email}</p>
            <p><strong>👤 Name:</strong> {customer.firstName} {customer.lastName}</p>
          </div>
          <div className="col-md-6">
            <p><strong>📞 Phone:</strong> {customer.phone || "N/A"}</p>
            <p><strong>🕒 Joined:</strong> {customer.createdAt?.replace("T", " ")}</p>
          </div>
        </div>

        <hr className="my-4" />

        <h4 className="text-success fw-semibold">Order History</h4>
        {customer.orders?.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Shipping Address</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>₹{order.total}</td>
                    <td>{order.status}</td>
                    <td>{order.shippingAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-2">No orders found for this customer.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;
