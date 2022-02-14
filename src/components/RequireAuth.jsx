import { useLocation, Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('jwt');

  if (!token) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}
