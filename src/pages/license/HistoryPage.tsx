import React from 'react';

const HistoryPage: React.FC = () => {
  const historyData = [
    {
      date: '2024.01.01',
      action: '플랜 결제',
      plan: 'Premium',
      amount: '99,000원',
      status: '완료',
    },
    {
      date: '2023.12.15',
      action: '플랜 업그레이드',
      plan: 'Basic → Premium',
      amount: '70,000원',
      status: '완료',
    },
    {
      date: '2023.12.01',
      action: '플랜 결제',
      plan: 'Basic',
      amount: '29,000원',
      status: '완료',
    },
    {
      date: '2023.11.15',
      action: '계정 생성',
      plan: 'Free',
      amount: '-',
      status: '완료',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">라이센스 이력</h1>
        <p className="mt-2 text-gray-600">
          플랜 변경 및 결제 이력을 확인하세요
        </p>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="date-from"
                className="block text-sm font-medium text-gray-700"
              >
                시작 날짜
              </label>
              <input
                type="date"
                id="date-from"
                name="date-from"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="date-to"
                className="block text-sm font-medium text-gray-700"
              >
                종료 날짜
              </label>
              <input
                type="date"
                id="date-to"
                name="date-to"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="action-type"
                className="block text-sm font-medium text-gray-700"
              >
                활동 유형
              </label>
              <select
                id="action-type"
                name="action-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>전체</option>
                <option>결제</option>
                <option>업그레이드</option>
                <option>다운그레이드</option>
                <option>취소</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                검색
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 이력 타임라인 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              활동 이력
            </h3>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              CSV 내보내기
            </button>
          </div>

          <div className="flow-root">
            <ul className="-mb-8">
              {historyData.map((item, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== historyData.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            item.action === '플랜 결제'
                              ? 'bg-green-500'
                              : item.action === '플랜 업그레이드'
                                ? 'bg-blue-500'
                                : item.action === '플랜 다운그레이드'
                                  ? 'bg-yellow-500'
                                  : item.action === '계정 생성'
                                    ? 'bg-purple-500'
                                    : 'bg-gray-500'
                          }`}
                        >
                          <span className="text-white text-xs">
                            {item.action === '플랜 결제'
                              ? '💳'
                              : item.action === '플랜 업그레이드'
                                ? '⬆️'
                                : item.action === '플랜 다운그레이드'
                                  ? '⬇️'
                                  : item.action === '계정 생성'
                                    ? '🎉'
                                    : '📋'}
                          </span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {item.action}
                            </span>
                            {' - '}
                            <span className="font-medium">{item.plan}</span>
                          </p>
                          {item.amount !== '-' && (
                            <p className="mt-1 text-sm text-gray-500">
                              결제 금액:{' '}
                              <span className="font-medium text-gray-900">
                                {item.amount}
                              </span>
                            </p>
                          )}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                              item.status === '완료'
                                ? 'bg-green-100 text-green-800'
                                : item.status === '처리중'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{item.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                이전
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                다음
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">1</span>부터{' '}
                  <span className="font-medium">4</span>까지, 총{' '}
                  <span className="font-medium">4</span>개 항목
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    이전
                  </button>
                  <button className="bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    다음
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
