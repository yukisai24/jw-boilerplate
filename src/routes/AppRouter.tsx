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

import AuthenticateLayout from './AuthenticateLayout';
import { CryptoPage } from './lazyLoadComponoents';
import { authenticateRoutes, protectedRoutes, publicRoutes } from './routes';
import ScrollManager from './ScrollManager';

const AppRoutes = () => {
  return (
    <Router>
      <ErrorBoundary fallbackRender={(props) => <ErrorFallback {...props} />}>
        <Routes>
          <Route element={<ScrollManager />}>
            <Route
              path="/"
              element={<Navigate to={paths.index} />}
            />

            <Route element={<AuthenticateLayout />}>
              {generateRoute(authenticateRoutes)}
            </Route>

            <Route element={<ProtectedLayout />}>
              {generateRoute(protectedRoutes)}
            </Route>

            {generateRoute(publicRoutes)}

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
