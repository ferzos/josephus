import { useKillRotation } from '../../hooks/useKillRotation';

interface Props {
  numberOfPeople: number;
  onSubmit: (
    theDeads: Array<{
      index: number;
      hasShownDead: boolean;
    }>
  ) => void;
}

function KillerInput(props: Props) {
  const { numberOfPeople, onSubmit } = props;

  const { createKillRotation } = useKillRotation({
    numberOfPeople,
  });

  const handleStartsTheKillRotation = () => {
    const theDeads = createKillRotation(0);

    onSubmit(
      theDeads.map((theDead) => ({ index: theDead, hasShownDead: false })),
    );
  };

  return (
    <button type="button" onClick={handleStartsTheKillRotation}>
      START
    </button>
  );
}

export default KillerInput;
