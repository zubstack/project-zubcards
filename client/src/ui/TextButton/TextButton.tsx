import "./TextButton.scss";

const colors = {
  red: "--red",
};

function TextButton({ children, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`text__button${
        colors[color] ? ` text__button${colors[color]}` : ""
      }`}
    >
      {children}
    </button>
  );
}

export default TextButton;
