import { useEffect, useState } from "react";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://laxmi-boutique-back-end.onrender.com/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="products-container">
      <h2 className="products-title">🛍️ Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-image-container">
              <img
                src={p.image}
                className="product-image"
                alt={p.name}
              />
            </div>
            <div className="product-body">
              <h5 className="product-title">{p.name}</h5>
              <h6 className="product-price">₹{p.price}</h6>
              <p className="product-description">{p.description}</p>
              <div className="badge-container">
                {p.sale && <span className="badge badge-danger">On Sale</span>}
                {!p.inStock && <span className="badge badge-warning">Out of Stock</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
