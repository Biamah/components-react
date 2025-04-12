import { useState, useEffect, useRef } from "react";
import { toRawString, formatDisplay } from "../utils/currency";
import "../styles/components/fieldCurrency.scss";

interface FieldCurrencyProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function FieldCurrency({ value, onChange }: FieldCurrencyProps) {
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastValue = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const numericValue = input ? parseInt(input) / 100 : 0;
    onChange(numericValue);
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
    ];
    if (!allowedKeys.includes(e.key) && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const formatted = formatDisplay(toRawString(value));
    setDisplayValue(formatted);
    lastValue.current = formatted;
  }, [value]);

  return (
    <div className={"fieldCurrency"}>
      <span className={"fieldCurrency__prefix"}>R$</span>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        placeholder="0,00"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={"fieldCurrency__input"}
      />
    </div>
  );
}
