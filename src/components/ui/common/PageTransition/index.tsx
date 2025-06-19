import { useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.div
        layout
        key={location.pathname} // 페이지 경로를 기준으로 재생
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          position: 'absolute', // or 'fixed' depending on context
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh', // ✅ height를 명확하게 지정
          overflow: 'hidden', // ✅ 내부 요소가 튀는 것 방지
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
