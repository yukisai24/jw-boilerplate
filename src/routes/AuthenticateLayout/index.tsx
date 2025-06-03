import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { EUserRole } from '@/types/user';

const AuthenticateLayout = () => {
  const location = useLocation();
  const authenticated = useAuth((state) => state.authenticated);
  const currentUser = useAuth((state) => state.currentUser);

  // if (authenticated) {
  //   if (
  //     currentUser?.role === EUserRole.PORTAL_ADMIN ||
  //     currentUser?.role === EUserRole.PROVIDER_ADMIN
  //   ) {
  //     return (
  //       <Navigate
  //         to={paths.home}
  //         replace
  //       />
  //     );
  //   }

  //   if (location?.state?.[PREVIOUS_PATH]) {
  //     const path = location.state[PREVIOUS_PATH];
  //     return (
  //       <Navigate
  //         to={path}
  //         state={undefined}
  //         replace
  //       />
  //     );
  //   }

  //   return (
  //     <Navigate
  //       to={paths.index}
  //       replace
  //     />
  //   );
  // }

  return <Outlet />;
};

export default AuthenticateLayout;
