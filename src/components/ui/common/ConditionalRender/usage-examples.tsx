import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { ELicenseType, EUserRole } from '@/types/user';

import {
  ConditionalRender,
  DevRender,
  DevToolsPanel,
  FeatureRender,
  LicenseRender,
  RoleRender,
  SafeJsonRender,
  SmartRender,
} from './index';

/**
 * ConditionalRender 컴포넌트들의 사용 예시를 보여주는 데모 컴포넌트
 */
const ConditionalRenderExamples = () => {
  const [showBasicExample, setShowBasicExample] = useState(false);
  const [testJsonString, setTestJsonString] = useState(
    '{"name": "테스트", "value": 123}',
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        🎯 ConditionalRender 컴포넌트 사용 예시
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, color: 'text.secondary' }}
      >
        utils 디렉토리의 다양한 기능들을 활용한 조건부 렌더링 시스템입니다.
      </Typography>

      <Stack spacing={4}>
        {/* 1. 기본 조건부 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              1️⃣ 기본 조건부 렌더링
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setShowBasicExample(!showBasicExample)}
              sx={{ mb: 2 }}
            >
              토글 (현재: {showBasicExample ? 'ON' : 'OFF'})
            </Button>

            <ConditionalRender condition={showBasicExample}>
              <Alert severity="success">✅ 조건이 참일 때만 보입니다!</Alert>
            </ConditionalRender>
          </CardContent>
        </Card>

        {/* 2. 개발 환경 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              2️⃣ 개발 환경 전용 렌더링
            </Typography>

            <DevRender>
              <Typography variant="body2">
                이 내용은 개발 환경에서만 표시됩니다.
              </Typography>
              <Chip
                label="개발 모드 전용"
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            </DevRender>

            <DevRender isDev={false}>
              <Typography variant="body2">
                이 내용은 프로덕션 환경에서만 표시됩니다.
              </Typography>
              <Chip
                label="프로덕션 전용"
                color="secondary"
                size="small"
                sx={{ mt: 1 }}
              />
            </DevRender>
          </CardContent>
        </Card>

        {/* 3. 라이선스 기반 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              3️⃣ 라이선스 기반 렌더링
            </Typography>

            <Stack spacing={2}>
              <LicenseRender
                requiredLicense={ELicenseType.FREE}
                showError={true}
              >
                <Alert severity="info">
                  🆓 FREE 라이선스 이상에서 사용 가능한 기능
                </Alert>
              </LicenseRender>

              <LicenseRender
                requiredLicense={ELicenseType.PREMIUM}
                fallback={
                  <Alert severity="warning">
                    ⭐ PREMIUM 라이선스가 필요한 기능입니다.
                  </Alert>
                }
              >
                <Alert severity="success">
                  🌟 PREMIUM 전용 고급 기능을 사용할 수 있습니다!
                </Alert>
              </LicenseRender>
            </Stack>
          </CardContent>
        </Card>

        {/* 4. 권한 기반 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              4️⃣ 권한 기반 렌더링
            </Typography>

            <Stack spacing={2}>
              <RoleRender
                requiredRoles={[EUserRole.USER, EUserRole.ADMIN]}
                showError={true}
              >
                <Alert severity="info">
                  👤 일반 사용자 및 관리자가 볼 수 있는 내용
                </Alert>
              </RoleRender>

              <RoleRender
                requiredRoles={EUserRole.ADMIN}
                fallback={
                  <Alert severity="error">🔒 관리자 권한이 필요합니다.</Alert>
                }
              >
                <Alert severity="warning">👑 관리자 전용 기능입니다.</Alert>
              </RoleRender>
            </Stack>
          </CardContent>
        </Card>

        {/* 5. 기능 접근 기반 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              5️⃣ 기능 접근 기반 렌더링
            </Typography>

            <FeatureRender
              requiredFeatures={['advanced_analytics', 'export_data']}
              showError={true}
            >
              <Alert severity="success">
                📊 고급 분석 및 데이터 내보내기 기능 사용 가능
              </Alert>
            </FeatureRender>
          </CardContent>
        </Card>

        {/* 6. 통합 스마트 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              6️⃣ 통합 스마트 렌더링
            </Typography>

            <Stack spacing={2}>
              {/* 개발환경 + 관리자 권한 (모두 필요) */}
              <SmartRender
                conditions={{
                  dev: true,
                  roles: [EUserRole.ADMIN, EUserRole.SUPER_ADMIN],
                }}
                requireAll={true}
                showError={true}
              >
                <Alert severity="info">
                  🔧👑 개발환경에서 관리자만 볼 수 있는 디버깅 정보
                </Alert>
              </SmartRender>

              {/* 프리미엄 라이선스 또는 관리자 권한 (하나만 필요) */}
              <SmartRender
                conditions={{
                  license: ELicenseType.PREMIUM,
                  roles: [EUserRole.ADMIN],
                }}
                requireAll={false}
                fallback={
                  <Alert severity="warning">
                    PREMIUM 라이선스 또는 관리자 권한이 필요합니다.
                  </Alert>
                }
              >
                <Alert severity="success">
                  🌟 프리미엄 기능 또는 관리자 도구에 접근할 수 있습니다!
                </Alert>
              </SmartRender>
            </Stack>
          </CardContent>
        </Card>

        {/* 7. 안전한 JSON 렌더링 */}
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              7️⃣ 안전한 JSON 렌더링
            </Typography>

            <Stack spacing={2}>
              <SafeJsonRender
                jsonString={testJsonString}
                fallback={<Alert severity="error">잘못된 JSON 형식</Alert>}
              >
                {(data) => (
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="subtitle2">
                      파싱된 JSON 데이터:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="pre"
                    >
                      {JSON.stringify(data, null, 2)}
                    </Typography>
                  </Box>
                )}
              </SafeJsonRender>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setTestJsonString('잘못된 JSON')}
              >
                잘못된 JSON으로 테스트
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  setTestJsonString('{"name": "테스트", "value": 123}')
                }
              >
                올바른 JSON으로 복원
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* 개발자 도구 패널 */}
      <DevToolsPanel title="ConditionalRender 디버깅">
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 1 }}
          >
            현재 환경 정보:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
          >
            • 개발 모드: {process.env.NODE_ENV === 'development' ? '✅' : '❌'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
          >
            • 빌드 시간: {new Date().toLocaleString()}
          </Typography>
        </Box>
      </DevToolsPanel>
    </Box>
  );
};

export default ConditionalRenderExamples;
