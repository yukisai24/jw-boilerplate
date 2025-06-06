import * as zod from 'zod';

import { IOption } from '@/types/common';

export const convertOptionToZodEnums = (option: string[] | IOption[], extractValue?: string[]) => {
  const formatOption = option.reduce((acc, item) => {
    if (typeof item === 'string' && !extractValue?.includes(item)) {
      acc.push(item);
    }

    if (typeof item === 'object' && !extractValue?.includes(item.value)) {
      acc.push(item.value);
    }

    return acc;
  }, [] as string[]);

  return zod.enum([...formatOption] as const as unknown as readonly [string, ...string[]]);
};
