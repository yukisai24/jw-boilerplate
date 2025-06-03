export const Divider = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? 'w-px h-full bg-gray-300' : 'h-px w-full bg-gray-300'} />
  );