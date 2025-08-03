
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { AdminContext } from '../components/AdminContext';

function LandingPage() {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(form.username, form.password, form.role);
    if (success) {
      alert(`${form.role} logged in successfully`);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <h1 className="landing-title">Laxmi Boutique</h1>
        <p className="landing-subtitle">Discover elegant ethnic wear, modern fashion & more!</p>
        <button onClick={() => navigate('/products')} className="landing-btn">
          Shop Now
        </button>
      </div>

      <div className="login-overlay">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select><br />
          <input name="username" placeholder="Username" onChange={handleChange} /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
