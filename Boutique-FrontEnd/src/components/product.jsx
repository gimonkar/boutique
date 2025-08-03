import { useEffect, useState } from "react";
import "./Product.css"

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">🛍️ Products</h2>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 col-lg-3 mb-4" key={p.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "220px", padding: "10px" }}>
                <img
                  src={p.image}
                  className="img-fluid"
                  alt={p.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <h6 className="text-success">₹{p.price}</h6>
                <p className="card-text small">{p.description}</p>
                <div className="mt-auto">
                  {p.sale && <span className="badge bg-danger me-2">On Sale</span>}
                  {!p.inStock && <span className="badge bg-warning text-dark">Out of Stock</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
