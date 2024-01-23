import "./Button.scss";

function Button(props) {
  return (
    <button className="default__button" {...props}>
      {props.children}
    </button>
  );
}

export default Button;
