
const BASE_URL = "http://localhost:8080/api/orders";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

export const getAllOrders = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

export const createOrder = async (order) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return handleResponse(res);
};

export const updateOrder = async (id, order) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return handleResponse(res);
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}/status?status=${status}`, {
    method: "PATCH",
  });
  return handleResponse(res);
};

export const getOrdersByCustomer = async (customerId) => {
  const res = await fetch(`${BASE_URL}/customer/${customerId}`);
  return handleResponse(res);
};

export const getOrdersByCustomerEmail = async (email) => {
  const res = await fetch(`${BASE_URL}/customer/email/${email}`);
  return handleResponse(res);
};

export const getOrdersByStatus = async (status) => {
  const res = await fetch(`${BASE_URL}/status/${status}`);
  return handleResponse(res);
};

export const getOrdersByDateRange = async (startDate, endDate) => {
  const res = await fetch(`${BASE_URL}/date-range?startDate=${startDate}&endDate=${endDate}`);
  return handleResponse(res);
};

export const getOrderItemsByOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/${orderId}/items`);
  return handleResponse(res);
};

export const addItemToOrder = async (orderId, productId, quantity) => {
  const res = await fetch(`${BASE_URL}/${orderId}/items?productId=${productId}&quantity=${quantity}`, {
    method: "POST",
  });
  return handleResponse(res);
};

export const removeItemFromOrder = async (orderId, itemId) => {
  const res = await fetch(`${BASE_URL}/${orderId}/items/${itemId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};

export const getTotalRevenue = async () => {
  const res = await fetch(`${BASE_URL}/revenue/total`);
  return handleResponse(res);
};

export const getBestSellingProducts = async () => {
  const res = await fetch(`${BASE_URL}/analytics/best-selling`);
  return handleResponse(res);
};

export const getRecentOrders = async () => {
  const res = await fetch(`${BASE_URL}/recent`);
  return handleResponse(res);
};

export const getOrderCountByStatus = async (status) => {
  const res = await fetch(`${BASE_URL}/count/status/${status}`);
  return handleResponse(res);
};
