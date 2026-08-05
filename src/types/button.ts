export type TButton = {
  type?: "button" | "submit";
  label: string;
  style?: string;
  onClickFn?: () => void;
};
