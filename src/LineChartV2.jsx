import React from "react";
import { line } from "d3-shape";
import { useSpring, useTransition, animated } from "react-spring";
import { scaleLinear } from "d3-scale";
import useChartDimensions from "./hooks/useChartDimensions.js";
import styled from "styled-components";
import Axes from "./Axes";

const ChartContainer = styled.div`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
  width: 350px;
  height: 350px;
`;

const LineChartV2 = ({ data, x, y, stickTo }) => {
  const chartSettings = {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
  };

  const [ref, dms] = useChartDimensions(chartSettings);

  const xScale = scaleLinear().domain([1, 7]).range([0, dms.boundedWidth]);
  const yScale = scaleLinear().domain([0, 900]).range([dms.boundedHeight, 0]);

  const pathGenerator = line()
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]));

  console.log(pathGenerator(data.coordinates));

  return (
    <>
      <ChartContainer ref={ref} stickTo={stickTo}>
        <svg width={dms.width} height={dms.height}>
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            {/* Axis layer */}
            <Axes
              domainX={[1, 7]}
              rangeX={[0, dms.boundedWidth]}
              domainY={[0, 900]}
              rangeY={[dms.boundedHeight, 0]}
              numTicksX={7}
              numTicksY={10}
              dms={dms}
            />
            {/* Plot layer */}
            <g>
              {/* <path
                style={{
                  fill: "none",
                  stroke: "steelblue",
                  strokeWidth: 1.5,
                }}
                d={pathGenerator(data.coordinates)}
              /> */}
              {data.coordinates.map((d, i) => (
                <line
                  x1={i > 0 ? xScale(data.coordinates[i - 1][x]) : xScale(d[x])}
                  y1={i > 0 ? yScale(data.coordinates[i - 1][y]) : yScale(d[y])}
                  x2={xScale(d[x])}
                  y2={yScale(d[y])}
                  style={{
                    stroke: "steelblue",
                    strokeWidth: 1.5,
                  }}
                />
              ))}
            </g>
          </g>
        </svg>
      </ChartContainer>
    </>
  );
};

export default LineChartV2;
