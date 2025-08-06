import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "./AdminContext";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductList.css";

function ProductList() {
  const { isAdmin } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://laxmi-boutique-back-end.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = () => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice !== "") {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (onSaleOnly) {
      result = result.filter((p) => p.sale);
    }

    setFiltered(result);
  };

  useEffect(() => {
    handleFilter();
  }, [search, category, minPrice, maxPrice, inStockOnly, onSaleOnly, products]);

  const deleteProduct = (id) => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/products/${id}`, {
      method: "DELETE",
    }).then(() => setProducts(products.filter((p) => p.id !== id)));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">🛍️ Product Catalog</h2>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input
            className="form-control"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input
            className="form-control"
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input
            className="form-control"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-auto d-flex align-items-center">
          <input
            className="form-check-input me-1"
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
          />
          <label className="form-check-label me-3">In Stock</label>
          <input
            className="form-check-input me-1"
            type="checkbox"
            checked={onSaleOnly}
            onChange={() => setOnSaleOnly(!onSaleOnly)}
          />
          <label className="form-check-label">On Sale</label>
        </div>
      </div>

      {/* Product Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              width: "240px",
              padding: "15px",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "fill",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ fontSize: "18px", margin: "0 0 5px" }}>{p.name}</h4>
            <p
              style={{ fontWeight: "bold", color: "green", margin: "0 0 5px" }}
            >
              ₹{p.price}
            </p>
            <p
              style={{ fontSize: "14px", color: "#666", margin: "0 0 10px" }}
            >
              {p.description.slice(0, 60)}...
            </p>
            <div style={{ fontSize: "13px", marginBottom: "10px" }}>
              {p.inStock ? (
                <span style={{ color: "green" }}>✔ In Stock</span>
              ) : (
                <span style={{ color: "gray" }}>✖ Out of Stock</span>
              )}
              <br />
              {p.sale ? (
                <span style={{ color: "red" }}>🔥 On Sale</span>
              ) : (
                <span>💼 Regular</span>
              )}
            </div>

            <Link
              to={`/products/${p.id}`}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                fontSize: "12px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              View
            </Link>

            {isAdmin && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Link
                  to={`/products/edit/${p.id}`}
                  style={{
                    fontSize: "12px",
                    textDecoration: "none",
                    color: "#ffc107",
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
