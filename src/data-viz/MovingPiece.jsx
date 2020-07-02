import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import _ from "lodash";
import SlidingDrawer from "./SlidingDrawer.jsx";
import { Popover } from "antd";
import { spellColors } from "../styles.js";

const FilledPiece = styled.g`
  opacity: ${(props) => (props.insignificant ? 0.4 : 1)};
  fill: ${(props) => spellColors[props.spellType]};
`;

const Title = styled.p`
  color: #302f2c;
  font-color: white;
`;

const Effect = styled.p`
  color: #302f2c;
`;

const MovingPiece = ({ data, book, pathA, pathB, mentions, highlighted }) => {
  const [clickedSpell, setClickedSpell] = useState(null);

  const insignificant = data.mentions < 3;

  const animations = useSpring({
    config: { duration: 1500 },
    d: pathB,
    opacity: insignificant ? 0.4 : 1,
    from: { d: pathA, opacity: 0 },
  });

  const tooltipTitle = (
    <Title>
      {data.spell} : {data.mentions}
    </Title>
  );

  const tooltipContent = (
    <div>
      <Effect>{data.effect}</Effect>
      <div style={{ fontSize: "12px" }}>Click to see where it's mentioned</div>
    </div>
  );

  return (
    <>
      <Popover
        arrowPointAtCenter={true}
        title={tooltipTitle}
        content={tooltipContent}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <FilledPiece
          spellType={data.type.toLowerCase()}
          insignificant={insignificant}
          onClick={() => setClickedSpell(data)}
        >
          <animated.path
            {...animations}
            stroke={highlighted ? "white" : null}
            strokeWidth={highlighted ? 2.5 : null}
          />
        </FilledPiece>
      </Popover>
      <SlidingDrawer
        clickedSpell={clickedSpell}
        setClickedSpell={setClickedSpell}
        mentions={mentions}
        book={book}
      />
    </>
  );
};

export default MovingPiece;
