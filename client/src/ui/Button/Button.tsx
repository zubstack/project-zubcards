import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

type DefaultButton = {
  disabled?: boolean;
};
type ButtonNative = ButtonHTMLAttributes<HTMLButtonElement>;
type DefaultButtonProps = DefaultButton & ButtonNative;

function Button(props: DefaultButtonProps) {
  return <button {...props}>{props.children as ReactNode}</button>;
}

export default Button;
