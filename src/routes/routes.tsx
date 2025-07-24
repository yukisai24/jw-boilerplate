import HomePage from '@/components/HomePage';

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

// ✅ 통합된 라우트 설정 (메타데이터 포함)
export const unifiedRoutes: RouteItem[] = [
  // === 인증 관련 라우트 ===
  {
    path: paths.auth.logIn,
    element: <GlobalLayout />,
    category: 'auth',
    title: '로그인',
    child: [
      {
        path: '',
        element: <div>로그인</div>,
        // element: <LogIn />,
      },
    ],
  },
  {
    path: paths.auth.signUp,
    element: <GlobalLayout />,
    category: 'auth',
    title: '회원가입',
    child: [
      {
        path: '',
        element: <div>회원가입</div>,
        // element: <SignUp />,
      },
    ],
  },
  {
    path: paths.auth.findId,
    element: <GlobalLayout />,
    category: 'auth',
    title: '아이디 찾기',
    child: [
      {
        path: '',
        element: <div>아이디 찾기</div>,
        // element: <FindIdPage />,
      },
    ],
  },
  {
    path: paths.auth.resetPassword,
    element: <GlobalLayout />,
    category: 'auth',
    title: '비밀번호 찾기',
    child: [
      {
        path: '',
        element: <div>비밀번호 찾기</div>,
        // element: <ResetPasswordPage />,
      },
    ],
  },

  // === 인증 필요 라우트 ===
  {
    path: paths.auth.editInformation,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    category: 'dashboard',
    title: '회원정보 수정',
    child: [
      {
        path: '',
        element: <div>회원정보 수정</div>,
        // element: <EditYourInformation />,
      },
    ],
  },

  // === 기본 라이센스 라우트 ===
  {
    path: paths.license.dashboard,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '라이센스 대시보드',
    child: [
      {
        path: '',
        element: <div>라이센스 대시보드</div>,
        // element: <LicenseDashboard />,
      },
    ],
  },
  {
    path: paths.license.subscription,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '구독 관리',
    child: [
      {
        path: '',
        element: <div>구독 관리</div>,
        // element: <LicenseSubscription />,
      },
    ],
  },
  {
    path: paths.license.billing,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '결제 관리',
    child: [
      {
        path: '',
        element: <div>결제 관리</div>,
        // element: <LicenseBilling />,
      },
    ],
  },
  {
    path: paths.license.usage,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '사용량 조회',
    child: [
      {
        path: '',
        element: <div>사용량 조회</div>,
        // element: <LicenseUsage />,
      },
    ],
  },
  {
    path: paths.license.upgrade,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '라이센스 업그레이드',
    child: [
      {
        path: '',
        element: <div>라이센스 업그레이드</div>,
        // element: <LicenseUpgrade />,
      },
    ],
  },
  {
    path: paths.license.history,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '라이센스 이력',
    child: [
      {
        path: '',
        element: <div>라이센스 이력</div>,
        // element: <LicenseHistory />,
      },
    ],
  },
  {
    path: paths.license.features,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.USER,
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [
      EUserRole.USER,
      EUserRole.MANAGER,
      EUserRole.ADMIN,
      EUserRole.SUPER_ADMIN,
    ],
    requiredLicenses: [
      ELicenseType.FREE,
      ELicenseType.BASIC,
      ELicenseType.PREMIUM,
      ELicenseType.ENTERPRISE,
    ],
    category: 'license',
    title: '기능 비교',
    child: [
      {
        path: '',
        element: <div>기능 비교</div>,
        // element: <LicenseFeatures />,
      },
    ],
  },

  // === 프리미엄 라우트 (PREMIUM 이상 + 매니저 이상) ===
  {
    path: paths.license.management,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[
          EUserRole.MANAGER,
          EUserRole.ADMIN,
          EUserRole.SUPER_ADMIN,
        ]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.MANAGER, EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    requiredLicenses: [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE],
    requireBoth: true,
    category: 'license',
    title: '라이센스 관리 (프리미엄)',
    child: [
      {
        path: '',
        element: <div>라이센스 관리 (프리미엄)</div>,
        // element: <LicenseManagement />,
      },
    ],
  },

  // === 관리자 전용 라우트 ===
  {
    path: paths.admin.dashboard,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    category: 'admin',
    title: '관리자 대시보드',
    child: [
      {
        path: '',
        element: <div>관리자 대시보드</div>,
        // element: <AdminDashboard />,
      },
    ],
  },
  {
    path: paths.admin.users,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    category: 'admin',
    title: '사용자 관리',
    child: [
      {
        path: '',
        element: <div>사용자 관리</div>,
        // element: <AdminUsers />,
      },
    ],
  },
  {
    path: paths.admin.licenses,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    category: 'admin',
    title: '라이센스 관리',
    child: [
      {
        path: '',
        element: <div>라이센스 관리</div>,
        // element: <AdminLicenses />,
      },
    ],
  },
  {
    path: paths.admin.settings,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.SUPER_ADMIN]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.SUPER_ADMIN],
    category: 'admin',
    title: '시스템 설정',
    child: [
      {
        path: '',
        element: <div>시스템 설정</div>,
        // element: <AdminSettings />,
      },
    ],
  },
  {
    path: paths.admin.analytics,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
      />
    ),
    requireAuth: true,
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    category: 'admin',
    title: '분석 대시보드',
    child: [
      {
        path: '',
        element: <div>분석 대시보드</div>,
        // element: <AdminAnalytics />,
      },
    ],
  },

  // === 공개 라우트 ===
  {
    path: '/test/routing',
    element: <RoutingTestPage />,
    category: 'public',
    title: '라우팅 테스트',
    description: '권한 및 라이센스 기능 테스트',
  },
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
  {
    path: paths.index,
    element: <GlobalLayout />,
    category: 'public',
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
