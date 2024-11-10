import type { DefaultInputType } from '@/components/common/UiInput/ui-input.model';
import type { ErrorObject } from '@vuelidate/core';

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
  error?: ErrorObject[];
}

export interface IRangeInputValue {
  from: number | string | null;
  to: number | string | null;
}
