import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PREVIOUS_PATH } from '@/constants/common';
import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { EUserRole } from '@/types/user';

const AuthenticateLayout = () => {
  const location = useLocation();
  const authenticated = useAuth((state) => state.authenticated);

  if (authenticated) {
    if (location?.state?.[PREVIOUS_PATH]) {
      const path = location.state[PREVIOUS_PATH];
      return (
        <Navigate
          to={path}
          state={undefined}
          replace
        />
      );
    }

    return (
      <Navigate
        to={paths.index}
        replace
      />
    );
  }

  return <Outlet />;
};

export default AuthenticateLayout;
