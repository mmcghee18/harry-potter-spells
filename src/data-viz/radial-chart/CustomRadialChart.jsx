import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import "./CustomRadialChart.css";
import MovingPiece from "./MovingPiece.jsx";
import {
  canvasWidth,
  canvasHeight,
  margin,
  getPath,
  getNullPath,
} from "./utils.js";

const Pieces = styled.g`
  transform: translate(${canvasWidth / 2}px, ${canvasHeight / 2}px);
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  display: flex;
  background-color: white;
  color: black;
  border-radius: 10px;
  height: 80px;
  width: 180px;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const SVGCanvas = styled.svg`
  margin: ${margin}px;
  position: sticky;
  top: ${margin}px;
`;

const CustomRadialChart = ({ fullData, currentBook, previousBook }) => {
  const visibleSpells = _.map(fullData[currentBook], (d) => d.spell);
  const previousSpells = _.map(fullData[previousBook], (d) => d.spell);

  return (
    <>
      <SVGCanvas height={canvasHeight} width={canvasWidth}>
        <Pieces>
          {_.map(fullData[currentBook], (d) => {
            const appearing =
              visibleSpells.includes(d.spell) &&
              !previousSpells.includes(d.spell);
            const disappearing =
              previousSpells.includes(d.spell) &&
              !visibleSpells.includes(d.spell);

            return (
              <MovingPiece
                key={`${d.spell}${d.book}`}
                data={d}
                pathA={
                  appearing
                    ? getNullPath(currentBook, d.spell)
                    : getPath(previousBook, d.spell)
                }
                pathB={
                  disappearing
                    ? getNullPath(previousBook, d.spell)
                    : getPath(currentBook, d.spell)
                }
              />
            );
          })}
        </Pieces>
      </SVGCanvas>
    </>
  );
};

export default CustomRadialChart;
