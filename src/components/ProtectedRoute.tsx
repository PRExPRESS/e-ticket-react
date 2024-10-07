import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user.token) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>; // Make sure to wrap children with React Fragment
};

export default ProtectedRoute;
