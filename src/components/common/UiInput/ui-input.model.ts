import type { ErrorObject } from '@vuelidate/core';

export interface IUiInput {
  modelValue: string | number | null;
  type: DefaultInputType;
  placeholder?: string;
  disable?: boolean;
  readonly?: boolean;
  stackLabel?: boolean;
  label?: string;
  view: string;
  rightText?: boolean;
  labelStatic?: boolean;
  range?: {
    max: string | number;
    min: string | number;
  };
  error?: ErrorObject[];
}

export type DefaultInputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'url'
  | 'tel'
  | 'search'
  | 'date'
  | 'month'
  | 'week'
  | 'time'
  | 'datetime-local'
  | 'color';
