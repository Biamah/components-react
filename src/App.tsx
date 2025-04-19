import { useState } from "react";
import "./styles/main.scss";
import "./styles/App.scss"
import FieldCurrency from "./components/fieldCurrency/FieldCurrency";
import { Popup } from "./components/popup/Popup";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className="app">
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
    </section>
  );
}

export default App;
