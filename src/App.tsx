import { ErrorBoundary } from 'react-error-boundary';

import { StyledEngineProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, ToastPopupProvider } from '@tmax/tds';

import theme from '@/theme/index';

import { TIME_FORMAT } from './constants/dateTime';
import CryptoPage from './CryptoPage';
import ETest from './ETest';
import LoginForm from './LoginForm';
import ErrorFallback from './pages/error-boundary';
import TestPage from './TestPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={{
              keyboardDate: 'YYYY/MM/DD',
              fullTime: TIME_FORMAT,
              fullTime12h: TIME_FORMAT,
              keyboardDateTime: 'YYYY/MM/DD HH:MM',
              keyboardDateTime12h: 'YYYY/MM/DD HH:MM',
            }}
          >
            <ThemeProvider theme={theme}>
              <ToastPopupProvider>
                <ErrorBoundary
                  fallbackRender={({ error, resetErrorBoundary }) => (
                    <ErrorFallback />
                  )}
                >
                  <CryptoPage />
                </ErrorBoundary>
              </ToastPopupProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
