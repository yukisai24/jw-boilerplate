import { motion, useAnimation } from 'framer-motion';

import { Button } from '@/components/ui/button';

function App() {
  const controls = useAnimation();
  const handleClick = async () => {
    // 먼저 즉시 opacity:0, rotate:0 상태로 되돌려 놓고
    await controls.start({
      opacity: 0.5,
      rotate: 0,
      // transition: { duration: 0 }, // 0초로 설정하여 순간적으로 초기화
    });
    // 다시 등장 애니메이션 재생
    await controls.start({
      opacity: 1,
      rotate: 360,
      // transition: { duration: 1 },
    });
  };
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
      <motion.div
        // 초기 상태: 투명도 0, 회전각도 0도
        initial={{ opacity: 0.5, rotate: 0 }}
        // 최종 상태: 투명도 1, 회전각도 360도
        animate={{ opacity: 1, rotate: 360 }}
        // 애니메이션 옵션: 1초간 진행
        transition={{ duration: 1 }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        빙글빙글
      </motion.div>
      <motion.div
        animate={controls}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        빙글빙글
      </motion.div>
    </>
  );
}

export default App;
