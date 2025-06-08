import { TMenu } from '@/components/organisms/mainNavBar/types';

import { routePaths } from '@/routes/paths';
import { EUserRole } from '@/types/user';

export const menus: TMenu[] = [
  {
    label: '서비스',
    id: 'service',
    path: routePaths.service.index,
    acceptedRole: [
      EUserRole.GUEST,
      EUserRole.INDIVIDUAL_USER,
      EUserRole.ORGANIZATION_USER,
      EUserRole.ORGANIZATION_ADMIN,
    ],
    child: [
      {
        label: '서비스 현황',
        id: 'service-status',
        path: routePaths.service.status,
      },
    ],
  },
  {
    label: 'API',
    id: 'api',
    path: routePaths.api.index,
    acceptedRole: [
      EUserRole.GUEST,
      EUserRole.INDIVIDUAL_USER,
      EUserRole.ORGANIZATION_USER,
      EUserRole.ORGANIZATION_ADMIN,
    ],
    child: [
      {
        label: 'API 현황',
        id: 'api-status',
        path: routePaths.api.status,
      },
    ],
  },
  {
    label: 'APP',
    id: 'app',
    path: routePaths.app.index,
    acceptedRole: [EUserRole.INDIVIDUAL_USER, EUserRole.ORGANIZATION_USER, EUserRole.ORGANIZATION_ADMIN],
    child: [
      {
        label: 'APP 현황',
        id: 'app-status',
        path: routePaths.app.status,
      },
    ],
  },
  {
    label: '고객 지원',
    id: 'customer-support',
    path: routePaths.customerSupport.index,
    child: [
      {
        label: '공지사항',
        id: 'customer-support-notice',
        path: routePaths.customerSupport.notice.index,
      },
      {
        label: 'FAQ',
        id: 'customer-support-faq',
        path: routePaths.customerSupport.faq.index,
      },
      {
        label: '사이트 소개',
        id: 'customer-support-site-introduction',
        path: routePaths.customerSupport.siteIntroduction.index,
      },

      {
        label: '이용 안내',
        id: 'customer-support-user-information',
        path: routePaths.customerSupport.userInformation.index,
      },
      {
        label: '제휴 안내',
        id: 'customer-support-affiliate-information',
        path: routePaths.customerSupport.affiliateInformation.index,
      },
    ],
  },
  {
    label: '운영 관리',
    id: 'operations-management',
    path: routePaths.operationsManagement.index,
    acceptedRole: [EUserRole.PROVIDER_ADMIN, EUserRole.PORTAL_ADMIN],
    child: [
      {
        label: 'API 관리',
        id: 'operations-management-api-management',
        path: routePaths.operationsManagement.apiManagement.index,
      },
      {
        label: '서비스 관리',
        id: 'operations-management-service-management',
        path: routePaths.operationsManagement.serviceManagement.index,
      },
      {
        label: 'APP 관리',
        id: 'operations-management-app-management',
        path: routePaths.operationsManagement.appManagement.index,
      },
      {
        label: '과금청구 관리',
        id: 'operations-management-billing-management',
        path: routePaths.operationsManagement.billingManagement.index,
      },
      {
        label: '승인 관리',
        id: 'operations-management-application-approval-management',
        path: routePaths.operationsManagement.approvalManagement.index,
      },
      {
        label: '승인라인 관리',
        id: 'operations-management-approval-line-management',
        path: routePaths.operationsManagement.approvalLine.index,
      },
      {
        label: '승인이력 조회',
        id: 'operations-management-approval-history-inquiry',
        path: routePaths.operationsManagement.approvalHistory,
      },
      {
        label: 'API 이용약관 관리',
        id: 'operations-management-api-term-of-user-management',
        path: routePaths.operationsManagement.apiTermsOfUse.index,
      },
      {
        label: 'API 사용정책 관리',
        id: 'operations-management-api-using-policy-management',
        path: routePaths.operationsManagement.apiUsagePolicy.index,
      },
      {
        label: 'API 과금정책 관리',
        id: 'operations-management-api-charging/billing-policy-management',
        path: routePaths.operationsManagement.apiBillingPolicy.index,
      },
      // {
      //   label: 'API 일괄등록',
      //   id: 'operations-management-api-multi-register',
      //   path: routePaths.operationsManagement.apiMultiRegister,
      // },
      {
        label: '신청관리',
        id: 'operations-management-application-management',
        path: routePaths.operationsManagement.applicationManagement.index,
      },
      {
        label: 'Dynamic (API Sample)',
        id: 'operations-management-dynamic-ui',
        path: routePaths.operationsManagement.testDynamic.index,
      },
    ],
  },
  {
    label: '기초정보 관리',
    id: 'basic-information-management',
    path: routePaths.basicInformationManagement.index,
    acceptedRole: [EUserRole.PORTAL_ADMIN],
    child: [
      {
        label: '운영자 관리',
        id: 'basic-information-management-operator-management',
        path: routePaths.basicInformationManagement.operatorManagement.index,
      },
      {
        label: '회원 관리',
        id: 'basic-information-management-user-management',
        path: routePaths.basicInformationManagement.userManagement.index,
      },
      {
        label: '이용기관 관리',
        id: 'basic-information-management-user-organization-management',
        path: routePaths.basicInformationManagement.userOrganizationManagement.index,
      },
      {
        label: '제공기관 관리',
        id: 'basic-information-management-provider-management',
        path: routePaths.basicInformationManagement.providerManagement.index,
      },
      {
        label: '메뉴 관리',
        id: 'basic-information-management-menu-management',
        path: routePaths.basicInformationManagement.menuManagement,
      },
      {
        label: '권한별 메뉴 관리',
        id: 'basic-information-management-menu-management-by-authority',
        path: routePaths.basicInformationManagement.menuManagementByAuthority,
      },
      {
        label: '확장정보 관리',
        id: 'basic-information-management-extended-information-management',
        path: routePaths.basicInformationManagement.extendedInformationManagement.index,
      },
      {
        label: '공통코드 관리',
        id: 'basic-information-management-common-code-management',
        path: routePaths.basicInformationManagement.commonCodeManagement.index,
      },
      // {
      //   label: '이용약관 관리',
      //   id: 'basic-information-management-term-of-usage-management',
      //   path: routePaths.basicInformationManagement.termOfUsageManagement.index,
      // },
      // {
      //   label: '개인정보 처리방침 관리',
      //   id: 'basic-information-management-privacy-policy-management',
      //   path: routePaths.basicInformationManagement.privacyPolicyManagement.index,
      // },
    ],
  },
  {
    label: '대시보드',
    id: 'dashboard',
    path: routePaths.dashboard.index,
    acceptedRole: [EUserRole.PORTAL_ADMIN, EUserRole.PROVIDER_ADMIN],
  },
  {
    label: '마이페이지',
    id: 'my-page',
    path: routePaths.myPage.index,
    acceptedRole: [EUserRole.INDIVIDUAL_USER, EUserRole.ORGANIZATION_USER, EUserRole.ORGANIZATION_ADMIN],
  },
];

export const getUserMenuList = (isAuthenticated: boolean): TMenu[] => {
  if (isAuthenticated)
    return [
      {
        label: '계정 관리',
        id: 'account-management',
        path: routePaths.auth.editYourInformation,
      },
    ];

  return [
    {
      label: '로그인',
      id: 'login',
      path: routePaths.auth.logIn,
    },
    {
      label: '가입하기',
      id: 'sign-up',
      path: routePaths.auth.signUp,
    },

    {
      label: '아이디 찾기',
      id: 'find-id',
      path: routePaths.auth.findId,
    },

    {
      label: '비밀번호 초기화',
      id: 'reset-password',
      path: routePaths.auth.resetPassword,
    },
  ];
};
