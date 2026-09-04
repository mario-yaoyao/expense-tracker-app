import type { TTextArea } from "../../types/ui";
import ErrorMessage from "./ErrorMessage";
import "../../styles/ui/textrea.scss";

const TextArea = ({
  name,
  label,
  placeholder,
  rows = 2,
  errorMessage,
  defaultValue,
}: TTextArea) => {
  const id = label?.toLowerCase() || placeholder?.toLowerCase() || "";
  const hasError = !!errorMessage;

  return (
    <div className="textarea-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="textarea-field">
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={hasError ? "error" : ""}
          defaultValue={defaultValue}
        />
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default TextArea;
