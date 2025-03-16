import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <TestPage />
    </QueryClientProvider>
  );
}

export default App;
