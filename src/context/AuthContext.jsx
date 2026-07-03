import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, logout as serviceLogout } from '../api/students.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar la app, vemos si ya había alguien logueado
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.role); // Para el enmascarado directo
    // Guardamos el objeto completo o solo el rol para que persista al recargar
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    serviceLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto más fácil
export const useAuth = () => useContext(AuthContext);