import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import "./CustomRadialChart.css";
import MovingPiece from "./MovingPiece.jsx";
import Legend from "./Legend.jsx";
import { getPath, getNullPath } from "./utils.js";
import useChartDimensions from "../hooks/useChartDimensions.js";

const ChartWrapper = styled.div`
  height: 85vh;
  position: sticky;
  top: 10%;
  margin-right: 20px;
`;

const Pieces = styled.g`
  transform: ${(props) =>
    `translate(${props.boundedWidth / 2}px, ${props.boundedHeight / 2}px)`};
`;

const CustomRadialChart = ({ fullData, currentBook, previousBook }) => {
  const visibleSpells = _.map(fullData[currentBook], (d) => d.spell);
  const previousSpells = _.map(fullData[previousBook], (d) => d.spell);

  const chartSettings = { marginBottom: 200 }; // can this be like 20%?
  const [ref, dms] = useChartDimensions(chartSettings);

  return (
    <ChartWrapper ref={ref}>
      <svg height={dms.height} width={dms.width}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          <Pieces
            boundedWidth={dms.boundedWidth}
            boundedHeight={dms.boundedHeight}
          >
            {_.map(fullData[currentBook], (d) => {
              const entering =
                visibleSpells.includes(d.spell) &&
                !previousSpells.includes(d.spell);

              return dms.height !== 0 && dms.width !== 0 ? (
                <MovingPiece
                  key={`${d.spell}${d.book}`}
                  data={d}
                  pathA={
                    entering
                      ? getNullPath(currentBook, d.spell)
                      : getPath(
                          previousBook,
                          d.spell,
                          _.min([dms.boundedWidth, dms.boundedHeight])
                        )
                  }
                  pathB={getPath(
                    currentBook,
                    d.spell,
                    _.min([dms.boundedWidth, dms.boundedHeight])
                  )}
                />
              ) : null;
            })}
          </Pieces>
        </g>

        <Legend dms={dms} data={fullData[currentBook]} />
      </svg>
    </ChartWrapper>
  );
};

export default CustomRadialChart;
