import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthStore } from '@/stores/authStore';

const ProtectedRoute = ({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: string[];
}) => {
  const { user, isAuthenticated } = AuthStore();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
