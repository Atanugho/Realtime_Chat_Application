import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
