import { useState, useEffect, useRef } from "react";
import { toRawString, formatDisplay } from "../../utils/currency";
import "./fieldCurrency.scss";

interface FieldCurrencyProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function FieldCurrency({ value, onChange }: FieldCurrencyProps) {
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastCursorPosition = useRef(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cursorPosition = e.target.selectionStart || 0;
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/\D/g, "");

    const numericValue = rawValue ? parseInt(rawValue) / 100 : 0;
    onChange(numericValue);

    const formattedValue = formatDisplay(rawValue);
    setDisplayValue(formattedValue);

    lastCursorPosition.current = cursorPosition;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    if (!allowedKeys.includes(e.key) && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const newPosition = Math.min(
        lastCursorPosition.current,
        displayValue.length,
      );
      inputRef.current.setSelectionRange(newPosition, newPosition);
    }
  }, [displayValue]);

  useEffect(() => {
    setDisplayValue(formatDisplay(toRawString(value)));
    lastCursorPosition.current = formatDisplay(toRawString(value)).length;
  }, [value]);

  return (
    <div className="fieldCurrency">
      <span className="fieldCurrency__prefix">R$</span>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        placeholder="0,00"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="fieldCurrency__input"
      />
    </div>
  );
}
