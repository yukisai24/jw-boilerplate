import { IOption } from '@/types/common';

export const convertToOption = <TData>({
  data,
  valueField,
  labelField,
  defaultOption = [],
  isFetching,
}: {
  data?: TData[];
  valueField: keyof TData;
  labelField: keyof TData;
  defaultOption?: IOption[];
  isFetching: boolean;
}) => {
  if (isFetching) {
    return defaultOption;
  }

  if (!data?.length) {
    return defaultOption;
  }

  const options = data.map((item) => ({
    value: String(item[valueField] || ''),
    label: item[labelField] as string,
  }));

  return [...defaultOption, ...options];
};
