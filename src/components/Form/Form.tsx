import { MouseEvent, useState } from 'react';

interface Props {
  onSubmit: (input: number) => void;
}

function Form(props: Props) {
  const { onSubmit } = props;

  const [numberOfPeopleInput, setNumberOfPeopleInput] = useState<number>();

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (numberOfPeopleInput) {
      onSubmit(numberOfPeopleInput);
    }
  };

  return (
    <form>
      <input
        type="number"
        name="number of people"
        id="numberOfPeople"
        onChange={(e) => setNumberOfPeopleInput(Number(e.target.value))}
      />
      <button onClick={handleSubmit} type="button">
        Submit
      </button>
    </form>
  );
}

export default Form;
