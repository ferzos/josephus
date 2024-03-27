import { useMemo, useState } from 'react';
import { CircleArea } from './components/CircleArea';
import { People } from './components/People';
import './styles/reset.css'
import './App.css'
import { Form } from './components/Form';

const MAX_RADIUS_RATIO = 7;
const RADIUS_RATIO = 13
const DEFAULT_NUMBER_OF_PEOPLE = 48;

function App() {
  const [numberOfPeople, setNumberOfPeople] = useState(DEFAULT_NUMBER_OF_PEOPLE);
  const maxRadius = numberOfPeople * MAX_RADIUS_RATIO;
  const radius =
    numberOfPeople * RADIUS_RATIO > maxRadius ? maxRadius : numberOfPeople * RADIUS_RATIO;

  const people = useMemo(() => {
    const components = [];
    const angleIncrement = (2 * Math.PI) / numberOfPeople;

    for (let i = 0; i < numberOfPeople; i++) {
      const angle = i * angleIncrement;
      const x = Math.cos(angle) * radius; // Adjust the radius as needed
      const y = Math.sin(angle) * radius; // Adjust the radius as needed

      components.push({ x, y, i })
    }

    return components
  }, [radius])

  return (
    <div>
      <Form onSubmit={setNumberOfPeople} />

      <CircleArea>
        {people.map(({ i, x, y }) => (
          <People key={i} i={i} x={x} y={y} />
        ))}
      </CircleArea>
    </div>
  );
}

export default App
