import { ButtonHTMLAttributes } from "react";
import "./TextButton.scss";

const colors: Record<string, string> = {
  red: "--red",
};

type TextButton = {
  color?: string;
};
type ButtonNative = ButtonHTMLAttributes<HTMLButtonElement>;
type TextButtonProps = TextButton & ButtonNative;

function TextButton({ color = "", ...props }: TextButtonProps) {
  return (
    <button
      {...props}
      className={`text__button${
        colors[color] ? ` text__button${colors[color]}` : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export default TextButton;
