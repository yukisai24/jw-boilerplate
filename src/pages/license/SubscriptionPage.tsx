import React from 'react';

const SubscriptionPage: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '0원',
      features: ['기본 기능', '월 100회 사용', '이메일 지원'],
      current: false,
    },
    {
      name: 'Basic',
      price: '월 29,000원',
      features: ['모든 기본 기능', '월 1,000회 사용', '우선 지원'],
      current: false,
    },
    {
      name: 'Premium',
      price: '월 99,000원',
      features: ['모든 기능', '무제한 사용', '24/7 지원', '고급 분석'],
      current: true,
    },
    {
      name: 'Enterprise',
      price: '문의',
      features: ['맞춤 기능', '전담 매니저', '온사이트 지원', 'SLA 보장'],
      current: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">구독 관리</h1>
        <p className="mt-2 text-gray-600">
          현재 구독 플랜을 관리하고 변경하세요
        </p>
      </div>

      {/* 현재 구독 정보 */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            현재 구독 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                플랜
              </label>
              <div className="mt-1 text-lg font-semibold text-indigo-600">
                Premium
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                다음 결제일
              </label>
              <div className="mt-1 text-lg text-gray-900">2024.01.15</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                결제 방법
              </label>
              <div className="mt-1 text-lg text-gray-900">
                **** **** **** 1234
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 플랜 비교 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
            플랜 비교 및 변경
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 ${
                  plan.current
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                  </div>
                  {plan.current && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        현재 플랜
                      </span>
                    </div>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0">
                        <span className="text-green-500">✓</span>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {plan.current ? (
                    <button
                      type="button"
                      disabled
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed"
                    >
                      현재 플랜
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {index > 2 ? '상담 문의' : '플랜 변경'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
