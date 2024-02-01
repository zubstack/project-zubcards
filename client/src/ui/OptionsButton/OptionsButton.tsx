import { ButtonHTMLAttributes } from "react";
import "./OptionsButton.scss";

type OptionsButton = {
  onClick: () => void;
};

type ButtonNative = ButtonHTMLAttributes<HTMLButtonElement>;
type OptionsButtonProps = ButtonNative & OptionsButton;

function OptionsButton({ children, onClick }: OptionsButtonProps) {
  return (
    <button onClick={onClick} className="options__button">
      {children}
    </button>
  );
}

export default OptionsButton;
