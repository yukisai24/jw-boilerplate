import { useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { ELicenseStatus, ELicenseType } from '@/types/user';
import {
  getLicenseStatusMessage,
  getRemainingDays,
  getUserAvailableFeatures,
  hasFeatureAccess,
  hasMinimumLicenseType,
  isLicenseActive,
  isLicenseExpired,
  needsUpgrade,
} from '@/utils/license';

export const useLicense = () => {
  const { currentUser } = useAuth();
  const license = currentUser?.license;

  const licenseInfo = useMemo(() => {
    return {
      // 기본 정보
      license,
      hasLicense: !!license,
      isActive: isLicenseActive(license),
      isExpired: isLicenseExpired(license),

      // 상태 정보
      status: license?.status || null,
      type: license?.type || null,
      statusMessage: getLicenseStatusMessage(license),
      remainingDays: getRemainingDays(license),

      // 접근 가능한 기능
      availableFeatures: getUserAvailableFeatures(currentUser),

      // 라이센스 타입 체크
      isFree: license?.type === ELicenseType.FREE,
      isBasic: license?.type === ELicenseType.BASIC,
      isPremium: license?.type === ELicenseType.PREMIUM,
      isEnterprise: license?.type === ELicenseType.ENTERPRISE,

      // 라이센스 상태 체크
      isTrial: license?.status === ELicenseStatus.TRIAL,
      isSuspended: license?.status === ELicenseStatus.SUSPENDED,

      // 헬퍼 함수들
      hasMinimumType: (requiredType: ELicenseType) =>
        hasMinimumLicenseType(requiredType, license),

      hasFeature: (feature: string) => hasFeatureAccess(feature, license),

      needsUpgradeFor: (requiredType: ELicenseType) =>
        needsUpgrade(requiredType, currentUser),

      // 만료 관련
      isExpiringSoon: (days: number = 7) => {
        const remaining = getRemainingDays(license);
        return remaining > 0 && remaining <= days;
      },
    };
  }, [license, currentUser]);

  return licenseInfo;
};

// 특정 라이센스 타입이 필요한 컴포넌트에서 사용하는 Hook
export const useRequireLicense = (
  requiredType: ELicenseType,
  requiredStatus: ELicenseStatus[] = [ELicenseStatus.ACTIVE],
) => {
  const { currentUser } = useAuth();
  const license = currentUser?.license;

  const accessInfo = useMemo(() => {
    const hasAccess =
      license &&
      requiredStatus.includes(license.status) &&
      hasMinimumLicenseType(requiredType, license);

    return {
      hasAccess: !!hasAccess,
      needsUpgrade: needsUpgrade(requiredType, currentUser),
      currentType: license?.type || null,
      requiredType,
      statusMessage: !hasAccess ? getLicenseStatusMessage(license) : null,
    };
  }, [license, requiredType, requiredStatus, currentUser]);

  return accessInfo;
};

// 특정 기능이 필요한 컴포넌트에서 사용하는 Hook
export const useRequireFeature = (feature: string) => {
  const { currentUser } = useAuth();
  const license = currentUser?.license;

  const featureInfo = useMemo(() => {
    const hasAccess = hasFeatureAccess(feature, license);
    const availableFeatures = getUserAvailableFeatures(currentUser);

    return {
      hasAccess,
      feature,
      availableFeatures,
      licenseType: license?.type || null,
      statusMessage: !hasAccess
        ? '이 기능을 사용하려면 라이센스 업그레이드가 필요합니다.'
        : null,
    };
  }, [feature, license, currentUser]);

  return featureInfo;
};
