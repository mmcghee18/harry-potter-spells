import React from "react";
import { animated, useSpring } from "react-spring";

const MovingPiece = ({ data, pathA, pathB }) => {
  const animations = useSpring({
    config: { duration: 1500 },
    d: pathB,
    opacity: 1,
    from: { d: pathA, opacity: 0 },
  });

  return (
    <g className={data.type.toLowerCase()}>
      <animated.path {...animations} />
    </g>
  );
};

export default MovingPiece;
