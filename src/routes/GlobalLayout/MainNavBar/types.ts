import { ReactNode } from 'react';

import { EUserRole } from '@/types/user';

export type TMenu = {
  path: string;
  label: string;
  icon?: ReactNode;
  child?: TMenu[];
  id: string;
  acceptedRole?: EUserRole[];
};

export type TMenuDisplayStatus = { [key: string]: boolean };
