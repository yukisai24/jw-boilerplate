import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { paths } from '@/routes/paths';
import { ELicenseStatus, ELicenseType } from '@/types/user';

interface ILicenseProtectedLayout {
  requiredLicenseTypes?: ELicenseType[];
  requiredLicenseStatus?: ELicenseStatus[];
  fallbackPath?: string;
}

const LicenseProtectedLayout = ({
  requiredLicenseTypes = [],
  requiredLicenseStatus = [ELicenseStatus.ACTIVE],
  fallbackPath = paths.license.upgrade,
}: ILicenseProtectedLayout) => {
  const { currentUser, authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 인증되지 않은 사용자
    if (!authenticated) {
      navigate(paths.auth.logIn, { replace: true });
      return;
    }

    // 라이센스가 없는 사용자
    if (!currentUser?.license) {
      navigate(paths.license.subscription, { replace: true });
      return;
    }

    const { license } = currentUser;

    // 라이센스 상태 체크
    if (
      requiredLicenseStatus.length > 0 &&
      !requiredLicenseStatus.includes(license.status)
    ) {
      if (license.status === ELicenseStatus.EXPIRED) {
        navigate(paths.license.subscription, { replace: true });
      } else if (license.status === ELicenseStatus.SUSPENDED) {
        navigate(paths.license.billing, { replace: true });
      } else {
        navigate(fallbackPath, { replace: true });
      }
      return;
    }

    // 라이센스 타입 체크
    if (
      requiredLicenseTypes.length > 0 &&
      !requiredLicenseTypes.includes(license.type)
    ) {
      navigate(fallbackPath, { replace: true });
      return;
    }
  }, [
    authenticated,
    currentUser,
    navigate,
    requiredLicenseTypes,
    requiredLicenseStatus,
    fallbackPath,
  ]);

  return <Outlet />;
};

export default LicenseProtectedLayout;
