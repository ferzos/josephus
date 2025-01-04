import { ComponentProps, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FullpageSection } from '@ap.cx/react-fullpage';
import { FormNumberChange, FormSubmit } from './Form';
import { KillerInput } from './KillerInput';
import { CircleArea } from './CircleArea';
import { useDeadSequence } from './hooks/useDeadSequence';
import { useCheckAnswer } from './hooks/useCheckAnswer';
import { People } from './People';

const MAX_RADIUS_RATIO = 7;
const RADIUS_RATIO = 13;
const DEFAULT_NUMBER_OF_PEOPLE = 10;

function Josephus() {
  const { deadSequence, setDeadSequence } = useDeadSequence();
  const [numberOfPeople, setNumberOfPeople] = useState(
    DEFAULT_NUMBER_OF_PEOPLE,
  );
  const { setFinalKillerAnswer, survivorIndexInputRef } = useCheckAnswer({
    isAllDead:
      deadSequence.length > 0
      && deadSequence.every((deadSequenceItem) => deadSequenceItem.hasShownDead),
  });

  const maxRadius = numberOfPeople * MAX_RADIUS_RATIO;
  const radiusOfPeople = numberOfPeople * RADIUS_RATIO;
  const radius = radiusOfPeople > maxRadius ? maxRadius : radiusOfPeople;

  const people = useMemo(() => {
    const components = [];
    const angleIncrement = (2 * Math.PI) / numberOfPeople;

    for (let i = 0; i < numberOfPeople; i += 1) {
      const angle = i * angleIncrement;
      const x = Math.cos(angle) * radius; // Adjust the radius as needed
      const y = Math.sin(angle) * radius; // Adjust the radius as needed

      components.push({ x, y, i });
    }

    return components;
  }, [numberOfPeople, radius]);

  const handleInputNumberOfPeople = (inputNumberOfPeople: number) => {
    setNumberOfPeople(inputNumberOfPeople);
    // Reset the deads
    setDeadSequence([]);
  };

  const handleStartKill: ComponentProps<typeof KillerInput>['onSubmit'] = ({
    theDeads,
    finalKiller,
  }) => {
    setDeadSequence(theDeads);
    setFinalKillerAnswer(finalKiller);
  };

  return (
    <FullpageSection>
      <div className="container">
        <div className="formCenter">
          <FormSubmit
            label="Input number of people:"
            onSubmit={handleInputNumberOfPeople}
          />
          <br />
          <FormNumberChange
            ref={survivorIndexInputRef}
            label="Who do you think survive?"
            id="survivorIndex"
          />
          <br />
          <br />
          <KillerInput
            numberOfPeople={numberOfPeople}
            onSubmit={handleStartKill}
          />
          <br />
        </div>

        <CircleArea>
          {people.map(({ i, x, y }) => (
            <People
              key={i}
              i={i}
              x={x}
              y={y}
              isKilled={deadSequence.some(
                (deadSequenceItem) => deadSequenceItem.index === i && deadSequenceItem.hasShownDead,
              )}
            />
          ))}
        </CircleArea>
      </div>
    </FullpageSection>
  );
}

export default Josephus;
