import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 접근 시도 정보 가져오기
  const { attemptedPath, routeTitle } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactAdmin = () => {
    // 관리자 연락처 페이지나 이메일 링크로 이동
    window.location.href = 'mailto:admin@yourcompany.com?subject=권한 요청';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="text-center max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* 경고 아이콘 */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          접근 권한이 없습니다
        </h1>

        <p className="text-gray-600 mb-2">
          {routeTitle ? `"${routeTitle}"` : '요청하신 페이지'}에 접근할 권한이
          없습니다.
        </p>

        {attemptedPath && (
          <p className="text-sm text-gray-500 mb-6">
            시도한 경로: {attemptedPath}
          </p>
        )}

        <div className="space-y-3">
          {/* 홈으로 이동 */}
          <Button
            onClick={handleGoHome}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            홈으로 이동
          </Button>

          {/* 이전 페이지로 */}
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full"
          >
            이전 페이지로
          </Button>

          {/* 관리자 문의 */}
          <Button
            onClick={handleContactAdmin}
            variant="ghost"
            className="w-full text-blue-600 hover:text-blue-700"
          >
            관리자에게 권한 요청
          </Button>
        </div>

        {/* 도움말 */}
        <div className="mt-8 text-xs text-gray-500">
          <p>
            이 페이지에 접근하려면 적절한 사용자 권한과 라이센스가 필요합니다.
            <br />
            궁금한 사항이 있으시면 관리자에게 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
