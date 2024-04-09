import { useMemo, useState } from 'react';

import './styles/reset.css';
import './App.css';
import Form from './components/Form/Form';
import CircleArea from './components/CircleArea/CircleArea';
import PeoplePawn from './components/People/People';

const MAX_RADIUS_RATIO = 7;
const RADIUS_RATIO = 13;
const DEFAULT_NUMBER_OF_PEOPLE = 48;

function App() {
  const [numberOfPeople, setNumberOfPeople] = useState(
    DEFAULT_NUMBER_OF_PEOPLE,
  );
  const [initialPerson, setInitialPerson] = useState<number>();
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

  const handleSubmitInitialPerson = (initialPersonIndex: number) => {
    if (initialPersonIndex > numberOfPeople) {
      alert("There's no such person");
      return;
    }

    setInitialPerson(initialPersonIndex - 1);
  };

  return (
    <div className="container">
      <div className="formCenter">
        <Form label="Input number of people:" onSubmit={setNumberOfPeople} />
        <br />
        <Form
          label="Input who first to kill:"
          onSubmit={handleSubmitInitialPerson}
        />
      </div>

      <CircleArea>
        {people.map(({ i, x, y }) => (
          <PeoplePawn
            key={i}
            i={i}
            x={x}
            y={y}
            isInitial={initialPerson === i}
          />
        ))}
      </CircleArea>
    </div>
  );
}

export default App;
