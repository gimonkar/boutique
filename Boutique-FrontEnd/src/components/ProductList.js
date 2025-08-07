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
    <div className="product-list container py-4">
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
        <div className="col-md-auto d-flex align-items-center filter-checks">
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
      <div className="product-grid">
        {filtered.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} className="product-image" />
            <h4 className="product-name">{p.name}</h4>
            <p className="product-price">₹{p.price}</p>
            <p className="product-desc">{p.description.slice(0, 60)}...</p>
            <div className="product-meta">
              <span className={p.inStock ? "stock in" : "stock out"}>
                {p.inStock ? "✔ In Stock" : "✖ Out of Stock"}
              </span>
              <br />
              <span className={p.sale ? "sale" : "regular"}>
                {p.sale ? "🔥 On Sale" : "💼 Regular"}
              </span>
            </div>

            <Link to={`/products/${p.id}`} className="btn view-btn">
              View
            </Link>

            {isAdmin && (
              <div className="admin-actions">
                <Link to={`/products/edit/${p.id}`} className="btn edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="btn cart-btn"
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
