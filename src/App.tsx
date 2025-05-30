import { ErrorBoundary } from 'react-error-boundary';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider, ToastPopupProvider } from '@tmax/tds';

import theme from '@/theme/index';

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
        <ThemeProvider theme={theme}>
          <ToastPopupProvider>
            <ErrorBoundary fallbackRender={ErrorFallback}>
              <CryptoPage />
            </ErrorBoundary>
          </ToastPopupProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
