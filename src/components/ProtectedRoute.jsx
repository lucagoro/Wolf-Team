import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    // Si no hay usuario, lo mandamos al login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;