
const BASE_URL = "http://localhost:8080/api/products";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

export const getAllProducts = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleResponse(res);
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
};

export const getProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  return handleResponse(res);
};

export const searchProducts = async (query) => {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return handleResponse(res);
};

export const getInStockProducts = async () => {
  const res = await fetch(`${BASE_URL}/in-stock`);
  return handleResponse(res);
};

export const getSaleProducts = async () => {
  const res = await fetch(`${BASE_URL}/sale`);
  return handleResponse(res);
};

export const getFeaturedProducts = async () => {
  const res = await fetch(`${BASE_URL}/featured`);
  return handleResponse(res);
};

export const getProductsByPriceRange = async (minPrice, maxPrice, category = "") => {
  let url = `${BASE_URL}/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`;
  if (category) {
    url += `&category=${category}`;
  }
  const res = await fetch(url);
  return handleResponse(res);
};

export const updateStockStatus = async (id, inStock) => {
  const res = await fetch(`${BASE_URL}/${id}/stock?inStock=${inStock}`, {
    method: "PATCH",
  });
  return handleResponse(res);
};

export const updateSaleStatus = async (id, onSale, originalPrice = null) => {
  let url = `${BASE_URL}/${id}/sale?onSale=${onSale}`;
  if (originalPrice !== null) {
    url += `&originalPrice=${originalPrice}`;
  }
  const res = await fetch(url, { method: "PATCH" });
  return handleResponse(res);
};

export const getProductCountByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/count/category/${category}`);
  return handleResponse(res);
};
