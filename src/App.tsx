import { useState } from "react";
import "./styles/App.scss";
import FieldCurrency from "./components/FieldCurrency";

function App() {
  const [inputValue, setInputValue] = useState(0);

  return (
    <>
      <h1>Input de Dinheiro</h1>
      <FieldCurrency
        value={inputValue}
        onChange={setInputValue}
        placeholder="0,00"
      />
    </>
  );
}

export default App;
