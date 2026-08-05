import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import type { TInput } from "../../types/input";
import "../../styles/input.scss";

const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
}: TInput) => {
  const [passwordType, setPasswordType] = useState(type);
  const id = label?.toLowerCase() || placeholder?.toLowerCase() || "";

  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}

      <div className="input-wrapper">
        {Icon && <Icon size={24} className="icon" />}
        <input
          id={id}
          name={name}
          type={passwordType}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button onClick={togglePasswordVisibility} type="button">
            {passwordType === "password" ? (
              <AiOutlineEyeInvisible size={24} />
            ) : (
              <AiOutlineEye size={24} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
