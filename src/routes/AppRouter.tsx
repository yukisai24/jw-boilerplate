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
import { ELicenseStatus, ELicenseType, EUserRole } from '@/types/user';
import { autoRoutes, generateRoute } from '@/utils/routes';

import AuthenticateLayout from './AuthenticateLayout';
import { CryptoPage } from './lazyLoadComponoents';
import LicenseProtectedLayout from './LicenseProtectedLayout';
import {
  adminRoutes,
  authenticateRoutes,
  licenseRoutes,
  premiumRoutes,
  protectedRoutes,
  publicRoutes,
} from './routes';
import ScrollManager from './ScrollManager';
import UnifiedProtectedLayout from './UnifiedProtectedLayout';

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

            {/* 비로그인 사용자 전용 라우트 */}
            <Route element={<AuthenticateLayout />}>
              {generateRoute(authenticateRoutes)}
            </Route>

            {/* 로그인 필요 라우트 */}
            <Route element={<ProtectedLayout />}>
              {generateRoute(protectedRoutes)}
            </Route>

            {/* 기본 라이센스 라우트 (모든 활성 라이센스) */}
            <Route
              element={
                <UnifiedProtectedLayout
                  requiredRoles={[
                    EUserRole.USER,
                    EUserRole.MANAGER,
                    EUserRole.ADMIN,
                    EUserRole.SUPER_ADMIN,
                  ]}
                  requiredLicenseTypes={[
                    ELicenseType.FREE,
                    ELicenseType.BASIC,
                    ELicenseType.PREMIUM,
                    ELicenseType.ENTERPRISE,
                  ]}
                  requireBoth={true}
                />
              }
            >
              {generateRoute(licenseRoutes)}
            </Route>

            {/* 프리미엄 이상 라이센스 + 매니저 이상 권한 */}
            <Route
              element={
                <UnifiedProtectedLayout
                  requiredRoles={[
                    EUserRole.MANAGER,
                    EUserRole.ADMIN,
                    EUserRole.SUPER_ADMIN,
                  ]}
                  requiredLicenseTypes={[
                    ELicenseType.PREMIUM,
                    ELicenseType.ENTERPRISE,
                  ]}
                  requireBoth={true}
                />
              }
            >
              {generateRoute(premiumRoutes)}
            </Route>

            {/* 관리자 권한 (라이센스 불문) */}
            <Route
              element={
                <UnifiedProtectedLayout
                  requiredRoles={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
                  requireBoth={false} // 권한만 체크
                />
              }
            >
              {generateRoute(adminRoutes)}
            </Route>

            {/* 공개 라우트 */}
            {generateRoute(publicRoutes)}

            {/* 기존 특별 라우트 */}
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
