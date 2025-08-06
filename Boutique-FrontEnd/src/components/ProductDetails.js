import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "./AdminContext";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const { isAdmin } = useContext(AdminContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div className="product-detail-container">
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ₹{product.price}</p>
          <p className="product-meta">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="product-meta">
            {product.inStock ? (
              <span style={{ color: "green" }}>✔ In Stock</span>
            ) : (
              <span style={{ color: "red" }}>✖ Out of Stock</span>
            )}
          </p>
          <p className="product-meta">
            {product.sale ? (
              <span style={{ color: "orange" }}>🔥 On Sale</span>
            ) : (
              <span>💼 Regular Price</span>
            )}
          </p>

          {isAdmin && <button className="edit-button">Edit Product</button>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
