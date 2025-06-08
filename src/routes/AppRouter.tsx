import { ErrorBoundary } from 'react-error-boundary';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ErrorFallback from '@/pages/error-boundary';
import PageNotFound from '@/pages/pageNotFound';

// import AuthenticateLayout from '@/routes/guards/AuthenticateLayout';
import { paths } from '@/routes/paths';
import ProtectedLayout from '@/routes/ProtectedLayout';
import { autoRoutes, generateRoute } from '@/utils/routes';

import { CryptoPage } from './lazyLoadComponoents';
import ScrollManager from './ScrollManager';

const AppRoutes = () => {
  console.log(autoRoutes);
  return (
    <Router>
      <ErrorBoundary fallbackRender={(props) => <ErrorFallback {...props} />}>
        <Routes>
          <Route element={<ScrollManager />}>
            <Route
              path="/"
              element={<Navigate to={paths.index} />}
            />
            {/* <Route element={<ProtectedLayout />}>
            {generateRoute(ProtectedRoutes)}
            </Route> */}
            {/* {generateRoute(publicRoutes)} */}
            <Route
              path={'/cr'}
              element={<CryptoPage />}
            />
            <Route
              path={'*'}
              element={<PageNotFound />}
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRoutes;
