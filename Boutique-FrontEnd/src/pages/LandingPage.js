import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { AdminContext } from '../components/AdminContext';

function LandingPage() {
  const navigate = useNavigate();
  const { login } = useContext(AdminContext);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // new state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(form.username, form.password, form.role);
    if (success) {
      setIsLoggedIn(true); // ✅ toggle blur off
      alert(`${form.role} logged in successfully`);
      setTimeout(() => navigate('/'), 500); // delay for UI effect
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Intro / CTA Section
        <div className="intro-section">
          <h1 className="landing-title">Laxmi Boutique</h1>
          <p className="landing-subtitle">
            Discover elegant ethnic wear, modern fashion & more!
          </p>
          <button onClick={() => navigate('/products')} className="landing-btn">
            Shop Now
          </button>
        </div> */}

        {/* Login Section */}
        <div className={`login-section ${isLoggedIn ? 'remove-blur' : ''}`}>
          <form onSubmit={handleLogin} className="login-form">
            <h1>Login</h1>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button type="submit" >Login</button>

            <button onClick={() => navigate('/products')} id="shop-button">Shop Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
