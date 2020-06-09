import React from "react";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import useChartDimensions from "./hooks/useChartDimensions.js";
import styled from "styled-components";
import Axis from "./Axis";

const ChartContainer = styled.div`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
  width: 350px;
  height: 350px;
`;

const LineChartV2 = ({ data, x, y, stickTo }) => {
  // const screenWidth = window.innerWidth;
  // const chartWidth = screenWidth / 3;
  // const dimensions = {
  //   width: chartWidth,
  //   height: chartWidth * 0.85,
  // };

  const chartSettings = {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 50,
  };

  const [ref, dms] = useChartDimensions(chartSettings);
  console.log(dms);

  const xScale = scaleLinear().domain([1, 7]).range([0, dms.boundedWidth]);
  const yScale = scaleLinear().domain([0, 900]).range([dms.boundedHeight, 0]);

  const pathGenerator = line()
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]));

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
            <Axis
              domain={[1, 7]}
              range={[0, dms.boundedWidth]}
              numTicks={7}
              dms={dms}
            />
            {/* Plot layer */}
            <g>
              <path
                style={{ fill: "none", stroke: "steelblue", strokeWidth: 1.5 }}
                d={pathGenerator(data.coordinates)}
              />
            </g>
          </g>
        </svg>
      </ChartContainer>
    </>
  );
};

export default LineChartV2;
