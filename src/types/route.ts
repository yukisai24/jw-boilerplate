import { ReactNode } from 'react';

import { ELicenseType, EUserRole } from './user';

export interface RouteItem {
  path: string;
  child?: RouteItem[];
  element: ReactNode;

  // 권한 설정
  requiredRoles?: EUserRole[];
  requiredLicenses?: ELicenseType[];
  requiredFeatures?: string[];

  // 접근 제어
  requireAuth?: boolean;
  requireBoth?: boolean; // 권한과 라이센스 둘 다 필요한지

  // 메타데이터
  title?: string;
  description?: string;
  category?: 'auth' | 'dashboard' | 'admin' | 'license' | 'public';
}
