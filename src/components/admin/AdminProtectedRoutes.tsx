import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
const AdminProtectedRoutes: React.FC <React.PropsWithChildren> = ({ children })  => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.token || user.roles !== 'admin') {
      
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  
    return <>{children}</>
}

export default AdminProtectedRoutes
