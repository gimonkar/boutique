import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="loading-text">Loading products...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="products-page">
      <h2 className="products-title">Product Management</h2>
      <ProductForm onSuccess={fetchProducts} />
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default ProductsPage;
