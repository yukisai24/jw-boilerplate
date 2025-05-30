import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Button } from '@tmax/tds';

import { ErrorBoundaryWrapper } from '@/pages/error-boundary/styled';

const ErrorFallback = () => {
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
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
        }}
      >
        Something went wrong
      </Typography>
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
        Or you will be automatic refresh in {currentDate > 0 ? currentDate : 0}{' '}
        second
      </Typography>
    </ErrorBoundaryWrapper>
  );
};

export default ErrorFallback;
