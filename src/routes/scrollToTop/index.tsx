import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Fab, Fade, Typography, useScrollTrigger } from '@mui/material';

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>(
    undefined,
  );
  const location = useLocation();
  const trigger = useScrollTrigger({ target: scrollTarget });

  const [isMounted, setIsMounted] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const floatButton = document.getElementById('float-button-scroll-to-top');
      if (floatButton) {
        floatButton?.click?.();
      }
    }
  }, [location.pathname, isMounted]);

  return (
    <Box
      ref={(node) => {
        if (node) {
          setScrollTarget(node as Node | Window);
        }
      }}
      sx={{
        overflowY: 'scroll',
        scrollbarGutter: 'stable edges',
        height: '100vh',
        minHeight: '100%',
        width: '100vw',
      }}
    >
      {children}
      <Fade in={trigger}>
        <Box
          id="float-button-scroll-to-top"
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 50, right: 50 }}
        >
          <Fab
            sx={({ palette }) => ({
              backgroundColor: palette.layer['01'],
              border: '2px solid',
              borderColor: palette.button.primary,
              outline: '4px solid',
              outlineColor: palette.purple[100],
              width: 60,
              height: 60,
            })}
          >
            <Typography
              variant="service_bodyB"
              color={({ palette }) => palette.text.brandPrimary}
            >
              TOP
            </Typography>
          </Fab>
        </Box>
      </Fade>
    </Box>
  );
};

export default ScrollToTop;
