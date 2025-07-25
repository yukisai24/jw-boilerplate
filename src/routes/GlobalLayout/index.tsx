import { memo, useCallback, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { MainLayoutContainer } from '@/styled/layout';
import { EUserRole } from '@/types/user';
import {
  hasFeatureAccess,
  hasMinimumLicenseType,
  hasRole,
} from '@/utils/license';

import { unifiedRoutes } from '../routes';
import ScrollToTop from '../scrollToTop';
import MainNavBar from './MainNavBar';

interface IGlobalLayoutProps {
  // 하위 호환성을 위해 유지, 하지만 라우트 메타데이터가 우선
  acceptedRole?: EUserRole[];
  requireAuth?: boolean;
}

const GlobalLayout = memo(
  ({ acceptedRole, requireAuth }: IGlobalLayoutProps) => {
    const { currentUser, authenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에 해당하는 라우트 메타데이터 찾기
    const currentRoute = useMemo(() => {
      const currentPath = location.pathname;
      return unifiedRoutes.find((route) => {
        // 정확한 경로 매칭 또는 하위 경로 매칭
        return (
          route.path === currentPath ||
          (route.path !== '/' && currentPath.startsWith(route.path + '/')) ||
          (route.child &&
            route.child.some(
              (child) =>
                child.path && route.path + '/' + child.path === currentPath,
            ))
        );
      });
    }, [location.pathname]);

    // 통합 권한 검사 로직
    const authStatus = useMemo(() => {
      // 라우트 메타데이터 우선, props는 fallback
      const routeRequireAuth =
        currentRoute?.requireAuth ?? requireAuth ?? false;
      const routeRequiredRoles = currentRoute?.requiredRoles ?? acceptedRole;

      // 공개 라우트는 항상 접근 허용
      if (currentRoute?.category === 'public') {
        return { hasAccess: true, redirectTo: null };
      }

      // 1. 인증 체크
      if (routeRequireAuth && !authenticated) {
        // 인증 페이지는 비인증 사용자도 접근 가능
        if (currentRoute?.category === 'auth') {
          return { hasAccess: true, redirectTo: null };
        }
        return { hasAccess: false, redirectTo: paths.auth.logIn };
      }

      // 인증된 사용자가 인증 페이지에 접근하는 경우 홈으로 리다이렉트
      if (authenticated && currentRoute?.category === 'auth') {
        return { hasAccess: false, redirectTo: paths.index };
      }

      // 2. 권한 체크
      let hasRequiredRole = true;
      if (
        routeRequiredRoles &&
        routeRequiredRoles.length > 0 &&
        authenticated
      ) {
        hasRequiredRole = hasRole(routeRequiredRoles, currentUser);
      }

      // 3. 라이센스 체크
      let hasRequiredLicense = true;
      if (
        currentRoute?.requiredLicenses &&
        currentRoute.requiredLicenses.length > 0 &&
        authenticated
      ) {
        hasRequiredLicense = currentRoute.requiredLicenses.some((license) =>
          hasMinimumLicenseType(license, currentUser?.license),
        );
      }

      // 4. 기능 체크
      let hasRequiredFeatures = true;
      if (
        currentRoute?.requiredFeatures &&
        currentRoute.requiredFeatures.length > 0 &&
        authenticated
      ) {
        hasRequiredFeatures = currentRoute.requiredFeatures.every((feature) =>
          hasFeatureAccess(feature, currentUser?.license),
        );
      }

      // 5. 접근 권한 결정
      let hasAccess = true;
      let redirectTo = null;

      if (currentRoute?.requireBoth) {
        // AND 조건: 권한과 라이센스 모두 필요
        hasAccess =
          hasRequiredRole && hasRequiredLicense && hasRequiredFeatures;
      } else {
        // OR 조건 또는 기본: 권한이 있거나 라이센스가 있으면 접근 허용
        // 단, 권한이 명시적으로 필요한 경우 권한 체크 우선
        if (routeRequiredRoles && routeRequiredRoles.length > 0) {
          hasAccess =
            hasRequiredRole && hasRequiredLicense && hasRequiredFeatures;
        } else {
          hasAccess = hasRequiredLicense && hasRequiredFeatures;
        }
      }

      // 접근 거부 시 적절한 리다이렉트 결정
      if (!hasAccess) {
        if (!hasRequiredRole) {
          redirectTo = paths.pageNotFound;
        } else if (!hasRequiredLicense) {
          redirectTo = paths.license.upgrade;
        } else if (!hasRequiredFeatures) {
          redirectTo = paths.license.upgrade;
        } else {
          redirectTo = paths.pageNotFound;
        }
      }

      return { hasAccess, redirectTo };
    }, [currentRoute, requireAuth, acceptedRole, authenticated, currentUser]);

    // 리다이렉트를 useEffect로 처리하여 렌더링 중 side effect 방지
    useEffect(() => {
      if (!authStatus.hasAccess && authStatus.redirectTo) {
        navigate(authStatus.redirectTo, { replace: true });
      }
    }, [authStatus.hasAccess, authStatus.redirectTo, navigate]);

    // 컨테이너 클릭 핸들러 최적화
    const handleContainerClick = useCallback(() => {
      // 현재는 빈 함수이지만, 필요시 검색박스 닫기 등의 로직 추가 가능
    }, []);

    // 접근 권한이 없는 경우 null 반환 (리다이렉트 처리 중)
    if (!authStatus.hasAccess) {
      return null;
    }

    return (
      <ScrollToTop>
        <MainNavBar />
        <MainLayoutContainer
          bgcolor={({ palette }) => palette.neutralLight[25]}
          onClick={handleContainerClick}
        >
          <Stack
            width="100%"
            direction="column"
            alignItems="center"
            component="main"
            role="main"
          >
            <Outlet />
          </Stack>
        </MainLayoutContainer>
      </ScrollToTop>
    );
  },
);

GlobalLayout.displayName = 'GlobalLayout';

export default GlobalLayout;
