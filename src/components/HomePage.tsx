import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          🚀 권한 기반 라우팅 시스템
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          사용자 역할과 라이센스에 따른 동적 라우팅 및 권한 관리 시스템
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 주요 기능들 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold mb-2">권한 기반 접근 제어</h3>
            <p className="text-gray-600 text-sm">
              사용자 역할(GUEST, USER, MANAGER, ADMIN, SUPER_ADMIN)에 따른
              세분화된 접근 제어
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">
              라이센스 기반 기능 제한
            </h3>
            <p className="text-gray-600 text-sm">
              라이센스 타입(FREE, BASIC, PREMIUM, ENTERPRISE)에 따른 기능 차등
              제공
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🧭</div>
            <h3 className="text-lg font-semibold mb-2">동적 네비게이션</h3>
            <p className="text-gray-600 text-sm">
              사용자 권한에 따라 자동으로 생성되는 네비게이션 메뉴
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">보안 강화</h3>
            <p className="text-gray-600 text-sm">
              URL 구조 노출 방지 및 무단 접근 시도 감지
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">통합 관리</h3>
            <p className="text-gray-600 text-sm">
              단일 설정으로 모든 라우트의 권한과 라이센스 요구사항 관리
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">효율적 구조</h3>
            <p className="text-gray-600 text-sm">
              라이센스별 개별 관리 불필요, 메타데이터 기반 자동화
            </p>
          </div>
        </div>

        {/* 테스트 페이지 링크 */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            🧪 기능 테스트
          </h2>
          <p className="text-blue-800 mb-4">
            라우팅 권한 및 라이센스 기능을 실시간으로 테스트해보세요
          </p>
          <Link
            to="/test/routing"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            🚀 라우팅 테스트 페이지 이동
          </Link>
        </div>

        {/* 시스템 구조 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📋 시스템 구조
          </h2>

          <div className="text-left space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                🏗️ 라우트 구조
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    unifiedRoutes
                  </code>{' '}
                  - 통합된 라우트 설정
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    SmartLayout
                  </code>{' '}
                  - 자동 권한 체크
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    RouteItem
                  </code>{' '}
                  - 메타데이터 포함 라우트 타입
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                🔧 핵심 유틸리티
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    getAccessibleRoutes()
                  </code>{' '}
                  - 접근 가능한 라우트 필터링
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    generateNavigation()
                  </code>{' '}
                  - 동적 네비게이션 생성
                </li>
                <li>
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    checkRouteAccess()
                  </code>{' '}
                  - 개별 라우트 권한 체크
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                🎯 주요 개선점
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>라이센스별 개별 path JSON 구성 불필요</li>
                <li>권한 변경 시 한 곳만 수정</li>
                <li>URL 구조 노출 방지로 보안 강화</li>
                <li>네비게이션 메뉴 자동 생성</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
