import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import type { TDropdown } from "../../types/ui";
import ErrorMessage from "./Error";
import "../../styles/ui/dropdown.scss";

const Dropdown = ({
  name,
  label,
  options,
  errorMessage,
  defaultOption,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: TDropdown) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption ?? null);

  const id = label?.toLowerCase() || "";
  const hasError = !!errorMessage;

  const handleSelect = (option: (typeof options)[number]) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

              {hasNextPage && (
                <>
                  <div ref={sentinelRef} style={{ height: 1 }} />
                  {isFetchingNextPage && <div>Loading...</div>}
                </>
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
