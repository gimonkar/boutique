// src/pages/Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Save user logic can go here (localStorage/database/api)
    alert('Signup successful. Please login.');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select><br /><br />
        <input name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
