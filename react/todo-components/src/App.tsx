import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";

function App() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <>
      <Input onSubmit={(value)=>setItems([...items, value])} />
      <List items={items} />
    </>
  );
}

export default App;