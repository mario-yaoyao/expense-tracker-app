import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import type { TDropdown } from "../../types/ui";
import ErrorMessage from "./ErrorMessage";
import "../../styles/ui/dropdown.scss";

const Dropdown = ({
  name,
  label,
  options,
  errorMessage,
  defaultOption,
}: TDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption ?? null);

  const id = label?.toLowerCase() || "";
  const hasError = !!errorMessage;

  const handleSelect = (option: (typeof options)[number]) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="dropdown-field">
        <div className={`dropdown-wrapper ${hasError ? "error" : ""}`}>
          <button
            type="button"
            className="dropdown-trigger"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <p>{selectedOption?.label ?? <span>Select type</span>}</p>
            <IoChevronDown className={isOpen ? "rotate" : ""} />
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`dropdown-item ${
                    selectedOption?.value === option.value ? "active" : ""
                  }`}

                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          <input
            type="hidden"
            name={name}
            value={selectedOption?.value ?? ""}
          />
        </div>
        {hasError && <ErrorMessage errorMessage={errorMessage} />}
      </div>
    </div>
  );
};

export default Dropdown;
