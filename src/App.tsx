import { useMemo, useState } from 'react';

import './styles/reset.css';
import './App.css';
import Form from './components/Form/Form';
import CircleArea from './components/CircleArea/CircleArea';
import PeoplePawn from './components/People/People';
import KillerInput from './components/KillerInput/KillerInput';

const MAX_RADIUS_RATIO = 7;
const RADIUS_RATIO = 13;
const DEFAULT_NUMBER_OF_PEOPLE = 10;

function App() {
  const [numberOfPeople, setNumberOfPeople] = useState(
    DEFAULT_NUMBER_OF_PEOPLE,
  );
  const [theDeads, setTheDeads] = useState<number[]>([]);

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
    setTheDeads([]);
  };

  return (
    <div className="container">
      <div className="formCenter">
        <Form
          label="Input number of people:"
          onSubmit={handleInputNumberOfPeople}
        />
        <br />
        <KillerInput numberOfPeople={numberOfPeople} onSubmit={setTheDeads} />
      </div>

      <CircleArea>
        {people.map(({ i, x, y }) => (
          <PeoplePawn
            key={i}
            i={i}
            x={x}
            y={y}
            isKilled={theDeads.includes(i)}
          />
        ))}
      </CircleArea>
    </div>
  );
}

export default App;
