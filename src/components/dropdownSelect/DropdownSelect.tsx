import { useState } from "react";
import "./dropdownSelect.scss";

type DropdownSelectProps = {
  options: string[];
  placeholder?: string;
  onSelect: (selected: string) => void;
};

export function DropdownSelect({
  options,
  placeholder = "Selecione um opção",
  onSelect,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-select">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption || placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
