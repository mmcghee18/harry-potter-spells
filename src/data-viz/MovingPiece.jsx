import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import _ from "lodash";
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

const SeeMentions = styled.p`
  font-size: 12px;
  color: #1890ff;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Mentions = styled.div`
  display: ${(props) => (props.expanded ? "block" : "none")};
`;

const MovingPiece = ({
  data,
  pathA,
  pathB,
  setHoveredPiece,
  setMouseLocation,
  mentions,
  highlighted,
}) => {
  const [expanded, setExpanded] = useState(false);

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
      <SeeMentions onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide mentions" : "See mentions"}
      </SeeMentions>
      <Mentions expanded={expanded}>
        {_.map(mentions, (mention, i) => (
          <p key={i}>"... {mention} ..."</p>
        ))}
      </Mentions>
    </div>
  );

  return (
    <>
      <Popover
        arrowPointAtCenter={true}
        title={tooltipTitle}
        content={tooltipContent}
        placement="bottom"
      >
        <FilledPiece
          spellType={data.type.toLowerCase()}
          insignificant={insignificant}
        >
          <animated.path
            {...animations}
            stroke={highlighted ? "white" : null}
          />
        </FilledPiece>
      </Popover>
    </>
  );
};

export default MovingPiece;
