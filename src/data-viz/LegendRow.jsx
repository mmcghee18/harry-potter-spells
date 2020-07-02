import React from "react";
import { legendR } from "../data/utils.js";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { spellColors } from "../styles.js";

const ColoredCircle = styled(animated.circle)`
  fill: ${(props) => spellColors[props.$spellType]};
`;

const LegendRow = ({ dms, i, spellType, spellTypes, percentage }) => {
  const margin =
    (dms.marginBottom - spellTypes.length * legendR * 2) /
    (spellTypes.length + 1);

  const circleX = dms.width * 0.5;
  const circleY =
    i === 0
      ? margin + legendR
      : (margin + 2 * legendR) * i + (margin + legendR);

  const percentAnimation = useSpring({
    number: percentage,
  });
  const textAnimation = useSpring({
    y: circleY,
  });
  const circleAnimation = useSpring({
    cy: circleY - legendR / 2,
  });

  return (
    <>
      <animated.text
        key={`${spellType}-percentage`}
        x={circleX - (legendR + 50)}
        y={textAnimation.y}
        fill="white"
      >
        {percentAnimation.number.interpolate((val) => Math.floor(val))}
      </animated.text>
      <animated.text
        key={`${spellType}-percent`}
        x={circleX - (legendR + 30)}
        y={textAnimation.y}
        fill="white"
      >
        %
      </animated.text>
      <ColoredCircle
        key={`${spellType}-circle`}
        $spellType={spellType}
        r={legendR}
        cx={circleX}
        cy={circleAnimation.cy}
      />
      <animated.text
        key={`${spellType}-label`}
        x={circleX + legendR + 20}
        y={textAnimation.y}
        fill="white"
      >
        {spellType}
      </animated.text>
    </>
  );
};

export default LegendRow;
