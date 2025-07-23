import {
  ELicenseStatus,
  ELicenseType,
  EUserRole,
  ICurrentUser,
  ILicense,
} from '@/types/user';

/**
 * 라이센스가 활성 상태인지 확인
 */
export const isLicenseActive = (license?: ILicense): boolean => {
  if (!license) return false;
  return license.status === ELicenseStatus.ACTIVE;
};

/**
 * 라이센스가 만료되었는지 확인
 */
export const isLicenseExpired = (license?: ILicense): boolean => {
  if (!license) return true;

  if (license.status === ELicenseStatus.EXPIRED) return true;

  const now = new Date();
  const endDate = new Date(license.endDate);
  return now > endDate;
};

/**
 * 특정 라이센스 타입 이상인지 확인
 */
export const hasMinimumLicenseType = (
  requiredType: ELicenseType,
  license?: ILicense,
): boolean => {
  if (!license || !isLicenseActive(license)) return false;

  const licenseHierarchy = [
    ELicenseType.FREE,
    ELicenseType.BASIC,
    ELicenseType.PREMIUM,
    ELicenseType.ENTERPRISE,
  ];

  const currentLevel = licenseHierarchy.indexOf(license.type);
  const requiredLevel = licenseHierarchy.indexOf(requiredType);

  return currentLevel >= requiredLevel;
};

/**
 * 특정 기능에 접근 가능한지 확인
 */
export const hasFeatureAccess = (
  feature: string,
  license?: ILicense,
): boolean => {
  if (!license || !isLicenseActive(license)) return false;
  return license.features.includes(feature);
};

/**
 * 사용자가 특정 권한을 가지고 있는지 확인
 */
export const hasRole = (
  requiredRoles: EUserRole[],
  user?: ICurrentUser,
): boolean => {
  if (!user) return false;
  return requiredRoles.includes(user.role);
};

/**
 * 관리자 권한인지 확인
 */
export const isAdmin = (user?: ICurrentUser): boolean => {
  return hasRole([EUserRole.ADMIN, EUserRole.SUPER_ADMIN], user);
};

/**
 * 매니저 이상 권한인지 확인
 */
export const isManagerOrAbove = (user?: ICurrentUser): boolean => {
  return hasRole(
    [EUserRole.MANAGER, EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    user,
  );
};

/**
 * 라이센스 타입별 접근 가능한 기능 목록
 */
export const getLicenseFeatures = (licenseType: ELicenseType): string[] => {
  const baseFeatures = ['basic_dashboard', 'profile_management'];

  switch (licenseType) {
    case ELicenseType.FREE:
      return [...baseFeatures, 'limited_export'];

    case ELicenseType.BASIC:
      return [...baseFeatures, 'standard_export', 'email_support'];

    case ELicenseType.PREMIUM:
      return [
        ...baseFeatures,
        'advanced_analytics',
        'unlimited_export',
        'priority_support',
        'api_access',
      ];

    case ELicenseType.ENTERPRISE:
      return [
        ...baseFeatures,
        'advanced_analytics',
        'unlimited_export',
        'priority_support',
        'api_access',
        'custom_integrations',
        'dedicated_support',
        'white_labeling',
      ];

    default:
      return baseFeatures;
  }
};

/**
 * 사용자가 접근 가능한 모든 기능 목록 반환
 */
export const getUserAvailableFeatures = (user?: ICurrentUser): string[] => {
  if (!user?.license || !isLicenseActive(user.license)) {
    return getLicenseFeatures(ELicenseType.FREE);
  }

  return getLicenseFeatures(user.license.type);
};

/**
 * 라이센스 업그레이드 필요 여부 확인
 */
export const needsUpgrade = (
  requiredLicenseType: ELicenseType,
  user?: ICurrentUser,
): boolean => {
  if (!user?.license) return true;
  return !hasMinimumLicenseType(requiredLicenseType, user.license);
};

/**
 * 라이센스 상태에 따른 메시지 반환
 */
export const getLicenseStatusMessage = (license?: ILicense): string => {
  if (!license) return '라이센스가 없습니다.';

  switch (license.status) {
    case ELicenseStatus.ACTIVE:
      return '라이센스가 활성화되어 있습니다.';
    case ELicenseStatus.EXPIRED:
      return '라이센스가 만료되었습니다. 갱신이 필요합니다.';
    case ELicenseStatus.SUSPENDED:
      return '라이센스가 일시 중단되었습니다. 결제를 확인해주세요.';
    case ELicenseStatus.TRIAL:
      return '평가판 라이센스입니다.';
    default:
      return '라이센스 상태를 확인할 수 없습니다.';
  }
};

/**
 * 남은 라이센스 기간 계산 (일 단위)
 */
export const getRemainingDays = (license?: ILicense): number => {
  if (!license) return 0;

  const now = new Date();
  const endDate = new Date(license.endDate);
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};
