export const paths = {
  index: '/',
  home: '/home',
  login: 'login',
  unauthorized: 'unauthorized',
  pageNotFound: '/404',
  errorBoundary: '/error',
  auth: {
    logIn: '/login',
    signUp: '/sign-up',
    findId: '/find-id',
    resetPassword: '/reset-password',
    editInformation: '/account-management',
  },
  license: {
    dashboard: '/license/dashboard',
    subscription: '/license/subscription',
    billing: '/license/billing',
    usage: '/license/usage',
    upgrade: '/license/upgrade',
    management: '/license/management',
    history: '/license/history',
    features: '/license/features',
  },
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    licenses: '/admin/licenses',
    settings: '/admin/settings',
    analytics: '/admin/analytics',
  },
  api: {
    index: '/api',
    detail: ':id',
  },
  test: {
    routing: '/test/routing',
  },
};
