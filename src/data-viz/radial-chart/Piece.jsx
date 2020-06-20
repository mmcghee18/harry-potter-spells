import React, { useEffect, useRef } from "react";
import { arc } from "d3-shape";
import { animated, useSpring } from "react-spring";
import { getPath } from "./utils.js";

const Piece = ({
  data,
  setHoveredPiece,
  setMouseX,
  setMouseY,
  isShowing,
  book,
}) => {
  const currentPath = getPath(book, data.spell);

  const animations = useSpring({
    config: {
      duration: 1200,
    },
    opacity: isShowing ? 1 : 0,
  });

  return (
    <g
      opacity={isShowing ? 1 : 0}
      className={data.type.toLowerCase()}
      onMouseEnter={(e) => {
        if (isShowing) {
          setHoveredPiece(data);
          setMouseX(e.nativeEvent.pageX);
          setMouseY(e.nativeEvent.pageY);
        }
      }}
      onMouseLeave={() => {
        if (isShowing) {
          setHoveredPiece(null);
          setMouseX(null);
          setMouseY(null);
        }
      }}
    >
      <animated.path {...animations} d={currentPath} />
    </g>
  );
};

export default Piece;
