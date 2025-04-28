import { useEffect, useState } from "react";
import "./ToastNotification.scss";

type ToastProps = {
  message: string;
  duration?: number; // em milissegundos
  autoClose?: boolean;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
};

export function ToastNotification({
  message = "Nova notificação disponível!",
  duration = 5000, // 5 segundos
  autoClose = true,
  position = "bottom-right",
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostra a notificação imediatamente após o refresh
    setVisible(true);

    if (autoClose) {
      setTimeout(() => {
        setVisible(false);
      }, duration);
    }

    // Configura o intervalo para exibir a notificação a cada 2 minutos
    const interval = setInterval(() => {
      setVisible(true);

      if (autoClose) {
        setTimeout(() => {
          setVisible(false);
        }, duration);
      }
    }, 8000); // 2 minutos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [autoClose, duration]);

  if (!visible) return null;

  return (
    <div className={`toast-notification ${position}`}>
      <div className="toast-content">
        <p>{message}</p>
      </div>
    </div>
  );
}
