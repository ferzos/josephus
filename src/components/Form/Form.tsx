import { MouseEvent, useState } from "react";

interface Props {
  onSubmit: (input: number) => void
}

const Form = (props: Props) => {
  const { onSubmit } = props

  const [numberOfPeopleInput, setNumberOfPeopleInput] = useState<number>();
  
  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    
    if (numberOfPeopleInput) {
      onSubmit(numberOfPeopleInput)
    }
  }
  
  return (
    <form>
      <input type="number" name="number of people" id="numberOfPeople" onChange={e => setNumberOfPeopleInput(Number(e.target.value))} />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Form;