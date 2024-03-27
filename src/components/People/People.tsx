import './style.css';

interface Props {
  i: number;
  x: number;
  y: number;
}

export function People(props: Props) {
  const { i, x, y } = props;

  return (
    <div
      className="people"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {i + 1}
    </div>
  );
}

export default People;
