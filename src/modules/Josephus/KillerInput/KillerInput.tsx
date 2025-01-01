import { useKillRotation } from '../hooks/useKillRotation';

interface Props {
  numberOfPeople: number;
  onSubmit: (params: {
    theDeads: Array<{
      index: number;
      hasShownDead: boolean;
    }>;
    finalKiller: number;
  }) => void;
}

function KillerInput(props: Props) {
  const { numberOfPeople, onSubmit } = props;

  const { createKillRotation } = useKillRotation({
    numberOfPeople,
  });

  const handleStartsTheKillRotation = () => {
    const { theDeads, finalKiller } = createKillRotation(0);

    onSubmit({
      theDeads: theDeads.map((theDead) => ({
        index: theDead,
        hasShownDead: false,
      })),
      finalKiller,
    });
  };

  return (
    <button type="button" onClick={handleStartsTheKillRotation}>
      START
    </button>
  );
}

export default KillerInput;
