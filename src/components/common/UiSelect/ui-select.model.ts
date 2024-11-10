import type { ErrorObject } from '@vuelidate/core';

export interface IUiSelect {
  label: string;
  options: IUiSelectOptions[];
  modelValue: IUiSelectOptions[] | IUiSelectOptions | null;
  disable?: boolean;
  view: string;
  multiply?: boolean;
  error?: ErrorObject[];
}

export interface IUiSelectOptions {
  label: string;
  value: string | number | null;
}
