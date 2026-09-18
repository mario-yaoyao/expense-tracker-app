import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import type { TDropdown } from "../../types/ui";
import ErrorMessage from "./ErrorMessage";
import "../../styles/ui/dropdown.scss";

const Dropdown = ({
  isOpen,
  name,
  label,
  options,
  errorMessage,
  defaultOption,
  variant = "default",
  onChangeFn,
  onOpenChange,
}: TDropdown) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownOpen = isOpen ?? internalIsOpen;

  const [selectedOption, setSelectedOption] = useState(defaultOption ?? null);

  const id = label?.toLowerCase() || "";
  const hasError = !!errorMessage;

  const toggleDropdown = () => {
    const next = !dropdownOpen;

    if (isOpen === undefined) {
      setInternalIsOpen(next);
    }

    onOpenChange?.(next);
  };

  const handleSelect = (option: (typeof options)[number]) => {
    setSelectedOption(option);

    if (isOpen === undefined) {
      setInternalIsOpen(false);
    }

    onOpenChange?.(false);
    onChangeFn?.(option);
  };

  return (
    <div className="dropdown-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="dropdown-field">
        <div
          className={`dropdown-wrapper ${hasError ? "error" : ""} ${variant}`}
        >
          <button
            type="button"
            className="dropdown-trigger"
            onClick={toggleDropdown}
          >
            <p>{selectedOption?.label ?? <span>Select type</span>}</p>
            <IoChevronDown className={dropdownOpen ? "rotate" : ""} />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {options.length === 0 ? (
                <button className="dropdown-item" disabled>
                  {name === "categoryId"
                    ? "No category available"
                    : "No options available"}
                </button>
              ) : (
                options.map((option) => (
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
                ))
              )}
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
