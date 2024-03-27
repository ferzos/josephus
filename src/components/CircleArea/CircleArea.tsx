import { PropsWithChildren } from "react";
import "./style.css";

const CircleArea = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="container">
      <div className="circleArea">
        {children}
      </div>
    </div>
  );
};

export default CircleArea;
