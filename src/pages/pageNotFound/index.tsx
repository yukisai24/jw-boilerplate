import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';
import { Button, Icon } from '@tmax/tds';

import { PageTransition } from '@/components/ui/common/PageTransition';

import { PageNotFoundContainer } from '@/pages/pageNotFound/styled';

import { paths } from '@/routes/paths';
import theme from '@/theme/index';

const PageNotFound = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate(paths.index);
  };

  return (
    <PageTransition>
      <PageNotFoundContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          spacing={7}
        >
          <Icon name="tm_404_error" />

          <Button onClick={navigateToHomePage}>Go back</Button>
        </Stack>
        <Stack justifyContent="center">
          Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.
        </Stack>
      </PageNotFoundContainer>
    </PageTransition>
  );
};

export default PageNotFound;
