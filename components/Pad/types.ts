export interface Props {
  onClickPadButton: Function;
  enterButtonDisabled: boolean;
}

export interface ButtonProps {
  onClick: VoidFunction;
  children: React.ReactNode;
}
