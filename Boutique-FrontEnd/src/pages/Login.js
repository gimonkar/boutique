// src/pages/Login.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../components/AdminContext';

function Login() {
  const { login } = useContext(AdminContext);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

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
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <input name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
