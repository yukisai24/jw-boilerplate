// 📁 src/layouts/ProtectedLayout.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';

// 예: /login 등

const ProtectedLayout = () => {
  const authenticated = useAuth((state) => state.authenticated); // Zustand selector
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate(paths.index, { replace: true });
    }
  }, [authenticated, navigate]);

  return <Outlet />;
};

export default ProtectedLayout;
