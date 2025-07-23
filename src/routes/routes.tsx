import PageNotFound from '@/pages/pageNotFound';

import { RouteItem } from '@/types/route';
import { ELicenseStatus, ELicenseType, EUserRole } from '@/types/user';

import GlobalLayout from './GlobalLayout';
import { paths } from './paths';

export const authenticateRoutes: RouteItem[] = [
  {
    path: paths.auth.logIn,
    element: <GlobalLayout />,
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
    child: [
      {
        path: '',
        element: <div>비밀번호 찾기</div>,
        // element: <ResetPasswordPage />,
      },
    ],
  },
];

export const protectedRoutes: RouteItem[] = [
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
    child: [
      {
        path: '',
        element: <div>회원정보 수정</div>,
        // element: <EditYourInformation />,
      },
    ],
  },
];

// 라이센스 관련 라우트 (로그인 필요 + 라이센스 체크)
export const licenseRoutes: RouteItem[] = [
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
    child: [
      {
        path: '',
        element: <div>기능 비교</div>,
        // element: <LicenseFeatures />,
      },
    ],
  },
];

// 프리미엄 기능 라우트 (PREMIUM 이상 라이센스 필요)
export const premiumRoutes: RouteItem[] = [
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
    child: [
      {
        path: '',
        element: <div>라이센스 관리 (프리미엄)</div>,
        // element: <LicenseManagement />,
      },
    ],
  },
];

// 관리자 전용 라우트
export const adminRoutes: RouteItem[] = [
  {
    path: paths.admin.dashboard,
    element: (
      <GlobalLayout
        requireAuth={true}
        acceptedRole={[EUserRole.ADMIN, EUserRole.SUPER_ADMIN]}
      />
    ),
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
    child: [
      {
        path: '',
        element: <div>분석 대시보드</div>,
        // element: <AdminAnalytics />,
      },
    ],
  },
];

export const publicRoutes: RouteItem[] = [
  {
    path: paths.pageNotFound,
    element: <PageNotFound />,
  },
  {
    path: paths.index,
    element: <GlobalLayout />,
    child: [
      {
        path: '',
        element: <>Home</>,
      },
    ],
  },
];
