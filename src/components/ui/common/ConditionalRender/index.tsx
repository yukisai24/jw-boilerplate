import { Typography } from '@mui/material';

import { isDevMode } from '@/utils/env';

export const ConditionalRender = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  return condition ? <>{children}</> : null;
};

export const DevRender = ({
  children,
  isDev = true,
}: {
  children: React.ReactNode;
  isDev?: boolean;
}) => {
  const isVisible = isDev ? isDevMode : !isDevMode;

  if (!isVisible) return null;

  return (
    <div className="border border-gray-800 text-sm p-4 mt-6 mb-6 rounded-lg">
      <Typography variant="h6">🔧 Dev Render</Typography>
      {children}
    </div>
  );
};
