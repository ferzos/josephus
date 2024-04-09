import { PropsWithChildren } from 'react';
import './style.css';

function CircleArea({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="circleAreaContainer">
      <div className="circleArea">{children}</div>
    </div>
  );
}

export default CircleArea;
