import { motion } from 'framer-motion';
import { ChevronDown, RotateCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CoinItem = ({ coin, currency }) => {
  const isUp = coin.price_change_percentage_24h >= 0;

  return (
    <Card className="flex items-center justify-between px-4 py-3 mb-2 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-8 h-8"
        />
        <div className="font-medium">{coin.name}</div>
      </div>
      <div className="text-right">
        <div className="text-base font-semibold text-gray-800">
          {currency}
          {Number(coin.current_price).toLocaleString()}
        </div>
        <div className={`text-sm ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? '▲' : '▼'} {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </Card>
  );
};

export default CoinItem;
