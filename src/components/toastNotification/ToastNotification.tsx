import { useEffect, useState } from "react";
import "./ToastNotification.scss";

type ToastProps = {
  message: string;
  duration?: number;
  autoClose?: boolean;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  showInterval?: number;
};

export function ToastNotification({
  message,
  duration,
  autoClose,
  position,
  showInterval,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  const showToast = () => {
    setVisible(true);
    if (autoClose && duration) {
      setTimeout(() => setVisible(false), duration);
    }
  };

  useEffect(() => {
    showToast();

    if (showInterval) {
      const interval = setInterval(showToast, showInterval);
      return () => clearInterval(interval);
    }
  }, [message, duration, autoClose, position, showInterval]);

  if (!visible) return null;

  return (
    <div className={`toast-notification ${position || ""}`}>
      <div className="toast-content">
        <p>{message}</p>
      </div>
    </div>
  );
}
