import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider, ToastPopupProvider } from '@tmax/tds';

import theme from '@/theme/index';

import '@/languages/i18n';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastPopupProvider>
          <App />
        </ToastPopupProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
