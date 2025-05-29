import { CSSProperties } from 'react';

import { TypographyVariantsOptions } from '@mui/material/styles';

type normalTypo =
  | 'headline'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5'
  | 'body6'
  | 'helper'
  | 'link1'
  | 'link2'
  | 'chart1'
  | 'chart2'
  | 'chart3'
  | 'chart4'
  | 'chart5'
  | 'chart6';

type serviceTypo = 'title1' | 'title2' | 'body0' | 'body1' | 'body2' | 'body3' | 'bodyB' | 'body1v2';

type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions
    extends PartialRecord<`normal_${normalTypo}` | `service_${serviceTypo}`, CSSProperties> {}

  interface TypographyVariants
    extends PartialRecord<`normal_${normalTypo}` | `service_${serviceTypo}`, CSSProperties> {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides
    extends PartialRecord<`normal_${normalTypo}` | `service_${serviceTypo}`, true> {}
}

const fontWeightValue = {
  Bold: 700,
  Medium: 500,
  Regular: 400,
  DemiLight: 350,
};

export const customTypographyVariants: TypographyVariantsOptions = {
  normal_headline: {
    fontSize: '18px',
    fontWeight: fontWeightValue.Bold,
    lineHeight: '24px',
    letterSpacing: '-0.004em',
  },
  normal_helper: {
    fontSize: '12px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '16px',
    letterSpacing: '-0.002em',
  },

  normal_body1: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
  },
  normal_body2: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '20px',
    letterSpacing: '-0.01em',
  },
  normal_body3: {
    fontSize: '15px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '24px',
    letterSpacing: '-0.004em',
  },
  normal_body4: {
    fontSize: '14px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
  },
  normal_body5: {
    fontSize: '14px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
  },
  normal_body6: {
    fontSize: '15px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '24px',
    letterSpacing: '-0.002em',
  },

  normal_chart1: {
    fontSize: '40px',
    fontWeight: fontWeightValue.DemiLight,
    lineHeight: '60px',
    letterSpacing: '-0.002em',
  },
  normal_chart2: {
    fontSize: '24px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '36px',
    letterSpacing: '-0.002em',
  },
  normal_chart3: {
    fontSize: '24px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '36px',
    letterSpacing: '-0.002em',
  },
  normal_chart4: {
    fontSize: '36px',
    fontWeight: fontWeightValue.DemiLight,
    lineHeight: '54px',
    letterSpacing: '-0.002em',
  },
  normal_chart5: {
    fontSize: '18px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '28px',
    letterSpacing: '-0.002em',
  },
  normal_chart6: {
    fontSize: '18px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '28px',
    letterSpacing: '-0.002em',
  },

  normal_link1: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
    textDecoration: 'underline',
  },
  normal_link2: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
    textDecoration: 'underline',
  },

  normal_label1: {
    fontSize: '11px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '14px',
    letterSpacing: '-0.002em',
  },
  normal_label2: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
  },
  normal_label3: {
    fontSize: '12px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '14px',
    letterSpacing: '-0.002em',
  },
  normal_title1: {
    fontSize: '11px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '16px',
    letterSpacing: '-0.002em',
  },
  normal_title2: {
    fontSize: '13px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '20px',
    letterSpacing: '-0.002em',
  },
  normal_title3: {
    fontSize: '15px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '24px',
    letterSpacing: '-0.004em',
  },
  normal_title4: {
    fontSize: '16px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '24px',
    letterSpacing: '-0.004em',
  },

  service_title1: {
    fontSize: '24px',
    fontWeight: fontWeightValue.Bold,
    letterSpacing: '-0.02em',
    lineHeight: '36px',
  },
  service_title2: {
    fontSize: '36px',
    fontWeight: fontWeightValue.Bold,
    letterSpacing: '-0.02em',
    lineHeight: '53px',
  },

  service_body0: {
    fontSize: '14px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
  },
  service_body1: {
    fontSize: '16px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
  },

  service_body1v2: {
    fontSize: '16px',
    fontWeight: fontWeightValue.Regular,
    lineHeight: '40px',
    letterSpacing: '-0.02em',
  },

  service_body2: {
    fontSize: '18px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '27px',
    letterSpacing: '-0.02em',
  },
  service_body3: {
    fontSize: '20px',
    fontWeight: fontWeightValue.Medium,
    lineHeight: '30px',
    letterSpacing: '-0.01em',
  },

  service_bodyB: {
    fontSize: '16px',
    fontWeight: fontWeightValue.Bold,
    lineHeight: '20px',
    letterSpacing: '-0.02em',
  },
};
