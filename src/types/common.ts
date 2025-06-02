import { ReactNode } from 'react';

import { Dayjs } from 'dayjs';

export interface IOption<TValue extends string | number | boolean = string> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

export type TOptionReactLabel<
  TValue extends string | number | boolean = string,
> = Omit<IOption<TValue>, 'label'> & {
  label: string | ReactNode;
};

export type TSize = 'medium' | 'large';
export type TSizeOption = TSize | 'small';
export type TDirection = 'row' | 'column';
export type TLabelColor = 'primary' | 'secondary';
export type TAlign = 'left' | 'center' | 'right';
export type TSort = 'asc' | 'desc' | 'none';
export type TExtensions =
  | '*'
  | '.json'
  | '.csv'
  | '.xls'
  | '.xlsx'
  | '.xml'
  | '.doc'
  | '.hwp'
  | '.ppt'
  | '.pdf'
  | '.jpg'
  | '.gif'
  | '.png';
export interface IPlainObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type TDateRangePicker = {
  minDate: Dayjs | null | string;
  maxDate: Dayjs | null | string;
};
