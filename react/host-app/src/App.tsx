import { useState } from "react";
import List from "todo_components/List";
import Input from "todo_components/Input";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const onSubmit = (newTodo:string) => {
    setTodos(() => [...todos, newTodo]);
  };

  return (
    <>
      <Input onSubmit={onSubmit} />
      <List items={todos} />
    </>
  );
}

export default App;