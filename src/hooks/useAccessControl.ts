import { useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { ELicenseStatus, ELicenseType, EUserRole } from '@/types/user';
import { hasMinimumLicenseType, hasRole } from '@/utils/license';

interface IAccessControlOptions {
  // 권한 관련
  requiredRoles?: EUserRole[];

  // 라이센스 관련
  requiredLicenseTypes?: ELicenseType[];
  requiredLicenseStatus?: ELicenseStatus[];

  // 조건 결합 방식
  requireBoth?: boolean; // true: 권한 AND 라이센스, false: 권한 OR 라이센스
}

/**
 * 사용자의 권한과 라이센스를 동시에 체크하는 Hook
 */
export const useAccessControl = ({
  requiredRoles = [],
  requiredLicenseTypes = [],
  requiredLicenseStatus = [ELicenseStatus.ACTIVE],
  requireBoth = true,
}: IAccessControlOptions = {}) => {
  const { currentUser, authenticated } = useAuth();

  const accessInfo = useMemo(() => {
    // 인증되지 않은 사용자
    if (!authenticated) {
      return {
        hasAccess: false,
        hasRole: false,
        hasLicense: false,
        isAuthenticated: false,
        reason: 'not_authenticated',
        message: '로그인이 필요합니다.',
      };
    }

    const license = currentUser?.license;

    // 권한 체크
    const hasRequiredRole =
      requiredRoles.length === 0 || hasRole(requiredRoles, currentUser);

    // 라이센스 체크
    let hasRequiredLicense = true;

    if (requiredLicenseTypes.length > 0) {
      hasRequiredLicense = false;

      if (license && requiredLicenseStatus.includes(license.status)) {
        for (const requiredType of requiredLicenseTypes) {
          if (hasMinimumLicenseType(requiredType, license)) {
            hasRequiredLicense = true;
            break;
          }
        }
      }
    }

    // 접근 권한 결정
    let hasAccess = false;
    let reason = '';
    let message = '';

    if (requireBoth) {
      // AND 조건
      hasAccess = hasRequiredRole && hasRequiredLicense;

      if (!hasRequiredRole && !hasRequiredLicense) {
        reason = 'insufficient_role_and_license';
        message = '권한과 라이센스가 모두 부족합니다.';
      } else if (!hasRequiredRole) {
        reason = 'insufficient_role';
        message = '접근 권한이 부족합니다.';
      } else if (!hasRequiredLicense) {
        reason = 'insufficient_license';
        message = '라이센스 업그레이드가 필요합니다.';
      }
    } else {
      // OR 조건
      hasAccess = hasRequiredRole || hasRequiredLicense;

      if (!hasAccess) {
        reason = 'insufficient_role_or_license';
        message = '권한 또는 라이센스가 필요합니다.';
      }
    }

    return {
      hasAccess,
      hasRole: hasRequiredRole,
      hasLicense: hasRequiredLicense,
      isAuthenticated: true,
      reason: hasAccess ? 'granted' : reason,
      message: hasAccess ? '' : message,

      // 상세 정보
      currentRole: currentUser?.role || null,
      currentLicenseType: license?.type || null,
      currentLicenseStatus: license?.status || null,
      requiredRoles,
      requiredLicenseTypes,
      requireBoth,
    };
  }, [
    authenticated,
    currentUser,
    requiredRoles,
    requiredLicenseTypes,
    requiredLicenseStatus,
    requireBoth,
  ]);

  return accessInfo;
};

/**
 * 특정 기능에 대한 접근 권한을 체크하는 Hook
 */
export const useFeatureAccess = (
  feature: string,
  options: IAccessControlOptions = {},
) => {
  const baseAccess = useAccessControl(options);
  const { currentUser } = useAuth();

  const featureAccess = useMemo(() => {
    // 기본 접근 권한이 없으면 기능 사용 불가
    if (!baseAccess.hasAccess) {
      return {
        ...baseAccess,
        feature,
        hasFeatureAccess: false,
        featureMessage: baseAccess.message,
      };
    }

    // 라이센스 기능 체크
    const license = currentUser?.license;
    const hasFeature = license?.features.includes(feature) || false;

    return {
      ...baseAccess,
      feature,
      hasFeatureAccess: hasFeature,
      featureMessage: hasFeature
        ? ''
        : `'${feature}' 기능을 사용하려면 라이센스 업그레이드가 필요합니다.`,
    };
  }, [baseAccess, feature, currentUser]);

  return featureAccess;
};

/**
 * 여러 권한/라이센스 조건을 동시에 체크하는 Hook
 */
export const useMultiAccessControl = (conditions: IAccessControlOptions[]) => {
  const { currentUser, authenticated } = useAuth();

  const multiAccess = useMemo(() => {
    // Hook 규칙 위반을 피하기 위해 로직을 직접 구현
    const results = conditions.map((condition, index) => {
      const {
        requiredRoles = [],
        requiredLicenseTypes = [],
        requiredLicenseStatus = [ELicenseStatus.ACTIVE],
        requireBoth = true,
      } = condition;

      // 인증되지 않은 사용자
      if (!authenticated) {
        return {
          index,
          condition,
          hasAccess: false,
          hasRole: false,
          hasLicense: false,
          isAuthenticated: false,
          reason: 'not_authenticated',
          message: '로그인이 필요합니다.',
        };
      }

      const license = currentUser?.license;

      // 권한 체크
      const hasRequiredRole =
        requiredRoles.length === 0 || hasRole(requiredRoles, currentUser);

      // 라이센스 체크
      let hasRequiredLicense = true;

      if (requiredLicenseTypes.length > 0) {
        hasRequiredLicense = false;

        if (license && requiredLicenseStatus.includes(license.status)) {
          for (const requiredType of requiredLicenseTypes) {
            if (hasMinimumLicenseType(requiredType, license)) {
              hasRequiredLicense = true;
              break;
            }
          }
        }
      }

      // 접근 권한 결정
      let hasAccess = false;
      let reason = '';
      let message = '';

      if (requireBoth) {
        hasAccess = hasRequiredRole && hasRequiredLicense;

        if (!hasRequiredRole && !hasRequiredLicense) {
          reason = 'insufficient_role_and_license';
          message = '권한과 라이센스가 모두 부족합니다.';
        } else if (!hasRequiredRole) {
          reason = 'insufficient_role';
          message = '접근 권한이 부족합니다.';
        } else if (!hasRequiredLicense) {
          reason = 'insufficient_license';
          message = '라이센스 업그레이드가 필요합니다.';
        }
      } else {
        hasAccess = hasRequiredRole || hasRequiredLicense;

        if (!hasAccess) {
          reason = 'insufficient_role_or_license';
          message = '권한 또는 라이센스가 필요합니다.';
        }
      }

      return {
        index,
        condition,
        hasAccess,
        hasRole: hasRequiredRole,
        hasLicense: hasRequiredLicense,
        isAuthenticated: true,
        reason: hasAccess ? 'granted' : reason,
        message: hasAccess ? '' : message,
        currentRole: currentUser?.role || null,
        currentLicenseType: license?.type || null,
        currentLicenseStatus: license?.status || null,
        requiredRoles,
        requiredLicenseTypes,
        requireBoth,
      };
    });

    const hasAnyAccess = results.some((result) => result.hasAccess);
    const hasAllAccess = results.every((result) => result.hasAccess);

    return {
      results,
      hasAnyAccess,
      hasAllAccess,
      grantedConditions: results.filter((result) => result.hasAccess),
      deniedConditions: results.filter((result) => !result.hasAccess),
    };
  }, [conditions, currentUser, authenticated]);

  return multiAccess;
};
