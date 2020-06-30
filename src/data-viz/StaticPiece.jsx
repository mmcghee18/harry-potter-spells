import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { spellColors } from "../styles.js";

const FilledPiece = styled.g`
  opacity: ${(props) => (props.highlighted ? 1 : 0.1)};
  fill: ${(props) => spellColors[props.spellType]};
`;

const StaticPiece = ({ data, path, highlighted }) => {
  return (
    <FilledPiece spellType={data.type.toLowerCase()} highlighted={highlighted}>
      <path d={path} />
    </FilledPiece>
  );
};

export default StaticPiece;
