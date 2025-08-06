import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import './ProductForm.css';

function ProductForm() {
  const { isAdmin } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    inStock: true,
    sale: false,
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`https://laxmi-boutique-back-end.onrender.com/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            originalPrice: data.originalPrice || '',
            category: data.category || '',
            image: data.image || '',
            inStock: data.inStock,
            sale: data.sale,
          });
        })
        .catch((err) => {
          alert("Failed to fetch product data.");
          console.error(err);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Only admin can modify products!");

    if (product.name.trim().length < 2) {
      return alert("Product name must be at least 2 characters long.");
    }
    if (product.description.length > 1000) {
      return alert("Description must be under 1000 characters.");
    }
    if (parseFloat(product.price) <= 0) {
      return alert("Price must be greater than 0.");
    }

    const url = isEdit
      ? `https://laxmi-boutique-back-end.onrender.com/api/products/${id}`
      : `https://laxmi-boutique-back-end.onrender.com/api/products`;

    const method = isEdit ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...product,
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : product.originalPrice
      }),
    });

    if (response.ok) {
      alert(isEdit ? 'Product updated successfully' : 'Product added successfully');
      navigate('/products');
    } else {
      alert('Error saving product');
    }
  };

  if (!isAdmin) return <p style={{ color: "red", textAlign: "center" }}>You must be an admin to access this form.</p>;

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>

      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        required
        minLength={2}
        type="text"
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        maxLength={1000}
        type="text"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        required
      />
      <input
        name="originalPrice"
        type="number"
        placeholder="Original Price"
        value={product.originalPrice}
        onChange={handleChange}
        min="0.01"
        step="0.01"
      />
      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
        type="text"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        type="url"
      />

      <label>
        <input
          name="inStock"
          type="checkbox"
          checked={product.inStock}
          onChange={handleChange}
        /> In Stock
      </label>
      <label>
        <input
          name="sale"
          type="checkbox"
          checked={product.sale}
          onChange={handleChange}
        /> On Sale
      </label>

      <button type="submit">{isEdit ? 'Update' : 'Add'} Product</button>
    </form>
  );
}

export default ProductForm;
