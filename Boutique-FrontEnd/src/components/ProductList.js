import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "./AdminContext";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductList.css"; // External stylesheet

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

  useEffect(() => {
    let result = [...products];

    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    if (minPrice !== "") result = result.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.price <= parseFloat(maxPrice));
    if (inStockOnly) result = result.filter((p) => p.inStock);
    if (onSaleOnly) result = result.filter((p) => p.sale);

    setFiltered(result);
  }, [search, category, minPrice, maxPrice, inStockOnly, onSaleOnly, products]);

  const deleteProduct = (id) => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/products/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((p) => p.id !== id)));
  };

  return (
    <div className="product-container">
      <h2 className="product-heading">🛍️ Product Catalog</h2>

      {/* Filters */}
      <div className="product-filters">
        <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <label><input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} /> In Stock</label>
        <label><input type="checkbox" checked={onSaleOnly} onChange={() => setOnSaleOnly(!onSaleOnly)} /> On Sale</label>
      </div>

      {/* Products */}
      <div className="product-grid">
        {filtered.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} className="product-img" />
            <h4>{p.name}</h4>
            <p className="price">₹{p.price}</p>
            <p className="desc">{p.description.slice(0, 60)}...</p>
            <div className="tags">
              <span className={p.inStock ? "tag green" : "tag gray"}>
                {p.inStock ? "✔ In Stock" : "✖ Out of Stock"}
              </span>
              <span className={p.sale ? "tag red" : "tag"}>{p.sale ? "🔥 On Sale" : "💼 Regular"}</span>
            </div>

            <Link to={`/products/${p.id}`} className="btn btn-view">View</Link>

            {isAdmin && (
              <div className="admin-actions">
                <Link to={`/products/edit/${p.id}`} className="btn btn-edit">Edit</Link>
                <button onClick={() => deleteProduct(p.id)} className="btn btn-delete">Delete</button>
                <button onClick={() => addToCart(p)} className="btn btn-cart">🛒 Add to Cart</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
