import "./TextButton.scss";

const colors = {
  red: "--red",
};

function TextButton({ children, onClick, color, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`text__button${
        colors[color] ? ` text__button${colors[color]}` : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default TextButton;
