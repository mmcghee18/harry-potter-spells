import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";

const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => props.y - 100}px;
  left: ${(props) => props.x}px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: lightgrey;
  color: black;
  border: 1px solid #ccc;
  padding: 15px;

  font-size: 16px;
  width: 200px;
  height: ${(props) => (props.expanded ? "400px" : "100px")};
`;

const SeeMentions = styled.p`
  font-size: 14px;
  color: cornflowerblue;

  &:hover {
    cursor: pointer;
  }
`;

const Tooltip = ({ data, hoveredPiece, mouseLocation }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrapper
      visible={hoveredPiece ? true : false}
      x={mouseLocation ? mouseLocation.x : null}
      y={mouseLocation ? mouseLocation.y : null}
      expanded={expanded}
      onMouseEnter={(e) => {
        console.log("enter tooltip");
      }}
      onMouseLeave={() => {
        console.log("exit tooltip");
      }}
    >
      <p>
        {hoveredPiece} :{" "}
        {_.get(
          _.find(data, (d) => d.spell === hoveredPiece),
          "mentions"
        )}
      </p>
      <SeeMentions onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide mentions" : "See mentions"}
      </SeeMentions>
    </Wrapper>
  );
};

export default Tooltip;
