import './style.css';

interface Props {
  i: number;
  x: number;
  y: number;
  isKilled?: boolean;
}

export function People(props: Props) {
  const {
    i, x, y, isKilled = false,
  } = props;

  return (
    <div
      className="people"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        ...(isKilled && { backgroundColor: 'red' }),
      }}
    >
      {i + 1}
    </div>
  );
}

export default People;
