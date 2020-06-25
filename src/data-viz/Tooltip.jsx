import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Tooltip = ({ data, hoveredPiece }) => {
  return (
    <Wrapper visible={hoveredPiece ? true : false}>
      {hoveredPiece} :{" "}
      {_.get(
        _.find(data, (d) => d.spell === hoveredPiece),
        "mentions"
      )}
    </Wrapper>
  );
};

export default Tooltip;
