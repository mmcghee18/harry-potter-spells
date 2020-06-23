import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import "./CustomRadialChart.css";
import MovingPiece from "./MovingPiece.jsx";
import Legend from "./Legend.jsx";
import {
  canvasWidth,
  canvasHeight,
  margin,
  getPath,
  getNullPath,
} from "./utils.js";
import useChartDimensions from "../../hooks/useChartDimensions.js";

const ChartWrapper = styled.div`
  height: 85vh;
  position: sticky;
  top: 10%;
  margin-right: 20px;
  background-color: lightgrey;
`;

const Pieces = styled.g`
  transform: translate(${canvasWidth / 2}px, ${canvasHeight / 2}px);
`;

const CustomRadialChart = ({ fullData, currentBook, previousBook }) => {
  const visibleSpells = _.map(fullData[currentBook], (d) => d.spell);
  const previousSpells = _.map(fullData[previousBook], (d) => d.spell);

  const chartSettings = { marginBottom: 200 };
  const [ref, dms] = useChartDimensions(chartSettings);
  console.log(dms);

  return (
    <ChartWrapper ref={ref}>
      <svg height={dms.height} width={dms.width}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          <rect
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            fill="lavender"
          />
          {/* <Pieces>
          {_.map(fullData[currentBook], (d) => {
            const entering =
              visibleSpells.includes(d.spell) &&
              !previousSpells.includes(d.spell);

            return (
              <MovingPiece
                key={`${d.spell}${d.book}`}
                data={d}
                pathA={
                  entering
                    ? getNullPath(currentBook, d.spell)
                    : getPath(previousBook, d.spell)
                }
                pathB={getPath(currentBook, d.spell)}
              />
            );
          })}
        </Pieces> */}
        </g>
      </svg>
    </ChartWrapper>
  );
};

export default CustomRadialChart;
