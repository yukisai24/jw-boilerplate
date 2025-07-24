import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { EUserRole } from '@/types/user';
import {
  hasFeatureAccess,
  hasMinimumLicenseType,
  hasRole,
} from '@/utils/license';

import { unifiedRoutes } from '../routes';

const SmartLayout = () => {
  const { currentUser, authenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRouteAccess = () => {
      setIsLoading(true);

      const currentPath = location.pathname;

      // 현재 경로에 해당하는 라우트 찾기
      const currentRoute = unifiedRoutes.find((route) => {
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

      // 라우트가 없거나 공개 라우트인 경우
      if (!currentRoute || currentRoute.category === 'public') {
        setHasAccess(true);
        setIsLoading(false);
        return;
      }

      // 인증이 필요한 라우트인데 인증되지 않은 경우
      if (currentRoute.requireAuth && !authenticated) {
        if (currentRoute.category === 'auth') {
          // 인증 페이지는 비인증 사용자도 접근 가능
          setHasAccess(true);
        } else {
          // 로그인 페이지로 리다이렉트
          navigate('/login', {
            replace: true,
            state: { redirectTo: currentPath },
          });
          return;
        }
      }

      // 인증된 사용자가 인증 페이지에 접근하는 경우
      if (authenticated && currentRoute.category === 'auth') {
        navigate('/', { replace: true });
        return;
      }

      // 권한 체크
      let canAccess = true;

      if (currentRoute.requiredRoles && currentRoute.requiredRoles.length > 0) {
        canAccess = hasRole(currentRoute.requiredRoles, currentUser);
      }

      // 라이센스 체크
      if (
        canAccess &&
        currentRoute.requiredLicenses &&
        currentRoute.requiredLicenses.length > 0
      ) {
        const hasLicense = currentRoute.requiredLicenses.some((license) =>
          hasMinimumLicenseType(license, currentUser?.license),
        );

        if (currentRoute.requireBoth) {
          // AND 조건: 권한과 라이센스 모두 필요
          canAccess = canAccess && hasLicense;
        } else {
          // OR 조건: 권한 또는 라이센스 중 하나만 필요
          canAccess = canAccess || hasLicense;
        }
      }

      // 기능 체크
      if (
        canAccess &&
        currentRoute.requiredFeatures &&
        currentRoute.requiredFeatures.length > 0
      ) {
        const hasFeatures = currentRoute.requiredFeatures.every((feature) =>
          hasFeatureAccess(feature, currentUser?.license),
        );

        if (currentRoute.requireBoth) {
          canAccess = canAccess && hasFeatures;
        } else {
          canAccess = canAccess || hasFeatures;
        }
      }

      if (!canAccess) {
        // 권한 없음 페이지로 리다이렉트
        navigate('/unauthorized', {
          replace: true,
          state: {
            attemptedPath: currentPath,
            routeTitle: currentRoute.title,
          },
        });
        return;
      }

      setHasAccess(true);
      setIsLoading(false);
    };

    checkRouteAccess();
  }, [authenticated, currentUser, location.pathname, navigate]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">권한을 확인하는 중...</p>
        </div>
      </div>
    );
  }

  // 접근 권한이 없는 경우 (이미 리다이렉트 처리됨)
  if (!hasAccess) {
    return null;
  }

  return <Outlet />;
};

export default SmartLayout;
