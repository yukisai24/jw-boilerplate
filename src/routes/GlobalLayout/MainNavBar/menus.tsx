import { paths } from '@/routes/paths';
import { EUserRole } from '@/types/user';

import { TMenu } from './types';

export const menus: TMenu[] = [
  {
    label: 'API',
    id: 'api',
    path: paths.api.index,
    acceptedRole: [EUserRole.GUEST, EUserRole.ADMIN],
    child: [
      {
        label: 'API 상세',
        id: 'api-detail',
        path: paths.api.detail,
      },
    ],
  },
  // 개발환경에서만 표시되는 테스트 메뉴
  ...(process.env.NODE_ENV === 'development'
    ? [
        {
          label: '라우팅 테스트',
          id: 'test-routing',
          path: paths.test.routing,
          acceptedRole: [EUserRole.GUEST, EUserRole.ADMIN],
        },
      ]
    : []),
];

export const getUserMenuList = (isAuthenticated: boolean): TMenu[] => {
  if (isAuthenticated)
    return [
      {
        label: '계정 관리',
        id: 'account-management',
        path: paths.auth.editInformation,
      },
    ];

  return [
    {
      label: '로그인',
      id: 'login',
      path: paths.auth.logIn,
    },
    {
      label: '가입하기',
      id: 'sign-up',
      path: paths.auth.signUp,
    },

    {
      label: '아이디 찾기',
      id: 'find-id',
      path: paths.auth.findId,
    },

    {
      label: '비밀번호 초기화',
      id: 'reset-password',
      path: paths.auth.resetPassword,
    },
  ];
};
