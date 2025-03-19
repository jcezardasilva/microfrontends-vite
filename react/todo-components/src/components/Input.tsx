import { useState } from "react";

const Input = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
    const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" onClick={() => {
            onSubmit(inputValue);
            setInputValue('');
        }}>Add</button>
      </div>
    </form>
  );
};

export default Input;
