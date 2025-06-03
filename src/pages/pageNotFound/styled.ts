import { Stack, styled } from '@mui/material';

export const PageNotFoundContainer = styled(Stack)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background?.default,
  padding: theme.spacing(8),
  position: 'relative',
  flexDirection: 'column',
}));
