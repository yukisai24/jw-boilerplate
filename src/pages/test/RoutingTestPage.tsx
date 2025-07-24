import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/hooks/useAuth';
import {
  checkRouteAccess,
  generateNavigation,
  getAccessibleRoutes,
  getDefaultRedirectPath,
  unifiedRoutes,
} from '@/routes/routes';
import {
  ELicenseStatus,
  ELicenseType,
  EUserRole,
  ICurrentUser,
} from '@/types/user';

const RoutingTestPage = () => {
  const navigate = useNavigate();
  const {
    login,
    logout,
    currentUser: realCurrentUser,
    authenticated: realAuthenticated,
  } = useAuth();

  // 테스트용 사용자 상태
  const [testUser, setTestUser] = useState<ICurrentUser | null>({
    id: 'test-user-1',
    name: '테스트 사용자',
    email: 'test@example.com',
    role: EUserRole.USER,
    shouldChangePassword: false,
    license: {
      id: 'license-1',
      type: ELicenseType.FREE,
      status: ELicenseStatus.ACTIVE,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      features: ['basic_dashboard'],
    },
  });

  // 테스트 사용자 상태가 변경될 때마다 실제 auth 스토어도 업데이트
  useEffect(() => {
    if (testUser) {
      login(testUser);
    } else {
      logout();
    }
  }, [testUser, login, logout]);

  // 사용자 역할 변경
  const handleRoleChange = (role: EUserRole) => {
    setTestUser((prev) => (prev ? { ...prev, role } : null));
  };

  // 라이센스 타입 변경
  const handleLicenseChange = (licenseType: ELicenseType) => {
    const licenseFeatures = {
      [ELicenseType.FREE]: ['basic_dashboard'],
      [ELicenseType.BASIC]: ['basic_dashboard', 'standard_export'],
      [ELicenseType.PREMIUM]: [
        'basic_dashboard',
        'advanced_analytics',
        'api_access',
      ],
      [ELicenseType.ENTERPRISE]: [
        'basic_dashboard',
        'advanced_analytics',
        'api_access',
        'custom_integrations',
      ],
    };

    setTestUser((prev) =>
      prev
        ? {
            ...prev,
            license: prev.license
              ? {
                  ...prev.license,
                  type: licenseType,
                  features: licenseFeatures[licenseType],
                }
              : {
                  id: 'license-1',
                  type: licenseType,
                  status: ELicenseStatus.ACTIVE,
                  startDate: '2024-01-01',
                  endDate: '2024-12-31',
                  features: licenseFeatures[licenseType],
                },
          }
        : null,
    );
  };

  // 인증 상태 토글
  const handleAuthToggle = () => {
    if (testUser) {
      setTestUser(null);
    } else {
      setTestUser({
        id: 'test-user-1',
        name: '테스트 사용자',
        email: 'test@example.com',
        role: EUserRole.USER,
        shouldChangePassword: false,
        license: {
          id: 'license-1',
          type: ELicenseType.FREE,
          status: ELicenseStatus.ACTIVE,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          features: ['basic_dashboard'],
        },
      });
    }
  };

  // 실제 인증 상태와 테스트 사용자 정보를 사용
  const currentTestUser = testUser;
  const isTestAuthenticated = !!testUser;

  // 접근 가능한 라우트 목록
  const accessibleRoutes = getAccessibleRoutes(currentTestUser);
  const navigationItems = generateNavigation(currentTestUser);
  const defaultRedirect = getDefaultRedirectPath(currentTestUser);

  // 라우트별 접근 권한 체크
  const routeAccessInfo = unifiedRoutes.map((route) => ({
    ...route,
    hasAccess: checkRouteAccess(route.path, currentTestUser),
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 라우팅 권한 & 라이센스 테스트 페이지
        </h1>

        {/* 실제 인증 상태 표시 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            ℹ️ 실제 시스템 상태
          </h2>
          <div className="text-sm text-blue-800">
            <p>
              <strong>실제 인증 상태:</strong>{' '}
              {realAuthenticated ? '✅ 로그인됨' : '❌ 로그아웃됨'}
            </p>
            <p>
              <strong>실제 사용자:</strong> {realCurrentUser?.name || '없음'}
            </p>
            <p>
              <strong>실제 역할:</strong> {realCurrentUser?.role || '없음'}
            </p>
            <p>
              <strong>실제 라이센스:</strong>{' '}
              {realCurrentUser?.license?.type || '없음'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 사용자 설정 패널 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              👤 테스트 사용자 설정
            </h2>

            {/* 인증 상태 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                인증 상태
              </label>
              <Button
                onClick={handleAuthToggle}
                className={`w-full ${isTestAuthenticated ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isTestAuthenticated ? '✅ 로그인됨' : '❌ 로그아웃됨'}
              </Button>
            </div>

            {currentTestUser && (
              <>
                {/* 사용자 역할 선택 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    사용자 역할
                  </label>
                  <div className="space-y-2">
                    {Object.values(EUserRole).map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        className={`w-full p-2 text-left rounded ${
                          currentTestUser.role === role
                            ? 'bg-blue-100 text-blue-900 border-2 border-blue-500'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 라이센스 타입 선택 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    라이센스 타입
                  </label>
                  <div className="space-y-2">
                    {Object.values(ELicenseType).map((license) => (
                      <button
                        key={license}
                        onClick={() => handleLicenseChange(license)}
                        className={`w-full p-2 text-left rounded ${
                          currentTestUser.license?.type === license
                            ? 'bg-green-100 text-green-900 border-2 border-green-500'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {license}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 현재 사용자 정보 */}
                <div className="bg-gray-50 p-3 rounded">
                  <h3 className="font-medium mb-2">현재 사용자 정보</h3>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>이름:</strong> {currentTestUser.name}
                    </p>
                    <p>
                      <strong>역할:</strong> {currentTestUser.role}
                    </p>
                    <p>
                      <strong>라이센스:</strong> {currentTestUser.license?.type}
                    </p>
                    <p>
                      <strong>기능:</strong>{' '}
                      {currentTestUser.license?.features.join(', ')}
                    </p>
                    <p>
                      <strong>기본 리다이렉트:</strong> {defaultRedirect}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 라우트 접근 권한 표 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              🛣️ 라우트 접근 권한 현황
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      경로
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접근 권한
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      테스트
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {routeAccessInfo.map((route, index) => (
                    <tr
                      key={`${route.path}-${index}`}
                      className={route.hasAccess ? 'bg-green-50' : 'bg-red-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {route.path}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {route.title || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            route.category === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : route.category === 'license'
                                ? 'bg-blue-100 text-blue-800'
                                : route.category === 'auth'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : route.category === 'dashboard'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {route.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            route.hasAccess
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {route.hasAccess ? '✅ 허용' : '❌ 거부'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={route.path}
                          className={`underline ${
                            route.hasAccess
                              ? 'text-blue-600 hover:text-blue-900'
                              : 'text-red-600 hover:text-red-900'
                          }`}
                        >
                          {route.hasAccess ? '이동' : '강제 시도'}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 동적 네비게이션 미리보기 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              🧭 동적 네비게이션 미리보기
            </h2>

            {navigationItems.length > 0 ? (
              <div className="space-y-4">
                {navigationItems.map((category) => (
                  <div
                    key={category.category}
                    className="border rounded-lg p-3"
                  >
                    <h3 className="font-medium flex items-center mb-2">
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </h3>
                    <div className="space-y-1">
                      {category.routes.map((route) => (
                        <Link
                          key={route.path}
                          to={route.path}
                          className="block text-sm text-blue-600 hover:text-blue-900 hover:underline pl-4"
                        >
                          {route.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                접근 가능한 네비게이션 항목이 없습니다
              </p>
            )}
          </div>

          {/* 권한 요구사항 상세 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              📋 권한 요구사항 상세
            </h2>

            <div className="space-y-4">
              {unifiedRoutes
                .filter(
                  (route) =>
                    route.requiredRoles ||
                    route.requiredLicenses ||
                    route.requiredFeatures,
                )
                .map((route, index) => (
                  <div
                    key={`${route.path}-detail-${index}`}
                    className="border rounded-lg p-3"
                  >
                    <div className="font-medium text-sm mb-2">{route.path}</div>

                    {route.requiredRoles && (
                      <div className="text-xs mb-1">
                        <strong>필요 역할:</strong>{' '}
                        {route.requiredRoles.join(', ')}
                      </div>
                    )}

                    {route.requiredLicenses && (
                      <div className="text-xs mb-1">
                        <strong>필요 라이센스:</strong>{' '}
                        {route.requiredLicenses.join(', ')}
                      </div>
                    )}

                    {route.requiredFeatures && (
                      <div className="text-xs mb-1">
                        <strong>필요 기능:</strong>{' '}
                        {route.requiredFeatures.join(', ')}
                      </div>
                    )}

                    {route.requireBoth && (
                      <div className="text-xs text-orange-600">
                        <strong>⚠️ 모든 조건 충족 필요</strong>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* 테스트 시나리오 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🎯 테스트 시나리오</h2>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  handleRoleChange(EUserRole.GUEST);
                  handleLicenseChange(ELicenseType.FREE);
                }}
                variant="outline"
                className="w-full text-left"
              >
                🔸 시나리오 1: 게스트 사용자
              </Button>

              <Button
                onClick={() => {
                  handleRoleChange(EUserRole.USER);
                  handleLicenseChange(ELicenseType.FREE);
                }}
                variant="outline"
                className="w-full text-left"
              >
                🔸 시나리오 2: 무료 사용자
              </Button>

              <Button
                onClick={() => {
                  handleRoleChange(EUserRole.MANAGER);
                  handleLicenseChange(ELicenseType.PREMIUM);
                }}
                variant="outline"
                className="w-full text-left"
              >
                🔸 시나리오 3: 프리미엄 매니저
              </Button>

              <Button
                onClick={() => {
                  handleRoleChange(EUserRole.ADMIN);
                  handleLicenseChange(ELicenseType.ENTERPRISE);
                }}
                variant="outline"
                className="w-full text-left"
              >
                🔸 시나리오 4: 엔터프라이즈 관리자
              </Button>
            </div>
          </div>
        </div>

        {/* 통계 요약 */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📊 접근 권한 통계</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {routeAccessInfo.filter((r) => r.hasAccess).length}
              </div>
              <div className="text-sm text-green-800">접근 가능</div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">
                {routeAccessInfo.filter((r) => !r.hasAccess).length}
              </div>
              <div className="text-sm text-red-800">접근 불가</div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {navigationItems.length}
              </div>
              <div className="text-sm text-blue-800">네비게이션 카테고리</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {unifiedRoutes.length}
              </div>
              <div className="text-sm text-purple-800">총 라우트</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutingTestPage;
