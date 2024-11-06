export interface IUiButton {
  text: string;
  type: DefaultButtonType;
  disabled?: boolean;
  view: string;
}

type DefaultButtonType = 'button' | 'submit' | 'reset' | undefined;
