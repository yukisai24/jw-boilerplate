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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed', // or 'fixed' depending on context
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
