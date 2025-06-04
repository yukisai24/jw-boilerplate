import { PropsWithChildren, useEffect } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom';

// 페이지 이동 시 스크롤 최상단 이동
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return null;
};

// #앵커 스크롤 처리: #anchor가 URL에 포함되면 해당 요소로 부드럽게 이동
const HashScroll = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location]);

  return null;
};

// 통합 ScrollManager 컴포넌트
const ScrollManager = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ScrollRestoration />
      <ScrollToTop />
      <HashScroll />
      {children}
    </>
  );
};

export default ScrollManager;
