// src/components/AdminLogin.js
import { useState, useContext } from 'react';
import { AdminContext } from "../components/AdminContext"

function AdminLogin() {
  const { isAdmin, login, logout } = useContext(AdminContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAdmin) {
    return (
      <div>
        <h3>Welcome Admin</h3>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleLogin = () => {
    const success = login(username, password);
    if (!success) {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h3>Admin Login</h3>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
