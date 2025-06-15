import PageNotFound from '@/pages/pageNotFound';

import { RouteItem } from '@/types/route';
import { EUserRole } from '@/types/user';

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
    element: <GlobalLayout acceptedRole={[EUserRole.ADMIN, EUserRole.GUEST]} />,
    child: [
      {
        path: '',
        element: <div>회원정보 수정</div>,
        // element: <EditYourInformation />,
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
