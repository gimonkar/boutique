import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "./AdminContext";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { isAdmin } = useContext(AdminContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://laxmi-boutique-back-end.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />
        <div style={styles.details}>
          <h2 style={styles.title}>{product.name}</h2>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>Price: ₹{product.price}</p>
          <p style={styles.meta}>Category: <strong>{product.category}</strong></p>
          <p style={styles.meta}>
            {product.inStock ? (
              <span style={{ color: "green" }}>✔ In Stock</span>
            ) : (
              <span style={{ color: "red" }}>✖ Out of Stock</span>
            )}
          </p>
          <p style={styles.meta}>
            {product.sale ? (
              <span style={{ color: "orange" }}>🔥 On Sale</span>
            ) : (
              <span>💼 Regular Price</span>
            )}
          </p>

          {isAdmin && <button style={{marginTop: "1rem", padding: "10px", backgroundColor: "#ffc107", border: "none", borderRadius: "5px"}}>Edit Product</button>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "900px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  image: {
    width: "350px",
    height: "auto",
    objectFit: "cover",
  },
  details: {
    padding: "30px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    color: "#555",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0d6efd",
  },
  meta: {
    fontSize: "15px",
    color: "#333",
  },
};

export default ProductDetail;
