import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Collapse, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';

import UserButton from '@/components/atoms/userButton';
import AnyApiLogo from '@/components/molecules/anyApiLogo';
import MobileMenu from '@/components/molecules/mobileMenu';
import SearchBox from '@/components/molecules/searchBox';
import UserMenu from '@/components/molecules/userMenu';
import HorizontalMenu from '@/components/organisms/mainNavBar/components/horizontalMenu';
import VerticalMenu from '@/components/organisms/mainNavBar/components/verticalMenu';
import { menuCategory } from '@/components/organisms/mainNavBar/constant';
import {
  HeaderToolbar,
  StyledAppBar,
  StyledCIconButton,
  StyledSearchIcon,
} from '@/components/organisms/mainNavBar/styled';

import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/hooks/useStore';
import { paths } from '@/routes/paths';
import theme from '@/theme';
import { COMPONENT_HEIGHT } from '@/theme/constants';
import { EUserRole } from '@/types/user';

const MainNavBarView = ({
  isShowSearchBox,
  setIsShowSearchBox,
}: {
  isShowSearchBox: boolean;
  setIsShowSearchBox: Dispatch<SetStateAction<boolean>>;
}) => {
  const headerRef = useRef<HTMLElement>(null);

  const { navBarStore } = useStore();

  const { homePageType = 1, isInHomePage = false } = navBarStore?.navBarState || {};

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  {
    /* Comment in case need to revert using the dropdown menu */
  }
  // const [menuDisplayStatus, setMenuDisplayStatus] = useState<TMenuDisplayStatus>();
  const [isShowMobileMenuContent, setIsShowMobileMenuContent] = useState(false);

  const isUseStickyHeader = useMemo(
    () => (isInHomePage && (isScrolled || isShowSearchBox || isShowMobileMenuContent)) || !isInHomePage,
    [isInHomePage, isScrolled, isShowSearchBox, isShowMobileMenuContent],
  );
  const isUseDefaultStyle = useMemo(() => isUseStickyHeader || homePageType !== 1, [isUseStickyHeader, homePageType]);

  const handleLogIn = () => {
    navigate(paths.auth.logIn);
  };

  const handleSignUp = () => {
    navigate(paths.auth.signUp);
  };

  useEffect(() => {
    const onDocumentScroll = (e: Event) => {
      if ((e.target as Element).scrollTop > 70) setIsScrolled(true);
      else setIsScrolled(false);
    };
    if (headerRef?.current?.parentElement && isInHomePage)
      headerRef.current.parentElement.addEventListener('scroll', onDocumentScroll);
    return () => {
      if (headerRef?.current?.parentElement && isInHomePage)
        headerRef.current.parentElement.removeEventListener('scroll', onDocumentScroll);
    };
  }, [isInHomePage]);

  useEffect(() => {
    const pathsArray = location.pathname.split('/');
    if (!((!pathsArray[1] || pathsArray[1] === 'home') && !pathsArray[2])) {
      headerRef.current?.classList.remove('homeHeader', 'homeHeader-1', 'homeHeader-2');
      navBarStore?.setNavbarState?.({
        homePageType: 1,
        isInHomePage: false,
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    headerRef.current?.classList.remove(`homeHeader-${homePageType === 1 ? 2 : 1}`);
    headerRef.current?.classList.toggle('homeHeader', !isUseStickyHeader);
    headerRef.current?.classList.toggle(`homeHeader-${homePageType}`, !isUseStickyHeader);
    headerRef.current?.classList.toggle('homeHeader-animation', isInHomePage && isScrolled);
  }, [isUseStickyHeader, homePageType, isInHomePage, isScrolled]);

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
          <Box flex={1}>
            <AnyApiLogo
              type={!isUseDefaultStyle ? 'monochrome' : 'colorful'}
              color={theme.palette.neutralLight[0]}
            />
          </Box>

          <Box
            display={{ xs: 'none', xl: 'block' }}
            margin="0 auto"
          >
            {/* Comment in case need to revert using the dropdown menu */}
            <HorizontalMenu
              color={!isUseDefaultStyle ? 'white' : 'black'}
              // setMenuDisplayStatus={setMenuDisplayStatus}
              // menuDisplayStatus={menuDisplayStatus}
            />
          </Box>

          <Box flex={1}>
            {!currentUser?.role ? (
              <HeaderToolbar gap={{ xl: 4, lg: 7, xs: 7 }}>
                {!isShowMobileMenuContent && (
                  <>
                    <Box
                      display={{
                        xl: 'none',
                      }}
                    >
                      <UserMenu />
                    </Box>

                    <Box
                      display={{ xl: 'flex', xs: 'none' }}
                      gap={4}
                    >
                      <UserButton
                        rounded
                        label="로그인"
                        onClick={handleLogIn}
                        size="medium"
                        variant={!isUseDefaultStyle ? 'outlined' : undefined}
                      />

                      <UserButton
                        rounded
                        label="가입하기"
                        onClick={handleSignUp}
                        variant={!isUseDefaultStyle ? undefined : 'outlined'}
                        size="medium"
                      />
                    </Box>

                    <StyledCIconButton
                      icon={<StyledSearchIcon />}
                      disableRipple
                      onClick={() => {
                        setIsShowMobileMenuContent(false);
                        setIsShowSearchBox((prev) => !prev);
                      }}
                      iconColor={!isUseDefaultStyle ? theme.palette.neutralLight[0] : theme.palette.neutralLight[900]}
                      hoverIconColor={isUseDefaultStyle ? theme.palette.purple[500] : theme.palette.purple[100]}
                    />
                  </>
                )}

                <Box
                  sx={{
                    display: { xs: 'flex', xl: 'none' },
                  }}
                  onClick={() => {
                    setIsShowSearchBox(false);
                    setIsShowMobileMenuContent((prev) => !prev);
                  }}
                >
                  <MobileMenu
                    isClicked={isShowMobileMenuContent}
                    color={!isUseDefaultStyle ? 'white' : 'black'}
                  />
                </Box>
              </HeaderToolbar>
            ) : (
              <HeaderToolbar gap={7}>
                {!isShowMobileMenuContent && (
                  <>
                    <UserMenu />

                    {[EUserRole.INDIVIDUAL_USER, EUserRole.ORGANIZATION_USER, EUserRole.ORGANIZATION_ADMIN].includes(
                      currentUser?.role,
                    ) && (
                      <StyledCIconButton
                        icon={<StyledSearchIcon />}
                        disableRipple
                        onClick={() => {
                          setIsShowMobileMenuContent(false);
                          setIsShowSearchBox((prev) => !prev);
                        }}
                        iconColor={!isUseDefaultStyle ? theme.palette.neutralLight[0] : theme.palette.neutralLight[900]}
                        hoverIconColor={isUseDefaultStyle ? theme.palette.purple[500] : theme.palette.purple[100]}
                      />
                    )}
                  </>
                )}

                <Box
                  sx={{
                    display: { xs: 'flex', xl: 'none' },
                  }}
                  onClick={() => {
                    setIsShowSearchBox(false);
                    setIsShowMobileMenuContent((prev) => !prev);
                  }}
                >
                  <MobileMenu
                    isClicked={isShowMobileMenuContent}
                    color={!isUseDefaultStyle ? 'white' : 'black'}
                  />
                </Box>
              </HeaderToolbar>
            )}
          </Box>
        </Stack>

        <VerticalMenu
          isDisplay={isShowMobileMenuContent}
          setIsDisplay={setIsShowMobileMenuContent}
        />

        <Collapse in={isShowSearchBox}>
          <Box
            width="100%"
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            paddingTop="50px"
            paddingBottom="54px"
          >
            <SearchBox
              categoryOptions={menuCategory}
              handleSearchClick={(data) => {
                if (data.category === menuCategory[0].value || data.navigatePage === menuCategory[0].value) {
                  navigate(paths.api.status, {
                    state: data,
                  });
                  setIsShowSearchBox(false);
                  return;
                }

                navigate(paths.service.status, {
                  state: data,
                });
                setIsShowSearchBox(false);
              }}
              placeholder="검색어를 입력해주세요."
              defaultSearch={{
                category: menuCategory[0].value,
                searchKey: '',
              }}
              tags={['검색어1', '검색어2', '검색어3', '검색어4', '검색어5']}
            />
          </Box>
        </Collapse>
      </StyledAppBar>

      <div id="back-to-top-anchor" />
    </>
  );
};
const MainNavBar = observer(MainNavBarView);

export default MainNavBar;
