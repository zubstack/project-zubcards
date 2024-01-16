import "./TextButton.scss";
function TextButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="text__button">
      {children}
    </button>
  );
}

export default TextButton;
