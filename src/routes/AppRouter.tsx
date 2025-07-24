import { ErrorBoundary } from 'react-error-boundary';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import ErrorFallback from '@/pages/error-boundary';
import PageNotFound from '@/pages/pageNotFound';

import { paths } from '@/routes/paths';
import { generateRoute } from '@/utils/routes';

import { CryptoPage } from './lazyLoadComponoents';
import { unifiedRoutes } from './routes';
import ScrollManager from './ScrollManager';
import SmartLayout from './SmartLayout';

const AppRoutes = () => {
  return (
    <Router>
      <ErrorBoundary fallbackRender={(props) => <ErrorFallback {...props} />}>
        <Routes>
          <Route element={<ScrollManager />}>
            {/* 루트 경로 리다이렉트 */}
            <Route
              path="/"
              element={<Navigate to={paths.index} />}
            />

            {/* 통합된 스마트 라우트 (권한에 따라 자동 제어) */}
            <Route element={<SmartLayout />}>
              {generateRoute(unifiedRoutes)}
            </Route>

            {/* 기존 특별 라우트 (하위 호환성) */}
            <Route
              path={'/cr'}
              element={<CryptoPage />}
            />

            {/* 404 페이지 */}
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
