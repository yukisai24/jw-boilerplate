# ConditionalRender 컴포넌트 시스템

utils 디렉토리의 다양한 기능들을 활용한 강력한 조건부 렌더링 시스템입니다.

## 🚀 주요 기능

- **환경 기반 렌더링**: 개발/프로덕션 환경에 따른 조건부 표시
- **라이선스 기반 렌더링**: 사용자 라이선스 등급에 따른 기능 제어
- **권한 기반 렌더링**: 사용자 역할에 따른 접근 제어
- **기능 접근 렌더링**: 특정 기능 권한에 따른 표시 제어
- **통합 스마트 렌더링**: 여러 조건을 조합한 복합 제어
- **안전한 JSON 렌더링**: JSON 파싱 오류 방지
- **개발자 도구**: 개발 환경에서의 디버깅 지원

## 📦 컴포넌트 목록

### 1. ConditionalRender

가장 기본적인 조건부 렌더링 컴포넌트입니다.

```tsx
<ConditionalRender condition={isVisible}>
  <div>조건이 참일 때만 표시됩니다</div>
</ConditionalRender>
```

### 2. DevRender

개발 환경에서만 표시되는 컴포넌트입니다.

```tsx
<DevRender>
  <div>개발 환경에서만 보이는 내용</div>
</DevRender>

<DevRender isDev={false}>
  <div>프로덕션 환경에서만 보이는 내용</div>
</DevRender>
```

### 3. LicenseRender

사용자의 라이선스 등급에 따라 표시를 제어합니다.

```tsx
<LicenseRender
  requiredLicense={ELicenseType.PREMIUM}
  showError={true}
  fallback={<div>프리미엄 라이선스가 필요합니다</div>}
>
  <div>프리미엄 기능입니다</div>
</LicenseRender>
```

### 4. RoleRender

사용자의 권한에 따라 표시를 제어합니다.

```tsx
<RoleRender
  requiredRoles={[EUserRole.ADMIN, EUserRole.MANAGER]}
  showError={true}
>
  <div>관리자 또는 매니저만 볼 수 있습니다</div>
</RoleRender>
```

### 5. FeatureRender

특정 기능에 대한 접근 권한에 따라 표시를 제어합니다.

```tsx
<FeatureRender
  requiredFeatures={['advanced_analytics', 'export_data']}
  showError={true}
>
  <div>고급 분석 기능입니다</div>
</FeatureRender>
```

### 6. SmartRender

여러 조건을 조합하여 복합적인 제어를 수행합니다.

```tsx
<SmartRender
  conditions={{
    dev: true, // 개발 환경
    license: ELicenseType.PREMIUM, // 프리미엄 라이선스
    roles: [EUserRole.ADMIN], // 관리자 권한
    features: ['advanced_feature'], // 특정 기능 접근
    custom: someCustomCondition, // 커스텀 조건
  }}
  requireAll={true} // 모든 조건 만족 필요
  showError={true}
  fallback={<div>접근 권한이 없습니다</div>}
>
  <div>모든 조건을 만족하는 사용자만 볼 수 있습니다</div>
</SmartRender>
```

### 7. SafeJsonRender

JSON 파싱 오류를 안전하게 처리합니다.

```tsx
<SafeJsonRender
  jsonString={jsonData}
  fallback={<div>잘못된 JSON 형식입니다</div>}
>
  {(parsedData) => <div>{parsedData.name}</div>}
</SafeJsonRender>
```

### 8. DevToolsPanel

개발 환경에서 디버깅 정보를 표시하는 고정 패널입니다.

```tsx
<DevToolsPanel title="디버깅 정보">
  <div>환경: {process.env.NODE_ENV}</div>
  <div>사용자 권한: {currentUser?.role}</div>
</DevToolsPanel>
```

## 🔧 활용된 Utils

이 컴포넌트 시스템은 다음과 같은 utils 기능들을 활용합니다:

- **`utils/env.ts`**: 환경 변수 및 개발 모드 확인
- **`utils/license.ts`**: 라이선스 검증 및 권한 확인
- **`utils/helpers/tryParse.ts`**: 안전한 JSON 파싱
- **`@/hooks/useAuth`**: 사용자 인증 상태 관리

## 💡 사용 패턴

### 기본 패턴

```tsx
// 간단한 조건부 표시
<ConditionalRender condition={user.isLoggedIn}>
  <UserDashboard />
</ConditionalRender>
```

### 복합 조건 패턴

```tsx
// 여러 조건을 조합
<SmartRender
  conditions={{
    roles: [EUserRole.ADMIN],
    license: ELicenseType.ENTERPRISE,
  }}
  requireAll={true}
>
  <AdminPanel />
</SmartRender>
```

### 점진적 기능 제공 패턴

```tsx
// 라이선스에 따른 점진적 기능 제공
<LicenseRender requiredLicense={ELicenseType.FREE}>
  <BasicFeatures />
</LicenseRender>

<LicenseRender requiredLicense={ELicenseType.PREMIUM}>
  <PremiumFeatures />
</LicenseRender>

<LicenseRender requiredLicense={ELicenseType.ENTERPRISE}>
  <EnterpriseFeatures />
</LicenseRender>
```

### 개발 도구 패턴

```tsx
// 개발 환경에서만 표시되는 디버깅 도구
<DevRender>
  <DebugPanel />
</DevRender>

<DevToolsPanel title="API 상태">
  <ApiDebugger />
</DevToolsPanel>
```

## 🎯 실제 활용 예시

MainNavBar에서 개발 환경 전용 메뉴를 표시하는 예시:

```tsx
// MainNavBar/menus.tsx에서
export const menus: TMenu[] = [
  // 기존 메뉴들...

  // 개발 환경에서만 표시되는 메뉴
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

// 컴포넌트에서 사용
<DevRender>
  <MenuItem>개발자 전용 메뉴</MenuItem>
</DevRender>;
```

## 🚦 성능 고려사항

- 모든 조건 확인은 메모이제이션을 통해 최적화됩니다
- 불필요한 렌더링을 방지하기 위해 조건이 변경될 때만 재렌더링됩니다
- 개발 도구는 프로덕션 빌드에서 자동으로 제거됩니다

## 🔒 보안 고려사항

- 클라이언트 사이드 조건부 렌더링은 UI 편의성을 위한 것입니다
- 실제 보안은 서버 사이드에서 처리되어야 합니다
- 민감한 정보는 조건부 렌더링에 의존하지 말고 서버에서 제어하세요
