import { Color } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface NeutralColor extends Color {
    0: string;
    25: string;
    150: string;
  }

  interface customColorType {
    [key: string]: string;
  }

  interface customButtonColorType {
    primary: string;
    primaryHover: string;
    primaryActive: string;

    secondary01: string;
    secondary01Hover: string;
    secondary01Active: string;

    secondary02: string;
    secondary02Hover: string;
    secondary02Active: string;

    danger: string;
    dangerHover: string;
    dangerActive: string;

    selected: string;
    selectedHover: string;

    deleteHover: string;
    deleteActive: string;

    disable: string;
    disable02: string;
    secondary03: string;
  }

  interface customIconColorType {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
    disable: string;
    brand_primary: string;
    brand_primary2: string;
    brand_secondary: string;
    inverse: string;
    error: string;
    helper: string;
    mark: string;
    favorite: string;
    mark_chartTime: string;
    fail: string;
    success: string;
  }

  interface customBorderColorType {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
    brandPrimary: string;
    brandSecondary: string;
    disabled: string;
    highlight: string;
    error: string;
  }

  interface customLayerColorType {
    '01': string;
    hover01: string;
    active01: string;
    selected01: string;

    '02': string;
    hover_02: string;
    active_02: string;
    selected_02: string;

    '03': string;
    hover03: string;
    active03: string;
    selected03: string;

    '04': string;
    hover_04: string;
    selected04: string;

    '05': string;
    hover_05: string;
    active05: string;

    '06': string;
    hover_06: string;
    active06: string;

    '07': string;
    '08': string;

    accentSelected01: string;
    accentSelected02: string;
    accentHover03: string;
    accentActive03: string;
    error: string;
    dropdown: string;
    dropdownHover: string;
    dropdownActive: string;
  }

  interface TypeBackground {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    tab: string;
  }

  interface TypeText {
    placeholder: string;
    brandPrimary: string;
    brandSecondary: string;
    error: string;
    link: string;
    linkHover: string;
    linkActive: string;
    helper: string;
    highlight: string;
    fail: string;
    success: string;
    inverse: string;
  }

  interface customFieldColorType {
    '01': string;
    hover01: string;
  }

  interface customStatusColorType {
    fail: string;
    failHover: string;
    severe: string;
    severeHover: string;
    severeLight: string;
    critical: string;
    criticalHover: string;
    criticalLight: string;
    warning: string;
    warningHover: string;
    warningLight: string;
    info: string;
    infoHover: string;
    infoLight: string;
    success: string;
    normal: string;
    stop: string;
    stopHover: string;
    running: string;
    none: string;
  }

  interface customNodeColorType {
    info01: string;
    info02: string;
    info03: string;
    info04: string;

    warning01: string;
    warning02: string;
    warning03: string;
    warning04: string;

    critical01: string;
    critical02: string;
    critical03: string;
    critical04: string;

    severs01: string;
    severs02: string;
    severs03: string;
    severs04: string;

    shutdown01: string;
    shutdown02: string;
    shutdown03: string;
    shutdown04: string;

    hover: string;
    select: string;
  }

  interface Palette {
    neutralLight: NeutralColor;
    neutralDark: NeutralColor;
    purple: NeutralColor;
    blue: NeutralColor;
    green: NeutralColor;
    red: NeutralColor;
    orange: NeutralColor;
    yellow: NeutralColor;
    layer: customLayerColorType;
    border: customBorderColorType;
    icon: customIconColorType;
    button: customButtonColorType;
    field: customFieldColorType;
    status: customStatusColorType;
    node: customNodeColorType;
  }

  interface PaletteOptions {
    neutralLight: Partial<NeutralColor>;
    neutralDark: Partial<NeutralColor>;
    purple: Partial<NeutralColor>;
    blue: Partial<NeutralColor>;
    green: Partial<NeutralColor>;
    red: Partial<NeutralColor>;
    orange: Partial<NeutralColor>;
    yellow: Partial<NeutralColor>;
  }
}

const paletteOptions: PaletteOptions = {
  neutralLight: {
    '0': '#FFFFFF',
    '25': '#FAFBFB',
    '50': '#F5F6F7',
    '100': '#ECEEF0',
    '150': '#DEDFE2',
    '200': '#D3D5DA',
    '300': '#B9BDC3',
    '400': '#9EA4AC',
    '500': '#7A828E',
    '600': '#5E6777',
    '700': '#434D5F',
    '800': '#1C293E',
    '900': '#0F1722',
  },
  neutralDark: {
    '0': '#000000',
    '25': '#1A1B22',
    '50': '#2A2D37',
    '100': '#353841',
    '150': '#41444D',
    '200': '#50535B',
    '300': '#686A71',
    '400': '#86888D',
    '500': '#9A9BA0',
    '600': '#BABABE',
    '700': '#D0D1D3',
    '800': '#F0F0F1',
    '900': '#FFFFFF',
  },
  purple: {
    '0': '#FFFFFF',
    '25': '#F5F3FF',
    '50': '#F1ECFF',
    '100': '#E1D7FF',
    '150': '#D0BFFF',
    '200': '#BEA9FD',
    '300': '#A182FC',
    '400': '#8E69FC',
    '500': '#7244FB',
    '600': '#6137DF',
    '700': '#5130B2',
    '800': '#3F258A',
    '900': '#301D69',
  },
  blue: {
    '0': '#FFFFFF',
    '25': '#F6F9FE',
    '50': '#E8F5FE',
    '100': '#CBE9FF',
    '150': '#B0DEFF',
    '200': '#95D0FA',
    '300': '#64BAF8',
    '400': '#46ADF7',
    '500': '#1898F5',
    '600': '#0485E3',
    '700': '#116CAE',
    '800': '#0D5487',
    '900': '#0A4067',
  },
  green: {
    '0': '#FFFFFF',
    '25': '#F7FCFA',
    '50': '#EAF9F3',
    '100': '#C8F1E2',
    '150': '#AFE7D2',
    '200': '#A0E1CA',
    '300': '#74D3B1',
    '400': '#59CBA2',
    '500': '#30BE8B',
    '600': '#2CAD7E',
    '700': '#199066',
    '800': '#157552',
    '900': '#125B41',
  },
  red: {
    '0': '#FFFFFF',
    '25': '#FDF6F6',
    '50': '#FDECEB',
    '100': '#FFD1CD',
    '150': '#FAB8B2',
    '200': '#F8A9A1',
    '300': '#F48276',
    '400': '#F2695C',
    '500': '#EF4433',
    '600': '#D93E2E',
    '700': '#B82719',
    '800': '#952015',
    '900': '#761E14',
  },
  orange: {
    '0': '#FFFFFF',
    '25': '#FEFAF5',
    '50': '#FFF4E7',
    '100': '#FFE4C6',
    '150': '#FFD7AB',
    '200': '#FFCB91',
    '300': '#FFB35E',
    '400': '#FFA23B',
    '500': '#FF8B0A',
    '600': '#E8800E',
    '700': '#C66801',
    '800': '#A65800',
    '900': '#844500',
  },
  yellow: {
    '0': '#FFFFFF',
    '25': '#FEFDF7',
    '50': '#FFF8EB',
    '100': '#FFEFD0',
    '150': '#FFE8B9',
    '200': '#FEE0A5',
    '300': '#FFD584',
    '400': '#FFC85A',
    '500': '#FEB72C',
    '600': '#EAA317',
    '700': '#CF8C09',
    '800': '#B17602',
    '900': '#8E6209',
  },
  primary: {
    main: '#7244FB',
  },
  secondary: {
    main: '#1898F5',
  },
};

const paletteConfig = {
  ...paletteOptions,
  button: {
    primary: paletteOptions.purple[500],
    primaryHover: paletteOptions.purple[600],
    primaryActive: paletteOptions.purple[700],

    secondary01: paletteOptions.neutralLight[0],
    secondary01Hover: paletteOptions.neutralLight[100],
    secondary01Active: paletteOptions.neutralLight[150],

    secondary02: paletteOptions.neutralLight[100],
    secondary02Hover: paletteOptions.neutralLight[150],
    secondary02Active: paletteOptions.neutralLight[200],

    danger: paletteOptions.red[500],
    dangerHover: paletteOptions.red[600],
    dangerActive: paletteOptions.red[700],

    selected: paletteOptions.neutralLight[600],
    selectedHover: paletteOptions.neutralLight[500],

    deleteHover: paletteOptions.red[50],
    deleteActive: paletteOptions.red[100],

    disable: paletteOptions.neutralLight[50],

    //user system
    secondary03: paletteOptions.neutralLight[500],
    disable02: paletteOptions.neutralLight[150],
    primary_off: paletteOptions.purple[100],
  },

  icon: {
    primary: paletteOptions.neutralLight[700],
    secondary: paletteOptions.neutralLight[400],
    hover: paletteOptions.purple[400],
    active: paletteOptions.purple[600],
    disable: paletteOptions.neutralLight[200],
    brandPrimary: paletteOptions.purple[500],
    brandSecondary: paletteOptions.blue[500],
    inverse: paletteOptions.neutralLight[0],
    error: paletteOptions.red[500],
    helper: paletteOptions.neutralLight[600],
    mark: paletteOptions.purple[200],
    favorite: paletteOptions.yellow[500],
    markChartTime: paletteOptions.neutralLight[600],
    fail: paletteOptions.orange[500],
    success: paletteOptions.green[500],
  },

  border: {
    '01': paletteOptions.neutralLight[150],
    '02': paletteOptions.neutralLight[200],
    '03': paletteOptions.neutralLight[700],
    '04': paletteOptions.neutralLight[500],
    '05': paletteOptions.neutralLight[150],
    brandPrimary: paletteOptions.purple[500],
    brandSecondary: paletteOptions.blue[500],
    disabled: paletteOptions.neutralLight[100],
    highlight: paletteOptions.purple[500],
    error: paletteOptions.red[500],
  },

  layer: {
    '01': paletteOptions.neutralLight[0],
    hover01: paletteOptions.neutralLight[50],
    active01: paletteOptions.neutralLight[150],
    selected01: paletteOptions.neutralLight[100],

    '02': paletteOptions.neutralLight[50],
    hover_02: paletteOptions.neutralLight[100],
    active_02: paletteOptions.neutralLight[200],
    selected_02: paletteOptions.neutralLight[150],

    '03': paletteOptions.neutralLight[100],
    hover03: paletteOptions.neutralLight[150],
    active03: paletteOptions.neutralLight[200],
    selected03: paletteOptions.neutralLight[150],

    '04': paletteOptions.neutralLight[150],
    hover_04: paletteOptions.neutralLight[200],
    selected04: paletteOptions.neutralLight[300],

    '05': paletteOptions.blue[50],
    hover_05: paletteOptions.blue[100],
    active05: paletteOptions.blue[200],

    '06': (paletteOptions.neutralLight[500] as string) + 40,
    hover_06: (paletteOptions.neutralLight[500] as string) + 80,
    active06: (paletteOptions.neutralLight[500] as string) + 60,

    '07': paletteOptions.purple[500],
    '08': paletteOptions.neutralLight[800],

    accentSelected01: paletteOptions.blue[50],
    accentSelected02: paletteOptions.blue[100],
    accentHover03: paletteOptions.purple[50],
    accentActive03: paletteOptions.purple[100],
    error: paletteOptions.red[50],
    dropdown: paletteOptions.neutralLight[0],
    dropdownHover: paletteOptions.neutralLight[50],
    dropdownActive: paletteOptions.neutralLight[150],
  },

  background: {
    '01': paletteOptions.neutralLight[0],
    '02': paletteOptions.neutralLight[25],
    '03': paletteOptions.neutralLight[50],
    '04': (paletteOptions.neutralLight[50] as string) + 75,
    tab: paletteOptions.neutralLight[100],
  },

  text: {
    primary: paletteOptions.neutralLight[800],
    secondary: paletteOptions.neutralLight[500],
    placeholder: paletteOptions.neutralLight[400],
    disabled: paletteOptions.neutralLight[300],
    brandPrimary: paletteOptions.purple[600],
    brandSecondary: paletteOptions.blue[600],
    inverse: paletteOptions.neutralLight[0],
    error: paletteOptions.red[600],
    link: paletteOptions.blue[500],
    linkHover: paletteOptions.blue[400],
    linkActive: paletteOptions.blue[600],
    helper: paletteOptions.neutralLight[500],
    highlight: paletteOptions.purple[600],
    fail: paletteOptions.red[600],
    success: paletteOptions.green[700],

    //user system
    brand_primary2: paletteOptions.purple[500],
  },

  field: {
    '01': paletteOptions.neutralLight[0],
    hover01: paletteOptions.neutralLight[50],
  },

  status: {
    fail: paletteOptions.red[500],
    failHover: paletteOptions.red[100],
    severe: paletteOptions.red[500],
    severeHover: paletteOptions.red[400],
    severeLight: paletteOptions.red[100],
    critical: paletteOptions.orange[500],
    criticalHover: paletteOptions.orange[400],
    criticalLight: paletteOptions.orange[100],
    warning: paletteOptions.yellow[500],
    warningHover: paletteOptions.yellow[400],
    warningLight: paletteOptions.yellow[100],
    info: paletteOptions.green[500],
    infoHover: paletteOptions.green[400],
    infoLight: paletteOptions.green[100],
    success: paletteOptions.green[500],
    normal: paletteOptions.green[500],
    stop: paletteOptions.neutralDark[500],
    stopHover: paletteOptions.neutralDark[600],
    running: paletteOptions.blue[500],
    none: paletteOptions.neutralLight[50],
  },

  node: {
    info01: paletteOptions.green[500],
    info02: paletteOptions.green[600],
    info03: paletteOptions.green[700],
    info04: paletteOptions.green[900],

    warning01: paletteOptions.yellow[500],
    warning02: paletteOptions.yellow[600],
    warning03: paletteOptions.yellow[700],
    warning04: paletteOptions.yellow[900],

    critical01: paletteOptions.orange[500],
    critical02: paletteOptions.orange[600],
    critical03: paletteOptions.orange[700],
    critical04: paletteOptions.orange[900],

    severs01: paletteOptions.red[500],
    severs02: paletteOptions.red[600],
    severs03: paletteOptions.red[700],
    severs04: paletteOptions.red[900],

    shutdown01: paletteOptions.neutralDark[150],
    shutdown02: paletteOptions.neutralDark[100],
    shutdown03: paletteOptions.neutralDark[50],
    shutdown04: paletteOptions.neutralDark[25],

    hover: paletteOptions.purple[100],
    select: paletteOptions.purple[400],
  },
};

export default paletteConfig;
