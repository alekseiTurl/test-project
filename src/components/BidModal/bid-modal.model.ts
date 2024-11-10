import type { IUiSelectOptions } from '@/components/common/UiSelect/ui-select.model';

export interface IBidData {
  name: string | null;
  phone: string | null;
  type_of_room: IUiSelectOptions[] | IUiSelectOptions | null;
  address: string | null;
  area: {
    from: number | null;
    to: number | null;
  };
  date: {
    from: string | null;
    to: string | null;
  };
}
