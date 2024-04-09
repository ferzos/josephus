import './style.css';

interface Props {
  i: number;
  x: number;
  y: number;
  isInitial?: boolean;
}

export function People(props: Props) {
  const {
    i, x, y, isInitial = false,
  } = props;

  return (
    <div
      className="people"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        ...(isInitial && { backgroundColor: 'red' }),
      }}
    >
      {i + 1}
    </div>
  );
}

export default People;
