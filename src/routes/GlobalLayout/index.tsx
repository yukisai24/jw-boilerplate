import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { MainLayoutContainer } from '@/styled/layout';
import { EUserRole } from '@/types/user';

import ScrollToTop from '../scrollToTop';
import MainNavBar from './MainNavBar';

interface IGlobalLayout {
  acceptedRole?: EUserRole[];
  requireAuth?: boolean; // 인증이 필요한지 여부
}

const GlobalLayout = ({ acceptedRole, requireAuth = false }: IGlobalLayout) => {
  const { currentUser, authenticated } = useAuth();
  const navigate = useNavigate();
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);

  // 인증이 필요한 경우 체크
  if (requireAuth && !authenticated) {
    navigate(paths.auth.logIn, { replace: true });
    return null;
  }

  // 특정 권한이 필요한 경우 체크
  if (acceptedRole?.length && authenticated) {
    if (!currentUser?.role || !acceptedRole?.includes(currentUser.role)) {
      navigate(paths.pageNotFound, { replace: true });
      return null;
    }
  }

  return (
    <ScrollToTop>
      <MainNavBar />
      <MainLayoutContainer
        bgcolor={({ palette }) => palette.neutralLight[25]}
        onClick={() => setIsShowSearchBox(false)}
      >
        <Stack
          width="100%"
          direction="column"
          alignItems="center"
        >
          <Outlet />
        </Stack>
      </MainLayoutContainer>
      {/* <Footer onClick={() => setIsShowSearchBox(false)} /> */}
    </ScrollToTop>
  );
};

export default GlobalLayout;
