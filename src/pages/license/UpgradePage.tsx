import React from 'react';

const UpgradePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">플랜 업그레이드</h1>
        <p className="mt-4 text-xl text-gray-600">
          더 많은 기능과 혜택을 누려보세요
        </p>
      </div>

      {/* 현재 플랜 */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-indigo-700">
              현재 <strong>Premium</strong> 플랜을 사용 중입니다. 더 강력한
              기능이 필요하시다면 Enterprise로 업그레이드해보세요.
            </p>
          </div>
        </div>
      </div>

      {/* 업그레이드 옵션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Enterprise 플랜 */}
        <div className="relative bg-white border-2 border-indigo-500 rounded-2xl shadow-xl">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              추천
            </span>
          </div>

          <div className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-5xl font-bold text-gray-900">
                문의
                <span className="text-base font-medium text-gray-500">/월</span>
              </p>
              <p className="mt-2 text-gray-500">맞춤형 솔루션</p>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">무제한 사용량</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">전담 계정 매니저</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">24/7 우선 지원</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">맞춤형 기능 개발</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">온사이트 교육</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-lg">✓</span>
                <span className="ml-3 text-gray-600">SLA 99.9% 보장</span>
              </li>
            </ul>

            <div className="mt-8">
              <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                영업팀 상담 문의
              </button>
            </div>
          </div>
        </div>

        {/* 추가 서비스 */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">추가 서비스</h3>
              <p className="mt-2 text-gray-500">
                현재 플랜에 추가할 수 있는 서비스
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    추가 사용자 (10명)
                  </h4>
                  <p className="text-sm text-gray-500">월 20,000원</p>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  추가
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">프리미엄 지원</h4>
                  <p className="text-sm text-gray-500">월 50,000원</p>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  추가
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">고급 분석</h4>
                  <p className="text-sm text-gray-500">월 30,000원</p>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 업그레이드 혜택 */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          업그레이드 시 추가 혜택
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h4 className="font-semibold text-gray-900">성능 향상</h4>
            <p className="text-sm text-gray-600 mt-2">
              더 빠른 처리 속도와 안정성
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h4 className="font-semibold text-gray-900">강화된 보안</h4>
            <p className="text-sm text-gray-600 mt-2">
              엔터프라이즈급 보안 기능
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h4 className="font-semibold text-gray-900">전담 지원</h4>
            <p className="text-sm text-gray-600 mt-2">
              전담 매니저와 우선 지원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
