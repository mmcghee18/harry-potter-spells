import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import MovingPiece from "./MovingPiece.jsx";
import StaticPiece from "./StaticPiece.jsx";
import Legend from "./Legend.jsx";
import { getPath, getNullPath } from "./utils.js";
import useChartDimensions from "../hooks/useChartDimensions.js";

const ChartWrapper = styled.div`
  height: ${(props) => (props.fullScreen ? "85vh" : "22vh")};
  margin-right: 20px;
  width: 90%;
`;

const Bounds = styled.g`
  transform: ${(props) =>
    `translate(${props.boundedWidth / 2}px, ${props.boundedHeight / 2}px)`};
`;

const CustomRadialChart = ({
  fullData,
  mentions,
  currentBook,
  previousBook,
  highlightedSections,
  smallMultiple = false,
  selectedSpell = null,
}) => {
  const visibleSpells = _.map(_.get(fullData, currentBook), (d) => d.spell);
  let previousSpells = [];
  if (!smallMultiple) {
    previousSpells = _.map(_.get(fullData, previousBook), (d) => d.spell);
  }

  let chartSettings = {};
  if (smallMultiple) {
    chartSettings = { marginTop: 10 };
  } else {
    chartSettings = { marginBottom: 200 };
  }
  const [ref, dms] = useChartDimensions(chartSettings);

  return (
    <ChartWrapper ref={ref} fullScreen={!smallMultiple}>
      <svg height={dms.height} width={dms.width}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          <Bounds
            boundedWidth={dms.boundedWidth}
            boundedHeight={dms.boundedHeight}
          >
            {_.map(fullData[currentBook], (d) => {
              if (smallMultiple) {
                return (
                  <StaticPiece
                    key={`${d.spell}${d.book}`}
                    data={d}
                    path={getPath(
                      currentBook,
                      d.spell,
                      _.min([dms.boundedWidth, dms.boundedHeight])
                    )}
                    highlighted={selectedSpell === d.spell}
                  />
                );
              }
              const entering =
                visibleSpells.includes(d.spell) &&
                !previousSpells.includes(d.spell);

              let pathA = null;
              if (entering) {
                // Animate in from center
                pathA = getNullPath(currentBook, d.spell);
              } else {
                // Animate from previous position
                pathA = getPath(
                  previousBook,
                  d.spell,
                  _.min([dms.boundedWidth, dms.boundedHeight])
                );
              }
              const pathB = getPath(
                currentBook,
                d.spell,
                _.min([dms.boundedWidth, dms.boundedHeight])
              );

              return dms.height !== 0 && dms.width !== 0 ? (
                <MovingPiece
                  key={`${d.spell}${d.book}`}
                  data={d}
                  book={currentBook}
                  pathA={pathA}
                  pathB={pathB}
                  mentions={mentions ? mentions[currentBook][d.spell] : null}
                  highlighted={
                    highlightedSections
                      ? highlightedSections.includes(d.spell)
                      : false
                  }
                />
              ) : null;
            })}
          </Bounds>
        </g>
        {!smallMultiple && <Legend dms={dms} data={fullData[currentBook]} />}
      </svg>
    </ChartWrapper>
  );
};

export default CustomRadialChart;
