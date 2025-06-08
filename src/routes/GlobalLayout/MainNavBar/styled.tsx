import { AppBar, Box, MenuItem, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

import CIconButton from '@/components/atoms/cIconButton';

import { SearchIcon } from '@/assets/icons';
import { COMPONENT_HEIGHT } from '@/theme/constants';

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

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

const StyledHorizontalMenuItem = styled(Box)({
  minWidth: '120px',
  textWrap: 'wrap',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

//Comment in case need to revert using the dropdown menu
// const StyledHorizontalMenuItem = styled(MenuItem)(({ theme }) => ({
//   padding: theme.spacing(3),
//   width: '120px',
//   textWrap: 'wrap',
//   justifyContent: 'center',
//   display: 'flex',
//   textAlign: 'center',
// }));

const StyledVerticalMenuItem = styled(MenuItem)(({ theme }) => ({
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: 0,
}));

const HeaderToolbar = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100%',
});

type TStyledCIconButton = {
  iconColor?: string;
  hoverIconColor?: string;
};
const StyledCIconButton = styled(CIconButton, {
  shouldForwardProp: (propName) => propName !== 'iconColor' && propName !== 'hoverIconColor',
})<TStyledCIconButton>(({ theme, iconColor, hoverIconColor }) => ({
  padding: theme.spacing(1),
  color: iconColor,
  '&:hover': {
    color: hoverIconColor,
  },
}));

const StyledLogoContainer = styled(Box)({
  display: 'flex',
  height: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  ':hover': {
    cursor: 'pointer',
  },
});

const MenuTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.neutralLight[0],
    color: theme.palette.neutralDark[0],
    boxShadow: theme.shadows[3],
    padding: 0,
    margin: 0,
    marginTop: `${theme.spacing(2)} !important`,
    borderRadius: 2,
  },
}));

export {
  HeaderToolbar,
  MenuTooltip,
  StyledAppBar,
  StyledCIconButton,
  StyledHorizontalMenuItem,
  StyledLogoContainer,
  StyledSearchIcon,
  StyledVerticalMenuItem,
};
