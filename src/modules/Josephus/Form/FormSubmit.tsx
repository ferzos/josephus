import { MouseEvent, useState } from 'react';

interface Props {
  label: string;
  onSubmit: (input: number) => void;
}

function Form(props: Props) {
  const { label, onSubmit } = props;

  const [numberInput, setNumberInput] = useState<number>();

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (numberInput) {
      onSubmit(numberInput);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="numberInput">{label}</label>
      <br />
      <input
        id="numberInput"
        type="number"
        name="numberInput"
        onChange={(e) => setNumberInput(Number(e.target.value))}
      />
      <button onClick={handleSubmit} type="button">
        Submit
      </button>
    </form>
  );
}

export default Form;
