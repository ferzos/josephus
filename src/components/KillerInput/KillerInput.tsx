import { useKillRotation } from '../../hooks/useKillRotation';

interface Props {
  numberOfPeople: number;
  onSubmit: (theDeads: number[]) => void;
}

function KillerInput(props: Props) {
  const { numberOfPeople, onSubmit } = props;

  const { createKillRotation } = useKillRotation({
    numberOfPeople,
  });

  const handleStartsTheKillRotation = () => {
    const theDeads = createKillRotation(0);

    onSubmit(theDeads);
  };

  return (
    <button type="button" onClick={handleStartsTheKillRotation}>
      START
    </button>
  );
}

export default KillerInput;
