import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { spellColors } from "../styles.js";

const FilledPiece = styled.g`
  opacity: 0.4;
  fill: ${(props) => spellColors[props.spellType]};
`;

const StaticPiece = ({ data, path }) => {
  return (
    <FilledPiece spellType={data.type.toLowerCase()}>
      <path d={path} />
    </FilledPiece>
  );
};

export default StaticPiece;
