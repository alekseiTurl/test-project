export interface IUiInput {
  modelValue: string | number | null;
  type: DefaultInputType;
  placeholder?: string;
  disable?: boolean;
  readonly?: boolean;
  stackLabel?: boolean;
  label?: string;
  view: string;
}

type DefaultInputType =
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
