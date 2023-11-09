export interface IMenuItem {
  icon: string;
  literal: string;
  clickAction: (message: string) => void;
}
