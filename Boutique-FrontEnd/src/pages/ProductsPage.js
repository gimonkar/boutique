
import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Management</h2>
      <ProductForm onSuccess={fetchProducts} />
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default ProductsPage;
