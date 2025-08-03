
const BASE_URL = "https://laxmi-boutique-back-end.onrender.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

export const getAllCustomers = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const getCustomerById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

export const getCustomerByEmail = async (email) => {
  const res = await fetch(`${BASE_URL}/email/${email}`);
  return handleResponse(res);
};

export const createCustomer = async (customer) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return handleResponse(res);
};

export const updateCustomer = async (id, customer) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return handleResponse(res);
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
};

export const searchCustomers = async (query) => {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
};

export const checkEmailExists = async (email) => {
  const res = await fetch(`${BASE_URL}/exists/email/${email}`);
  return handleResponse(res);
};

export const getCustomersWithOrders = async () => {
  const res = await fetch(`${BASE_URL}/with-orders`);
  return handleResponse(res);
};

export const getCustomersByFirstName = async (firstName) => {
  const res = await fetch(`${BASE_URL}/first-name/${firstName}`);
  return handleResponse(res);
};

export const getCustomersByLastName = async (lastName) => {
  const res = await fetch(`${BASE_URL}/last-name/${lastName}`);
  return handleResponse(res);
};
