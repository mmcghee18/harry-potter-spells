import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import _ from "lodash";
import { labelHeight, labelWidth, labelRx, textSize } from "./utils.js";

const MovingPiece = ({ data, pathA, pathB }) => {
  const [mouseLocation, setMouseLocation] = useState(null);
  const [showLabel, setShowLabel] = useState(false);

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

  const labelX = _.isNull(mouseLocation)
    ? 0
    : -window.innerWidth / 2 + mouseLocation.x;
  const labelY = _.isNull(mouseLocation)
    ? 0
    : -window.innerHeight / 2 + mouseLocation.y;
  const textX = labelX + labelWidth / 2;
  const textY = labelY + labelHeight / 2 + textSize / 2;

  return (
    <>
      <g
        className={pieceClass}
        onMouseEnter={(e) => {
          setMouseLocation({
            x: e.nativeEvent.clientX,
            y: e.nativeEvent.clientY,
          });
          setShowLabel(true);
        }}
        onMouseLeave={() => {
          setShowLabel(false);
          setMouseLocation(null);
        }}
      >
        <animated.path {...animations} />
      </g>

      {showLabel ? (
        <g>
          <rect
            fill="white"
            x={labelX}
            y={labelY}
            height={labelHeight}
            width={labelWidth}
            rx={labelRx}
          ></rect>
          <text
            x={textX}
            y={textY}
            style={{ font: `${textSize}px` }}
            textAnchor={"middle"}
          >
            {data.spell} : {data.mentions}
          </text>
        </g>
      ) : null}
    </>
  );
};

export default MovingPiece;
