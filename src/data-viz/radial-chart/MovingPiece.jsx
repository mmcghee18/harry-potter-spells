import React from "react";
import { animated, useSpring } from "react-spring";

const MovingPiece = ({ data, pathA, pathB }) => {
  const insignificant = data.mentions < 3;

  const animations = useSpring({
    config: { duration: 1500 },
    d: pathB,
    opacity: insignificant ? 0.4 : 1,
    from: { d: pathA, opacity: 0 },
  });

  const pieceClass = `${
    insignificant ? "insignificant " : ""
  }${data.type.toLowerCase()}`;

  return (
    <g className={pieceClass}>
      <animated.path {...animations} />
    </g>
  );
};

export default MovingPiece;
