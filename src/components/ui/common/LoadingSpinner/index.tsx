export const LoadingSpinner = ({
  size = 5,
  color = 'gray-500',
}: {
  size?: number;
  color?: string;
}) => (
  <div
    className={`w-${size} h-${size} border-2 border-t-transparent animate-spin rounded-full border-${color}`}
  />
);
