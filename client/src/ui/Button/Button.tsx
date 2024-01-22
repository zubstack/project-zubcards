import "./Button.scss";

function Button({ children, onClick }) {
  return (
    <button className="default__button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
