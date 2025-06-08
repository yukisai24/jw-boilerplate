import { Box, Grid, Stack, styled } from '@mui/material';

import {
  ADMIN_MAX_CONTENT_WIDTH,
  COMPONENT_HEIGHT,
  COMPONENT_WIDTH,
  USER_MAX_CONTENT_WIDTH,
} from '@/theme/constants';

export const MainLayoutContainer = styled(Stack)(({ theme }) => ({
  // Remove footer height due to request from designer
  // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.tablet})`,
  minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header})`,
  flexDirection: 'column',
  width: '100%',

  [theme.breakpoints.up('lg')]: {
    // Remove footer height due to request from designer
    // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.laptop})`,
    minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header})`,
  },

  [theme.breakpoints.up('xl')]: {
    // Remove footer height due to request from designer
    // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.desktop})`,
    minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header})`,
  },
}));

export const AdminPageWrapper = styled(Stack)(({ theme }) => ({
  alignSelf: 'center',
  rowGap: theme.spacing(8),
  marginTop: COMPONENT_HEIGHT.mainLayoutMarginTop,
  width: ADMIN_MAX_CONTENT_WIDTH.tablet,
  flexGrow: 1,
  position: 'relative',

  [theme.breakpoints.up('lg')]: {
    width: ADMIN_MAX_CONTENT_WIDTH.laptop,
  },

  [theme.breakpoints.up('xl')]: {
    width: ADMIN_MAX_CONTENT_WIDTH.desktop,
  },
}));

export const AdminContentWrapper = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'isHaveSubMenu',
})<{
  isHaveSubMenu: boolean;
}>(({ theme, isHaveSubMenu }) => ({
  width: '100%',
  marginTop: COMPONENT_HEIGHT.pageTitleMarginTop,
  paddingLeft: 0,

  [theme.breakpoints.up('xl')]: {
    paddingLeft: isHaveSubMenu ? theme.spacing(9) : 0,
    width: `calc(100% - ${isHaveSubMenu ? COMPONENT_WIDTH.subNavBar : '0px'})`,
  },
}));

export const AdminEditContentWrapper = styled(Box)(({ theme }) => ({
  // Remove footer height due to request from designer
  // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.tablet} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
  minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
  width: '100%',
  // overflowY: 'scroll',
  position: 'relative',

  [theme.breakpoints.up('lg')]: {
    // Remove footer height due to request from designer
    // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.laptop} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
    minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
  },

  [theme.breakpoints.up('xl')]: {
    // Remove footer height due to request from designer
    // minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.footer.desktop} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
    minHeight: `calc(100vh - ${COMPONENT_HEIGHT.header} - ${COMPONENT_HEIGHT.mainLayoutMarginTop} - ${COMPONENT_HEIGHT.pageTitleMarginTop})`,
  },
}));

export const UserContentContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'size',
})<{
  size: TUserLayoutSize;
}>(({ theme, size }) => ({
  width: USER_MAX_CONTENT_WIDTH.tablet,

  [theme.breakpoints.up('lg')]: {
    width: USER_MAX_CONTENT_WIDTH.laptop,
  },

  [theme.breakpoints.up('xl')]: {
    width:
      size === 'l'
        ? USER_MAX_CONTENT_WIDTH.desktop
        : USER_MAX_CONTENT_WIDTH.largeDesktop,
  },
}));

export const FixedContainer = styled(Box)({
  width: ADMIN_MAX_CONTENT_WIDTH.tablet,
});

export const SearchContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },
}));

export const SearchButtons = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(6),

  [theme.breakpoints.up('lg')]: {
    marginTop: 'unset',
  },
}));

export const PageTitleWrapper = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const StyledForm = styled('form')({
  //
});

export const StyledEditLayoutForm = styled('form', {
  shouldForwardProp: (propName) => propName !== 'isNotFullHeight',
})<{
  isNotFullHeight: boolean;
}>(({ isNotFullHeight }) => ({
  minHeight: `calc(100% - 64px - ${isNotFullHeight ? 0 : 24}px)`,
  ...(isNotFullHeight
    ? {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }
    : {}),
}));
