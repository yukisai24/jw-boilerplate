import { ReactNode } from 'react';

export interface RouteItem {
  path: string;
  child?: RouteItem[];
  element: ReactNode;
}
