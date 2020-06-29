import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import _ from "lodash";
import { Popover } from "antd";

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

const Mentions = styled.p`
  display: ${(props) => (props.expanded ? "block" : "none")};
`;

const MovingPiece = ({
  data,
  pathA,
  pathB,
  setHoveredPiece,
  setMouseLocation,
}) => {
  const [expanded, setExpanded] = useState(false);

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
        Here is a ton of info about where it is mentioned did you see this and
        this and this Here is a ton of info about where it is mentioned did you
        see this and this and this Here is a ton of info about where it is
        mentioned did you see this and this and this
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
        <g className={pieceClass}>
          <animated.path {...animations} />
        </g>
      </Popover>
    </>
  );
};

export default MovingPiece;
