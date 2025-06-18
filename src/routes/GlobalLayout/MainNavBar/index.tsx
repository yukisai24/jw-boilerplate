import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Collapse, Stack, styled } from '@mui/material';

// import UserMenu from '@/components/molecules/userMenu';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import theme from '@/theme';
import { COMPONENT_HEIGHT } from '@/theme/constants';
import { EUserRole } from '@/types/user';

import HorizontalMenu from './components/horizontalMenu';
import VerticalMenu from './components/verticalMenu';

const HeaderToolbar = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100%',
});
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  position: 'sticky',
  borderBottom: `1px solid ${theme.palette.neutralLight[200]}`,
  minHeight: COMPONENT_HEIGHT.header,
  backgroundColor: theme.palette.neutralLight[0],

  '&.homeHeader': {
    borderBottom: 0,
    '&.homeHeader-1': {
      backgroundColor: theme.palette.purple[500],
    },
    '&.homeHeader-2': {
      backgroundColor: theme.palette.neutralLight[25],
    },
  },

  '&.homeHeader-animation': {
    animation: 'slideDown 1.2s ease',
  },
  '@keyframes slideDown': {
    from: {
      transform: 'translateY(-100%)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
}));
const MainNavBar = () => {
  const headerRef = useRef<HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleLogIn = () => {
    navigate(paths.auth.logIn);
  };

  const handleSignUp = () => {
    navigate(paths.auth.signUp);
  };

  useEffect(() => {
    const pathsArray = location.pathname.split('/');
    if (!((!pathsArray[1] || pathsArray[1] === 'home') && !pathsArray[2])) {
      headerRef.current?.classList.remove(
        'homeHeader',
        'homeHeader-1',
        'homeHeader-2',
      );
    }
  }, [location.pathname]);

  return (
    <>
      <StyledAppBar
        ref={headerRef}
        color="inherit"
      >
        <Stack
          paddingX={7}
          height={`calc(${COMPONENT_HEIGHT.header} - 1px)`} // Ignore header bottom border
          justifyContent="space-between"
        >
          <Box
            display={{ xs: 'none', xl: 'block' }}
            margin="0 auto"
          >
            {/* Comment in case need to revert using the dropdown menu */}
            <HorizontalMenu
              color={'white'}
              // setMenuDisplayStatus={setMenuDisplayStatus}
              // menuDisplayStatus={menuDisplayStatus}
            />
          </Box>

          <Box flex={1}>
            {!currentUser?.role ? (
              <HeaderToolbar gap={{ xl: 4, lg: 7, xs: 7 }}>
                <>
                  <Box
                    display={{
                      xl: 'none',
                    }}
                  >
                    {/* <UserMenu /> */}
                  </Box>

                  <Box
                    display={{ xl: 'flex', xs: 'none' }}
                    gap={4}
                  >
                    <Button
                      onClick={handleLogIn}
                      size="medium"
                      variant={'outlined'}
                    >
                      로그인
                    </Button>
                    <Button
                      onClick={handleSignUp}
                      variant={'outlined'}
                      size="medium"
                    >
                      가입하기
                    </Button>
                  </Box>
                </>
              </HeaderToolbar>
            ) : (
              <HeaderToolbar gap={7}>
                <></>
              </HeaderToolbar>
            )}
          </Box>
        </Stack>

        <VerticalMenu
          isDisplay={true}
          setIsDisplay={() => {}}
        />
      </StyledAppBar>

      <div id="back-to-top-anchor" />
    </>
  );
};

export default MainNavBar;
