import { useState } from "react";
import "./styles/App.scss";
import FieldCurrency from "./components/fieldCurrency/FieldCurrency";
import { Popup } from "./components/popup/Popup";
import { ToastNotification } from "./components/toastNotification/ToastNotification";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <h1>Input de Dinheiro</h1>
      <FieldCurrency
        value={inputValue}
        onChange={setInputValue}
        placeholder="0,00"
      />
      <div className="mt">
        <button onClick={() => setShowPopup(true)}>Mostrar Mensagem</button>

        <Popup
          isOpen={showPopup}
          onClosed={() => setShowPopup(false)}
          message="Esta é uma mensagem simples no formato de balão!"
        />
      </div>
      <div className="mt">
        <ToastNotification
          message="Voce tem uma nova notificação!"
          duration={3000}
          autoClose={true}
          position="top-right"
        />
      </div>
    </>
  );
}

export default App;
