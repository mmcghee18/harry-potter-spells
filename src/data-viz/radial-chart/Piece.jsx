import React, { useEffect, useRef } from "react";
import { arc } from "d3-shape";
import { useTransition, animated, useSpring } from "react-spring";

const Piece = ({
  data,
  i,
  scale,
  numBars,
  setHoveredPiece,
  setMouseX,
  setMouseY,
  isShowing,
}) => {
  const wasShowing = useRef(false);

  // Cache the last isShowing value so we can see whether it's entering or exiting
  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);

  const style = useSpring({
    config: {
      duration: 1200,
    },
    opacity: isShowing ? 1 : 0,
  });

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(data.mentions));

  return (
    <animated.g
      {...style}
      className={data.type.toLowerCase()}
      onMouseEnter={(e) => {
        setHoveredPiece(data);
        setMouseX(e.nativeEvent.pageX);
        setMouseY(e.nativeEvent.pageY);
      }}
      onMouseLeave={() => {
        setHoveredPiece(null);
        setMouseX(null);
        setMouseY(null);
      }}
    >
      <path d={arcGenerator()} />
    </animated.g>
  );
};

export default Piece;
