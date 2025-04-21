import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
  isLoading?: boolean;
  onClick: () => void;
};

export default function RefreshButton({ isLoading, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="gap-2 text-sm"
    >
      <motion.div
        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          repeat: isLoading ? Infinity : 0,
          duration: 0.8,
          ease: 'linear',
        }}
      >
        <RotateCw className="w-4 h-4" />
      </motion.div>
      새로고침
    </Button>
  );
}
