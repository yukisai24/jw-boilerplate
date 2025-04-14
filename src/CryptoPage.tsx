import { useGetCoins } from '@/config/cryptoHooks';

export default function CoinList() {
  const { data, isLoading, error } = useGetCoins({
    queryParam: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <ul>
      {data?.map((coin: any) => (
        <li
          key={coin.id}
          className="border p-2 flex justify-between"
        >
          <div className="flex items-center gap-2">
            <img
              src={coin.image}
              alt={coin.name}
              className="w-6 h-6"
            />
            {coin.name} ({coin.symbol.toUpperCase()})
          </div>
          <div className="text-right">
            <div>
              ${coin.current_price.toLocaleString()}
            </div>
            <div
              className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
