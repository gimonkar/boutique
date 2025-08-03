// src/AdminContext.js
import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password, role) => {
    if (
      (role === 'admin' && username === 'admin' && password === '1234') ||
      (role === 'user' && username && password)
    ) {
      setIsAdmin(role === 'admin');
      setIsLoggedIn(true);
      setCurrentUser({ username, role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,         // ✅ ADD THIS
        isLoggedIn,
        setIsLoggedIn,      // ✅ ADD THIS
        currentUser,
        setCurrentUser,     // ✅ ADD THIS
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
