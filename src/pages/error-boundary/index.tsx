import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { Button } from '@tmax/tds';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ConditionalRender,
  DevRender,
} from '@/components/ui/common/ConditionalRender';
import { PageTransition } from '@/components/ui/common/PageTransition';
import { Spacer } from '@/components/ui/common/Spacer';

import { ErrorBoundaryWrapper } from '@/pages/error-boundary/styled';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (currentDate === 0) {
    window.location.reload();
  }

  return (
    <PageTransition>
      <ErrorBoundaryWrapper>
        <Typography variant="h6">{t('error.generic')}</Typography>
        <Typography>Please click the refresh button</Typography>
        <Spacer y={'md'} />
        <Box>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </Button>
        </Box>
        <Spacer y={'md'} />
        <Typography>
          Or you will be automatic refresh in{' '}
          {currentDate > 0 ? currentDate : 0} second
        </Typography>

        <DevRender>
          <Spacer y={'md'} />
          <div className="bg-red-100 border border-red-300 text-left text-sm text-red-800 p-4 mb-6 rounded-lg overflow-auto">
            <pre>{error.message}</pre>
            <pre className="whitespace-pre-wrap">{error.stack}</pre>
          </div>
          <Button onClick={resetErrorBoundary}>다시 시도</Button>
        </DevRender>
      </ErrorBoundaryWrapper>
    </PageTransition>
  );
};

export default ErrorFallback;
