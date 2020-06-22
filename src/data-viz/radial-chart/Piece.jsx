import React, { useState, useEffect } from "react";
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
  const [toggle, setToggle] = useState(isShowing);
  const currentPath = getPath(book, data.spell);

  useEffect(() => {
    setToggle(isShowing);
  }, [isShowing]);

  const animations = useSpring({
    config: {
      duration: 3000,
    },
    opacity: toggle ? 1 : 0,
  });

  // const pieceClass = `${
  //   data.mentions < 3 ? "insignificant " : ""
  // }${data.type.toLowerCase()}`;

  const pieceClass = data.type.toLowerCase();

  return (
    <g
      className={pieceClass}
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
