import HomePage from '@/components/HomePage';

// 관리자 관련 페이지
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import EditInformationPage from '@/pages/auth/EditInformationPage';
import FindIdPage from '@/pages/auth/FindIdPage';
// 인증 관련 페이지
import LoginPage from '@/pages/auth/LoginPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import BillingPage from '@/pages/license/BillingPage';
import HistoryPage from '@/pages/license/HistoryPage';
// 라이센스 관련 페이지
import LicenseDashboardPage from '@/pages/license/LicenseDashboardPage';
import SubscriptionPage from '@/pages/license/SubscriptionPage';
import UpgradePage from '@/pages/license/UpgradePage';
import UsagePage from '@/pages/license/UsagePage';
// 기본 페이지
import PageNotFound from '@/pages/pageNotFound';
import RoutingTestPage from '@/pages/test/RoutingTestPage';
import UnauthorizedPage from '@/pages/unauthorized';

import { RouteItem } from '@/types/route';
import { ELicenseType, EUserRole, ICurrentUser, ILicense } from '@/types/user';
import {
  hasFeatureAccess,
  hasMinimumLicenseType,
  hasRole,
} from '@/utils/license';

import GlobalLayout from './GlobalLayout';
import { paths } from './paths';

// 컴포넌트 매핑 객체
const componentMap: Record<string, React.ReactElement> = {
  // 인증 관련
  [paths.auth.logIn]: <LoginPage />,
  [paths.auth.signUp]: <SignUpPage />,
  [paths.auth.findId]: <FindIdPage />,
  [paths.auth.resetPassword]: <ResetPasswordPage />,
  [paths.auth.editInformation]: <EditInformationPage />,

  // 라이센스 관련
  [paths.license.dashboard]: <LicenseDashboardPage />,
  [paths.license.subscription]: <SubscriptionPage />,
  [paths.license.billing]: <BillingPage />,
  [paths.license.usage]: <UsagePage />,
  [paths.license.upgrade]: <UpgradePage />,
  [paths.license.history]: <HistoryPage />,
  [paths.license.features]: <div>기능 비교 페이지</div>, // 추후 구현
  [paths.license.management]: <div>라이센스 관리 (프리미엄)</div>, // 추후 구현

  // 관리자 관련
  [paths.admin.dashboard]: <AdminDashboardPage />,
  [paths.admin.users]: <div>사용자 관리 페이지</div>, // 추후 구현
  [paths.admin.licenses]: <div>라이센스 관리 페이지</div>, // 추후 구현
  [paths.admin.settings]: <div>시스템 설정 페이지</div>, // 추후 구현
  [paths.admin.analytics]: <div>분석 대시보드 페이지</div>, // 추후 구현
};

// ✅ 라우트 생성 헬퍼 함수들
const createBasicRoute = (
  path: string,
  title: string,
  category: RouteItem['category'] = 'public',
): RouteItem => ({
  path,
  element: <GlobalLayout />,
  category,
  title,
  child: [
    {
      path: '',
      element: componentMap[path] || <div>{title}</div>,
    },
  ],
});

const createProtectedRoute = (
  path: string,
  title: string,
  options: {
    category?: RouteItem['category'];
    requiredRoles?: EUserRole[];
    requiredLicenses?: ELicenseType[];
    requiredFeatures?: string[];
    requireBoth?: boolean;
    requireAuth?: boolean;
  } = {},
): RouteItem => ({
  path,
  element: <GlobalLayout />,
  requireAuth: options.requireAuth ?? true,
  requiredRoles: options.requiredRoles,
  requiredLicenses: options.requiredLicenses,
  requiredFeatures: options.requiredFeatures,
  requireBoth: options.requireBoth,
  category: options.category ?? 'dashboard',
  title,
  child: [
    {
      path: '',
      element: componentMap[path] || <div>{title}</div>,
    },
  ],
});

// 공통 권한 그룹 상수
const ALL_USER_ROLES = [
  EUserRole.USER,
  EUserRole.MANAGER,
  EUserRole.ADMIN,
  EUserRole.SUPER_ADMIN,
];

const MANAGER_AND_ABOVE = [
  EUserRole.MANAGER,
  EUserRole.ADMIN,
  EUserRole.SUPER_ADMIN,
];

const ADMIN_ONLY = [EUserRole.ADMIN, EUserRole.SUPER_ADMIN];

const SUPER_ADMIN_ONLY = [EUserRole.SUPER_ADMIN];

const ALL_LICENSE_TYPES = [
  ELicenseType.FREE,
  ELicenseType.BASIC,
  ELicenseType.PREMIUM,
  ELicenseType.ENTERPRISE,
];

const PREMIUM_AND_ABOVE = [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE];

// ✅ 통합된 라우트 설정 (메타데이터 포함)
export const unifiedRoutes: RouteItem[] = [
  // === 인증 관련 라우트 ===
  createBasicRoute(paths.auth.logIn, '로그인', 'auth'),
  createBasicRoute(paths.auth.signUp, '회원가입', 'auth'),
  createBasicRoute(paths.auth.findId, '아이디 찾기', 'auth'),
  createBasicRoute(paths.auth.resetPassword, '비밀번호 찾기', 'auth'),

  // === 인증 필요 라우트 ===
  createProtectedRoute(paths.auth.editInformation, '회원정보 수정', {
    category: 'dashboard',
    requiredRoles: ALL_USER_ROLES,
  }),

  // === 기본 라이센스 라우트 ===
  createProtectedRoute(paths.license.dashboard, '라이센스 대시보드', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.subscription, '구독 관리', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.billing, '결제 관리', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.usage, '사용량 조회', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.upgrade, '라이센스 업그레이드', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.history, '라이센스 이력', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),
  createProtectedRoute(paths.license.features, '기능 비교', {
    category: 'license',
    requiredRoles: ALL_USER_ROLES,
    requiredLicenses: ALL_LICENSE_TYPES,
  }),

  // === 프리미엄 라우트 (PREMIUM 이상 + 매니저 이상) ===
  createProtectedRoute(paths.license.management, '라이센스 관리 (프리미엄)', {
    category: 'license',
    requiredRoles: MANAGER_AND_ABOVE,
    requiredLicenses: PREMIUM_AND_ABOVE,
    requireBoth: true,
  }),

  // === 관리자 전용 라우트 ===
  createProtectedRoute(paths.admin.dashboard, '관리자 대시보드', {
    category: 'admin',
    requiredRoles: ADMIN_ONLY,
  }),
  createProtectedRoute(paths.admin.users, '사용자 관리', {
    category: 'admin',
    requiredRoles: ADMIN_ONLY,
  }),
  createProtectedRoute(paths.admin.licenses, '라이센스 관리', {
    category: 'admin',
    requiredRoles: ADMIN_ONLY,
  }),
  createProtectedRoute(paths.admin.settings, '시스템 설정', {
    category: 'admin',
    requiredRoles: SUPER_ADMIN_ONLY,
  }),
  createProtectedRoute(paths.admin.analytics, '분석 대시보드', {
    category: 'admin',
    requiredRoles: ADMIN_ONLY,
  }),

  // === 공개 라우트 ===
  // 개발환경에서만 접속 가능한 테스트 라우트
  ...(process.env.NODE_ENV === 'development'
    ? [
        {
          path: paths.test.routing,
          element: <RoutingTestPage />,
          category: 'public' as const,
          title: '라우팅 테스트 (개발용)',
          description: '권한 및 라이센스 기능 테스트 - 개발환경 전용',
        },
      ]
    : []),
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
    category: 'public',
    title: '접근 권한 없음',
  },
  {
    path: paths.pageNotFound,
    element: <PageNotFound />,
    category: 'public',
    title: '페이지 없음',
  },

  // === 홈 라우트 ===
  {
    path: paths.index,
    element: <GlobalLayout />,
    category: 'dashboard',
    title: '홈',
    child: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: paths.home,
    element: <GlobalLayout />,
    category: 'dashboard',
    title: '홈',
    child: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
];

// 카테고리별 라우트 필터링 유틸리티
export const getRoutesByCategory = (category: string): RouteItem[] => {
  return unifiedRoutes.filter((route) => route.category === category);
};

// 권한별 라우트 필터링 유틸리티
export const getAccessibleRoutes = (
  user?: ICurrentUser,
  userFeatures: string[] = [],
): RouteItem[] => {
  return unifiedRoutes.filter((route) => {
    // 인증 체크
    if (route.requireAuth && !user) {
      return false;
    }

    // 권한 체크
    const hasRequiredRole = route.requiredRoles
      ? hasRole(route.requiredRoles, user)
      : true;

    // 라이센스 체크 (실제 라이센스 유틸리티 사용)
    const hasRequiredLicense = route.requiredLicenses
      ? route.requiredLicenses.some((license) =>
          hasMinimumLicenseType(license, user?.license),
        )
      : true;

    // 기능 체크
    const hasRequiredFeatures = route.requiredFeatures
      ? route.requiredFeatures.every((feature) =>
          hasFeatureAccess(feature, user?.license),
        )
      : true;

    // 접근 권한 결정
    if (route.requireBoth) {
      return hasRequiredRole && hasRequiredLicense && hasRequiredFeatures;
    } else {
      return hasRequiredRole || hasRequiredLicense || hasRequiredFeatures;
    }
  });
};

// 네비게이션 메뉴 생성 유틸리티
export const generateNavigation = (user?: ICurrentUser) => {
  const accessibleRoutes = getAccessibleRoutes(user);

  // 네비게이션에 표시할 카테고리 정의
  const navCategories = [
    { category: 'dashboard', label: '대시보드', icon: '🏠' },
    { category: 'license', label: '라이센스', icon: '🎯' },
    { category: 'admin', label: '관리', icon: '⚙️' },
  ];

  return navCategories
    .map((navCategory) => {
      const categoryRoutes = accessibleRoutes.filter(
        (route) =>
          route.category === navCategory.category &&
          route.category !== 'auth' && // 인증 페이지는 네비게이션에서 제외
          route.path !== '/', // 홈 페이지는 별도 처리
      );

      return {
        ...navCategory,
        routes: categoryRoutes.map((route) => ({
          path: route.path,
          title: route.title,
          description: route.description,
        })),
      };
    })
    .filter((nav) => nav.routes.length > 0); // 접근 가능한 라우트가 있는 카테고리만 표시
};

// 사용자 권한에 따른 홈 페이지 리다이렉트 결정
export const getDefaultRedirectPath = (user?: ICurrentUser): string => {
  if (!user) return '/login';

  // 관리자는 관리자 대시보드로
  if (hasRole([EUserRole.ADMIN, EUserRole.SUPER_ADMIN], user)) {
    return '/admin/dashboard';
  }

  // 매니저는 라이센스 대시보드로
  if (hasRole([EUserRole.MANAGER], user)) {
    return '/license/dashboard';
  }

  // 일반 사용자는 홈으로
  return '/';
};

// 라우트 권한 체크 (단일 라우트용)
export const checkRouteAccess = (
  routePath: string,
  user?: ICurrentUser,
): boolean => {
  const route = unifiedRoutes.find((r) => r.path === routePath);
  if (!route) return false;

  // 공개 라우트는 항상 접근 가능
  if (route.category === 'public') return true;

  // 인증 필요 체크
  if (route.requireAuth && !user) return false;

  // 권한 체크
  if (route.requiredRoles && !hasRole(route.requiredRoles, user)) {
    return false;
  }

  // 라이센스 체크
  if (route.requiredLicenses) {
    const hasLicense = route.requiredLicenses.some((license) =>
      hasMinimumLicenseType(license, user?.license),
    );
    if (!hasLicense) return false;
  }

  // 기능 체크
  if (route.requiredFeatures) {
    const hasFeatures = route.requiredFeatures.every((feature) =>
      hasFeatureAccess(feature, user?.license),
    );
    if (!hasFeatures) return false;
  }

  return true;
};

// 하위 호환성을 위한 기존 export (점진적 마이그레이션)
export const authenticateRoutes = getRoutesByCategory('auth');
export const protectedRoutes = unifiedRoutes.filter(
  (route) => route.requireAuth && route.category === 'dashboard',
);
export const licenseRoutes = unifiedRoutes.filter(
  (route) => route.category === 'license' && !route.requireBoth,
);
export const premiumRoutes = unifiedRoutes.filter(
  (route) =>
    route.requireBoth && route.requiredLicenses?.includes(ELicenseType.PREMIUM),
);
export const adminRoutes = getRoutesByCategory('admin');
export const publicRoutes = getRoutesByCategory('public');
