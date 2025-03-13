import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

function App() {
  return (
    <>
      <div className="text-3xl bg-blue-500">Tailwind Css 적용 테스트</div>
      <Button>Click me</Button>
      <Button variant="destructive">Click me</Button>
      <motion.div
        initial={{ x: -100, opacity: 0 }} // 시작 시 왼쪽으로 100px 이동 및 투명 상태
        animate={{ x: 0, opacity: 1 }} // 애니메이션 후 제자리와 불투명 상태
        transition={{ duration: 0.5 }} // 애니메이션 지속 시간 0.5초
      >
        콘텐츠 내용
      </motion.div>
    </>
  );
}

export default App;
