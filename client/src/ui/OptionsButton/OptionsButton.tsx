import "./OptionsButton.scss";
function OptionsButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="options__button">
      {children}
    </button>
  );
}

export default OptionsButton;
