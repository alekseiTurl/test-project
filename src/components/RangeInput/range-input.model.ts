import type { DefaultInputType } from '@/components/common/UiInput/ui-input.model';
export interface IRangeInput {
  titleText: string;
  modelValue: IRangeInputValue;
  type: DefaultInputType;
  disable?: boolean;
  view: string;
  range?: {
    max: string | number;
    min: string | number;
  };
}

export interface IRangeInputValue {
  from: number | string | null;
  to: number | string | null;
}
