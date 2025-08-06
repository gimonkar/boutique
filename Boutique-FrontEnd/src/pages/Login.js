// // src/pages/Login.js
// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AdminContext } from '../components/AdminContext';
// import './Login.css';

// function Login() {
//   const { login } = useContext(AdminContext);
//   const [form, setForm] = useState({ username: '', password: '', role: 'user' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const success = login(form.username, form.password, form.role);
//     if (success) {
//       alert(`${form.role} logged in successfully`);
//       navigate('/');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-page">
//       <form onSubmit={handleLogin} className="login-box">
//         <h2>Login</h2>

//         <select name="role" value={form.role} onChange={handleChange}>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
