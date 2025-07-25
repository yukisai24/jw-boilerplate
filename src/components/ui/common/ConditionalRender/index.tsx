import { ReactNode } from 'react';

import { Alert, Box, Typography } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import { ELicenseType, EUserRole } from '@/types/user';
import { isDevMode } from '@/utils/env';
import { tryParse } from '@/utils/helpers/tryParse';
import {
  hasFeatureAccess,
  hasMinimumLicenseType,
  hasRole,
  isLicenseActive,
} from '@/utils/license';

// 기존 기본 조건부 렌더링
export const ConditionalRender = ({
  condition,
  children,
}: {
  condition: boolean;
  children: ReactNode;
}) => {
  return condition ? <>{children}</> : null;
};

// 개발 환경 렌더링 (기존)
export const DevRender = ({
  children,
  isDev = true,
}: {
  children: ReactNode;
  isDev?: boolean;
}) => {
  const isVisible = isDev ? isDevMode : !isDevMode;

  if (!isVisible) return null;

  return (
    <Box className="border border-gray-800 text-sm p-4 mt-6 mb-6 rounded-lg">
      <Typography variant="h6">🔧 Dev Render</Typography>
      {children}
    </Box>
  );
};

// 라이선스 기반 조건부 렌더링
export const LicenseRender = ({
  children,
  requiredLicense,
  fallback,
  showError = false,
}: {
  children: ReactNode;
  requiredLicense: ELicenseType;
  fallback?: ReactNode;
  showError?: boolean;
}) => {
  const { currentUser } = useAuth();
  const userLicense = currentUser?.license;

  const hasAccess = hasMinimumLicenseType(requiredLicense, userLicense);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showError) {
    return (
      <Alert
        severity="warning"
        sx={{ my: 2 }}
      >
        이 기능을 사용하려면 {requiredLicense} 라이선스 이상이 필요합니다.
      </Alert>
    );
  }

  return null;
};

// 권한 기반 조건부 렌더링
export const RoleRender = ({
  children,
  requiredRoles,
  fallback,
  showError = false,
}: {
  children: ReactNode;
  requiredRoles: EUserRole | EUserRole[];
  fallback?: ReactNode;
  showError?: boolean;
}) => {
  const { currentUser } = useAuth();

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const hasAccess = hasRole(roles, currentUser);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showError) {
    return (
      <Alert
        severity="error"
        sx={{ my: 2 }}
      >
        이 기능에 접근할 권한이 없습니다.
      </Alert>
    );
  }

  return null;
};

// 기능 접근 기반 조건부 렌더링
export const FeatureRender = ({
  children,
  requiredFeatures,
  fallback,
  showError = false,
}: {
  children: ReactNode;
  requiredFeatures: string | string[];
  fallback?: ReactNode;
  showError?: boolean;
}) => {
  const { currentUser } = useAuth();

  const features = Array.isArray(requiredFeatures)
    ? requiredFeatures
    : [requiredFeatures];
  const hasAccess = features.every((feature) =>
    hasFeatureAccess(feature, currentUser?.license),
  );

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showError) {
    return (
      <Alert
        severity="info"
        sx={{ my: 2 }}
      >
        이 기능은 현재 사용할 수 없습니다.
      </Alert>
    );
  }

  return null;
};

// 통합 스마트 조건부 렌더링
export const SmartRender = ({
  children,
  conditions,
  fallback,
  showError = false,
  requireAll = true,
}: {
  children: ReactNode;
  conditions: {
    dev?: boolean;
    license?: ELicenseType;
    roles?: EUserRole | EUserRole[];
    features?: string | string[];
    custom?: boolean;
  };
  fallback?: ReactNode;
  showError?: boolean;
  requireAll?: boolean;
}) => {
  const { currentUser } = useAuth();
  const checks: boolean[] = [];

  // 개발 환경 체크
  if (conditions.dev !== undefined) {
    checks.push(conditions.dev ? isDevMode : !isDevMode);
  }

  // 라이선스 체크
  if (conditions.license) {
    checks.push(
      hasMinimumLicenseType(conditions.license, currentUser?.license),
    );
  }

  // 권한 체크
  if (conditions.roles) {
    const roles = Array.isArray(conditions.roles)
      ? conditions.roles
      : [conditions.roles];
    checks.push(hasRole(roles, currentUser));
  }

  // 기능 접근 체크
  if (conditions.features) {
    const features = Array.isArray(conditions.features)
      ? conditions.features
      : [conditions.features];
    checks.push(
      features.every((feature) =>
        hasFeatureAccess(feature, currentUser?.license),
      ),
    );
  }

  // 커스텀 조건 체크
  if (conditions.custom !== undefined) {
    checks.push(conditions.custom);
  }

  // 모든 조건을 만족해야 하는지, 하나만 만족하면 되는지 결정
  const hasAccess = requireAll
    ? checks.every((check) => check)
    : checks.some((check) => check);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showError) {
    return (
      <Alert
        severity="warning"
        sx={{ my: 2 }}
      >
        접근 조건을 만족하지 않습니다.
      </Alert>
    );
  }

  return null;
};

// 개발자 도구 패널
export const DevToolsPanel = ({
  children,
  title = '개발자 도구',
  collapsible = true,
}: {
  children: ReactNode;
  title?: string;
  collapsible?: boolean;
}) => {
  if (!isDevMode) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        maxWidth: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        p: 2,
        borderRadius: 2,
        zIndex: 9999,
        fontSize: '0.875rem',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: '#00ff41' }}
      >
        🛠️ {title}
      </Typography>
      {children}
    </Box>
  );
};

// JSON 파싱 안전 체크를 위한 렌더링
export const SafeJsonRender = ({
  jsonString,
  fallback,
  children,
}: {
  jsonString: string;
  fallback?: ReactNode;
  children: (parsedData: any) => ReactNode;
}) => {
  const isValidJson = tryParse(jsonString);

  if (!isValidJson) {
    return fallback || <Alert severity="error">잘못된 JSON 형식입니다.</Alert>;
  }

  try {
    const parsedData = JSON.parse(jsonString);
    return <>{children(parsedData)}</>;
  } catch {
    return fallback || null;
  }
};
