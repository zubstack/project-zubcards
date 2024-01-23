import "./TextButton.scss";

const colors = {
  red: "--red",
};

function TextButton(props) {
  return (
    <button
      {...props}
      className={`text__button${
        colors[props.color] ? ` text__button${colors[props.color]}` : ""
      }`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default TextButton;
