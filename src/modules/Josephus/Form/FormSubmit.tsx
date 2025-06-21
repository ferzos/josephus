import { MouseEvent, useState } from 'react';
import './style.css';

interface Props {
  label: string;
  onSubmit: (input: number) => void;
}

function Form(props: Props) {
  const { label, onSubmit } = props;

  const [numberInput, setNumberInput] = useState<number>();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (numberInput) {
      if (numberInput < 2) {
        setErrorMessage('Please enter a number greater than or equal to 2');
        return;
      }

      if (numberInput > 100) {
        setErrorMessage('Please enter a number less than or equal to 100');
        return;
      }

      onSubmit(numberInput);
      setErrorMessage('');
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
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </form>
  );
}

export default Form;
