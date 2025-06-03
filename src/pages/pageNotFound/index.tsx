import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';
import { Button } from '@tmax/tds';

import { PageNotFoundContainer } from '@/pages/pageNotFound/styled';

import { paths } from '@/routes/paths';
import theme from '@/theme/index';

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
        spacing={2}
      >
        <Typography
          variant="h1"
          fontSize={'64px'}
          fontWeight={theme.typography.fontWeightBold}
        >
          404
        </Typography>

        <Button onClick={navigateToHomePage}>Go back</Button>
      </Stack>
      <Stack justifyContent="center">
        Copyrightⓒ 2023. TmaxSoft, All Rights Reserved.
      </Stack>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
