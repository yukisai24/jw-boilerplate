import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import CryptoPage from './CryptoPage';
import ETest from './ETest';
import LoginForm from './LoginForm';
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
    <QueryClientProvider client={queryClient}>
      {/* <TestPage /> */}
      {/* <ETest /> */}
      {/* <LoginForm /> */}
      <CryptoPage />
    </QueryClientProvider>
  );
}

export default App;
