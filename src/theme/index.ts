import { createTheme } from '@mui/material/styles';

import componentsConfig from '@/theme/components';
import { NotoSansCJKKR } from '@/theme/font';

import paletteConfig from './palette';
import { customTypographyVariants } from './typography';

const theme = createTheme({
  palette: paletteConfig,
  components: {
    ...componentsConfig,

    MuiCssBaseline: {
      styleOverrides: NotoSansCJKKR,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 930,
      xl: 1650,
    },
  },
  spacing: 4,
  typography: {
    fontFamily: '"NotoSansCJKKR"',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: 'none',
    },
    ...customTypographyVariants,
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
