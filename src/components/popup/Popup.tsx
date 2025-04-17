import { useEffect, useRef } from "react";
import "./Popup.scss";

type PopupProps = {
  isOpen: boolean;
  onClosed: () => void;
  message: string;
};

export function Popup({ isOpen, onClosed, message }: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvents = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        onClosed();
      }

      if (
        e instanceof MouseEvent &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        onClosed();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEvents);
      document.addEventListener("mousedown", handleEvents);
    }

    return () => {
      document.removeEventListener("keydown", handleEvents);
      document.removeEventListener("mousedown", handleEvents);
    };
  }, [isOpen, onClosed]);

  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup-balloon" ref={popupRef}>
        <button className="popup-close" onClick={onClosed}>
          ×
        </button>
        <p className="popup-message">{message}</p>
        <div className="popup-arrow" />
      </div>
    </div>
  );
}
