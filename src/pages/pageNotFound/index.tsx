import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';
import { Button, Icon, Loading } from '@tmax/tds';

import { PageTransition } from '@/components/ui/common/PageTransition';

import { PageNotFoundContainer } from '@/pages/pageNotFound/styled';

import { paths } from '@/routes/paths';

const PageNotFound = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate(paths.index);
  };

  return (
    <PageNotFoundContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        spacing={7}
      >
        <Icon
          name="tm_404_error"
          fallback={<Loading fullpage />}
        />
        <Button onClick={navigateToHomePage}>Go back</Button>
      </Stack>
      <Stack justifyContent="center">
        Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.
      </Stack>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
