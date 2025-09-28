import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/providers/AdminProvider';

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { isAdmin } = useAdmin();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
