import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Ambil user dari localStorage
  if (!user) {
    return <Navigate to="/login" replace />; // Jika tidak ada user, arahkan ke halaman login
  }
  return children; // Jika user login, tampilkan konten rute
};

export default ProtectedRoute;
