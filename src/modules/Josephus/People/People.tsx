import './style.css';

const CONTAINER_SIZE = 500;
const CENTER = CONTAINER_SIZE / 2;
const SPACING = 50;
const PERSON_SIZE = 30; // width and head diameter
const BODY_HEIGHT = PERSON_SIZE * 1.2;
const BODY_WIDTH = PERSON_SIZE * 0.5;

interface Props {
  i: number;
  numberOfPeople: number;
  isAlive?: boolean;
}

export function People(props: Props) {
  const { i, numberOfPeople, isAlive = false } = props;

  // Positioning helpers
  const angleForIndex = (index: number) => (index / numberOfPeople) * 2 * Math.PI;
  const getXY = (angle: number, xyRadius: number) => ({
    x: xyRadius * Math.cos(angle),
    y: xyRadius * Math.sin(angle),
  });
  const angle = angleForIndex(i);
  const calculatedRadius = Math.min(
    (numberOfPeople * (PERSON_SIZE + SPACING)) / (2 * Math.PI),
    CENTER - PERSON_SIZE, // limit max radius to fit container
  );
  const { x, y } = getXY(angle, calculatedRadius);
  const left = CENTER + x;
  const top = CENTER + y;

  return (
    <div
      key={i}
      className="person"
      style={{
        left: left - PERSON_SIZE / 2,
        top: top - (PERSON_SIZE + BODY_HEIGHT) / 2,
        width: PERSON_SIZE,
        height: PERSON_SIZE + BODY_HEIGHT,
      }}
    >
      {/* Head */}
      <div
        className="head"
        style={{
          width: PERSON_SIZE,
          height: PERSON_SIZE,
          backgroundColor: isAlive ? '#f1c27d' : '#d1d5db',
        }}
      >
        {i + 1}
      </div>
      {/* Body */}
      <div
        className="body"
        style={{
          width: BODY_WIDTH,
          height: BODY_HEIGHT,
          borderRadius: BODY_WIDTH / 2,
          backgroundColor: isAlive ? '#3b82f6' : '#d1d5db',
        }}
      />
    </div>
  );
}

export default People;
