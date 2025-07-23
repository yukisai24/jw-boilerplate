import React from 'react';

import {
  useAccessControl,
  useFeatureAccess,
  useMultiAccessControl,
} from '@/hooks/useAccessControl';
import { ELicenseType, EUserRole } from '@/types/user';

/**
 * 예시 1: 기본적인 권한 + 라이센스 체크
 */
const PremiumManagerFeature = () => {
  const { hasAccess, message, currentRole, currentLicenseType } =
    useAccessControl({
      requiredRoles: [
        EUserRole.MANAGER,
        EUserRole.ADMIN,
        EUserRole.SUPER_ADMIN,
      ],
      requiredLicenseTypes: [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE],
      requireBoth: true, // 매니저 이상 권한 AND 프리미엄 이상 라이센스
    });

  if (!hasAccess) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="text-red-800 font-semibold">접근 불가</h3>
        <p className="text-red-600">{message}</p>
        <p className="text-sm text-red-500">
          현재: {currentRole} / {currentLicenseType}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-green-800 font-semibold">프리미엄 매니저 기능</h3>
      <p className="text-green-600">고급 분석 대시보드에 접근할 수 있습니다.</p>
    </div>
  );
};

/**
 * 예시 2: 특정 기능 체크
 */
const AdvancedAnalyticsFeature = () => {
  const { hasFeatureAccess, featureMessage, hasAccess } = useFeatureAccess(
    'advanced_analytics',
    {
      requiredRoles: [EUserRole.USER, EUserRole.MANAGER, EUserRole.ADMIN],
      requiredLicenseTypes: [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE],
    },
  );

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">고급 분석 기능</h3>

      {hasFeatureAccess ? (
        <div className="text-green-600">
          ✅ 고급 분석 기능을 사용할 수 있습니다.
        </div>
      ) : (
        <div className="text-orange-600">⚠️ {featureMessage}</div>
      )}
    </div>
  );
};

/**
 * 예시 3: OR 조건 (권한 또는 라이센스 중 하나만 필요)
 */
const FlexibleAccessFeature = () => {
  const { hasAccess, hasRole, hasLicense, message } = useAccessControl({
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    requiredLicenseTypes: [ELicenseType.ENTERPRISE],
    requireBoth: false, // 관리자 권한 OR 엔터프라이즈 라이센스
  });

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">유연한 접근 기능</h3>
      <div className="space-y-1 text-sm">
        <p>권한 체크: {hasRole ? '✅' : '❌'}</p>
        <p>라이센스 체크: {hasLicense ? '✅' : '❌'}</p>
        <p
          className={`font-medium ${hasAccess ? 'text-green-600' : 'text-red-600'}`}
        >
          {hasAccess ? '접근 가능' : message}
        </p>
      </div>
    </div>
  );
};

/**
 * 예시 4: 여러 조건 동시 체크
 */
const MultiConditionCheck = () => {
  const conditions = [
    {
      requiredRoles: [EUserRole.ADMIN],
      requiredLicenseTypes: [ELicenseType.PREMIUM],
      requireBoth: true,
    },
    {
      requiredRoles: [EUserRole.SUPER_ADMIN],
      requireBoth: false, // 슈퍼 관리자는 라이센스 불문
    },
    {
      requiredLicenseTypes: [ELicenseType.ENTERPRISE],
      requireBoth: false, // 엔터프라이즈 라이센스는 권한 불문
    },
  ];

  const { hasAnyAccess, hasAllAccess, grantedConditions, deniedConditions } =
    useMultiAccessControl(conditions);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">다중 조건 체크</h3>
      <div className="space-y-2 text-sm">
        <p>하나라도 충족: {hasAnyAccess ? '✅' : '❌'}</p>
        <p>모두 충족: {hasAllAccess ? '✅' : '❌'}</p>
        <p>충족된 조건: {grantedConditions.length}개</p>
        <p>미충족 조건: {deniedConditions.length}개</p>

        {hasAnyAccess && (
          <div className="mt-2 p-2 bg-blue-50 rounded">
            <p className="text-blue-800 font-medium">특별 기능 활성화!</p>
            <p className="text-blue-600">
              여러 조건 중 하나 이상을 만족합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 예시 5: 실시간 권한 체크 버튼
 */
const DynamicAccessButton = () => {
  const adminAccess = useAccessControl({
    requiredRoles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
  });

  const premiumAccess = useAccessControl({
    requiredLicenseTypes: [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE],
  });

  const fullAccess = useAccessControl({
    requiredRoles: [EUserRole.MANAGER, EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
    requiredLicenseTypes: [ELicenseType.PREMIUM, ELicenseType.ENTERPRISE],
    requireBoth: true,
  });

  const handleAdminAction = () => {
    if (adminAccess.hasAccess) {
      alert('관리자 기능을 실행합니다.');
    } else {
      alert(`접근 불가: ${adminAccess.message}`);
    }
  };

  const handlePremiumAction = () => {
    if (premiumAccess.hasAccess) {
      alert('프리미엄 기능을 실행합니다.');
    } else {
      alert(`접근 불가: ${premiumAccess.message}`);
    }
  };

  const handleFullAction = () => {
    if (fullAccess.hasAccess) {
      alert('최고급 기능을 실행합니다.');
    } else {
      alert(`접근 불가: ${fullAccess.message}`);
    }
  };

  return (
    <div className="p-4 border rounded space-y-3">
      <h3 className="font-semibold mb-2">동적 접근 제어 버튼</h3>

      <button
        onClick={handleAdminAction}
        className={`px-4 py-2 rounded ${
          adminAccess.hasAccess
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!adminAccess.hasAccess}
      >
        관리자 기능 (권한만)
      </button>

      <button
        onClick={handlePremiumAction}
        className={`px-4 py-2 rounded ${
          premiumAccess.hasAccess
            ? 'bg-purple-500 text-white hover:bg-purple-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!premiumAccess.hasAccess}
      >
        프리미엄 기능 (라이센스만)
      </button>

      <button
        onClick={handleFullAction}
        className={`px-4 py-2 rounded ${
          fullAccess.hasAccess
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!fullAccess.hasAccess}
      >
        최고급 기능 (권한 + 라이센스)
      </button>
    </div>
  );
};

/**
 * 메인 예시 컴포넌트
 */
const AccessControlExamples = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        권한 + 라이센스 동시 적용 예시
      </h1>

      <div className="grid gap-6">
        <PremiumManagerFeature />
        <AdvancedAnalyticsFeature />
        <FlexibleAccessFeature />
        <MultiConditionCheck />
        <DynamicAccessButton />
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold text-gray-800 mb-2">💡 핵심 개념</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • <code>requireBoth: true</code> → 권한 AND 라이센스 (둘 다 필요)
          </li>
          <li>
            • <code>requireBoth: false</code> → 권한 OR 라이센스 (하나만 필요)
          </li>
          <li>• 다양한 조건을 조합하여 세밀한 접근 제어 가능</li>
          <li>• 실시간으로 권한 변경 감지 및 UI 업데이트</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessControlExamples;
