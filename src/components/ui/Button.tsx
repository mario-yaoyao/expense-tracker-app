import type { TButton } from "../../types/button";
import "../../styles/button.scss";

const Button = ({
  type = "button",
  label,
  style = "default",
  onClickFn,
}: TButton) => {
  return (
    <button type={type} onClick={onClickFn} className={`btn btn-${style}`}>
      {label}
    </button>
  );
};

export default Button;
