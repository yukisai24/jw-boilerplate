import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { ELicenseStatus, ELicenseType, EUserRole } from '@/types/user';
import { hasMinimumLicenseType, hasRole } from '@/utils/license';

interface IUnifiedProtectedLayout {
  // 권한 관련
  requiredRoles?: EUserRole[];

  // 라이센스 관련
  requiredLicenseTypes?: ELicenseType[];
  requiredLicenseStatus?: ELicenseStatus[];

  // 대체 경로
  unauthorizedPath?: string;
  licensePath?: string;

  // 조건 결합 방식
  requireBoth?: boolean; // true: 권한 AND 라이센스, false: 권한 OR 라이센스
}

const UnifiedProtectedLayout = ({
  requiredRoles = [],
  requiredLicenseTypes = [],
  requiredLicenseStatus = [ELicenseStatus.ACTIVE],
  unauthorizedPath = paths.pageNotFound,
  licensePath = paths.license.upgrade,
  requireBoth = true,
}: IUnifiedProtectedLayout) => {
  const { currentUser, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 인증 체크
    if (!authenticated) {
      navigate(paths.auth.logIn, { replace: true });
      return;
    }

    const license = currentUser?.license;

    // 2. 권한 체크
    const hasRequiredRole =
      requiredRoles.length === 0 || hasRole(requiredRoles, currentUser);

    // 3. 라이센스 체크
    let hasRequiredLicense = true;

    if (requiredLicenseTypes.length > 0) {
      hasRequiredLicense = false;

      // 라이센스 존재 및 상태 체크
      if (license && requiredLicenseStatus.includes(license.status)) {
        // 라이센스 타입 체크
        for (const requiredType of requiredLicenseTypes) {
          if (hasMinimumLicenseType(requiredType, license)) {
            hasRequiredLicense = true;
            break;
          }
        }
      }
    }

    // 4. 접근 권한 결정
    let hasAccess = false;

    if (requireBoth) {
      // AND 조건: 권한과 라이센스 모두 필요
      hasAccess = hasRequiredRole && hasRequiredLicense;
    } else {
      // OR 조건: 권한 또는 라이센스 중 하나만 필요
      hasAccess = hasRequiredRole || hasRequiredLicense;
    }

    // 5. 접근 거부 시 리다이렉트
    if (!hasAccess) {
      if (!hasRequiredRole) {
        navigate(unauthorizedPath, { replace: true });
      } else if (!hasRequiredLicense) {
        navigate(licensePath, { replace: true });
      }
      return;
    }
  }, [
    authenticated,
    currentUser,
    navigate,
    requiredRoles,
    requiredLicenseTypes,
    requiredLicenseStatus,
    unauthorizedPath,
    licensePath,
    requireBoth,
  ]);

  return <Outlet />;
};

export default UnifiedProtectedLayout;
