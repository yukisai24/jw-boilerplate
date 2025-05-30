import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGetCoins } from '@/config/cryptoHooks';

import CoinItem from './components/ui/coinItem';
import RefreshButton from './components/ui/refreshButton';

export default function CoinList() {
  const [currency, setCurrency] = useState<'usd' | 'krw'>('usd');
  const symbol = currency === 'usd' ? '$' : '₩';
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isFetching, error, refetch } = useGetCoins({
    queryParams: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: 5,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    },
  });
  const filteredCoins = data?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );
  // if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;
  console.log('isLoading', isLoading);
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 암호화폐 리스트</h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-2">
          <RefreshButton
            isLoading={isFetching}
            onClick={refetch}
          />

          <select
            className="border px-2 py-1 text-sm rounded"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option valuㄴe="uㄴsd">USD ($)</option>
            <option value="krw">KRW (₩)</option>
            <option value="eur">EUR (€)</option>
          </select>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="코인 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-sm w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft className="w-4 h-4" /> 이전
        </Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button
          variant="ghost"
          onClick={() => setPage((p) => p + 1)}
        >
          다음 <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div>
        <AnimatePresence>
          {filteredCoins?.map((coin) => (
            <CoinItem
              key={coin.id}
              coin={coin}
              currency={currency}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
