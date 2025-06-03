import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { Button } from '@tmax/tds';
import { AnimatePresence, motion } from 'framer-motion';

import { PageTransition } from '@/components/ui/common/PageTransition';

import { ErrorBoundaryWrapper } from '@/pages/error-boundary/styled';

import { isDevMode } from '@/utils/env';

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
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
    <ErrorBoundaryWrapper>
      <PageTransition>
        <Typography variant="h6">Something went wrong</Typography>
        <Typography
          sx={{
            marginBottom: 2,
          }}
        >
          Please click the refresh button
        </Typography>
        <Box marginBottom={2}>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </Button>
        </Box>
        <Typography>
          Or you will be automatic refresh in{' '}
          {currentDate > 0 ? currentDate : 0} second
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
          }}
        >
          Something went wrong
        </Typography>
        <p className="text-gray-700 text-lg mb-6">
          문제가 발생했습니다. 다시 시도해주세요.
        </p>
        {/* {isDevMode && (
          <div className="bg-red-100 border border-red-300 text-left text-sm text-red-800 p-4 mb-6 max-w-xl w-full rounded-lg overflow-auto">
            <pre>{error.message}</pre>
            <pre className="whitespace-pre-wrap">{error.stack}</pre>
          </div>
        )} */}
        <div className="flex gap-4">
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            다시 시도
          </button>
        </div>
      </PageTransition>
    </ErrorBoundaryWrapper>
  );
};

export default ErrorFallback;
