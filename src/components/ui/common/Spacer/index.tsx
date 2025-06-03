import React from 'react';

import clsx from 'clsx';

const spacing = {
  none: '0',
  xs: '1',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',
} as const;

type SpacingSize = keyof typeof spacing | number;

type SpacerProps = {
  x?: SpacingSize;
  y?: SpacingSize;
};

const resolveSpacing = (value?: SpacingSize, axis: 'x' | 'y' = 'y') => {
  if (value === undefined) return '';
  const classValue =
    typeof value === 'string' && spacing[value]
      ? spacing[value]
      : String(value);

  return axis === 'x' ? `w-${classValue}` : `h-${classValue}`;
};

export const Spacer: React.FC<SpacerProps> = ({ x, y }) => {
  const className = clsx(resolveSpacing(x, 'x'), resolveSpacing(y, 'y'));
  return <div className={className} />;
};
