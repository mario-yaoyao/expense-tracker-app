import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import type { TInput } from "../../types/ui";
import ErrorMessage from "./ErrorMessage";
import "../../styles/ui/input.scss";

const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  errorMessage,
  defaultValue,
}: TInput) => {
  const [passwordType, setPasswordType] = useState(type);

  const id = label?.toLowerCase() || placeholder?.toLowerCase() || "";
  const hasError = !!errorMessage;

  const togglePasswordVisibility = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="input-field">
        <div className={`input-wrapper ${hasError ? "error" : ""}`}>
          {Icon && <Icon size={24} className="icon" />}
          <input
            id={id}
            name={name}
            type={passwordType}
            placeholder={placeholder}
            defaultValue={defaultValue}
            step="0.01"
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
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default Input;
