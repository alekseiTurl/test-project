export interface IUiSelect {
  label: string;
  options: IUiSelectOptions[];
  modelValue: IUiSelectOptions | null;
  disable?: boolean;
  view: string;
}

export interface IUiSelectOptions {
  label: string;
  value: string | number | null;
}
