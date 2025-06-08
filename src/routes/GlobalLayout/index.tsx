import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import Footer from '@/components/organisms/footer';
import MainNavBar from '@/components/organisms/mainNavBar';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { MainLayoutContainer } from '@/styled/layout';
import { EUserRole } from '@/types/user';

import ScrollToTop from '../scrollToTop';

interface IGlobalLayout {
  acceptedRole?: EUserRole[];
}

const GlobalLayout = ({ acceptedRole }: IGlobalLayout) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);

  if (acceptedRole?.length) {
    if (
      !acceptedRole?.includes(EUserRole.GUEST) &&
      (!currentUser?.role || !acceptedRole?.includes(currentUser.role))
    ) {
      navigate(paths.pageNotFound, { replace: true });
    }
  }

  return (
    <ScrollToTop>
      <MainNavBar
        isShowSearchBox={isShowSearchBox}
        setIsShowSearchBox={setIsShowSearchBox}
      />
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
      <Footer onClick={() => setIsShowSearchBox(false)} />
    </ScrollToTop>
  );
};

export default GlobalLayout;
