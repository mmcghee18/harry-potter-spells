import React from "react";
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import styled from "styled-components";

const SVGContainer = styled.svg`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
  margin: 30px;
`;

const LineChartV2 = ({ data, xAxis, yAxis, stickTo }) => {
  console.log(data.coordinates);

  const screenWidth = window.innerWidth;
  const chartWidth = screenWidth / 3;
  const dimensions = {
    width: chartWidth,
    height: chartWidth * 0.85,
  };

  const xScale = scaleLinear().domain([1, 7]).range([0, dimensions.width]);
  const yScale = scaleLinear().domain([0, 900]).range([dimensions.height, 0]);

  const pathGenerator = line()
    .x((d) => xScale(d[xAxis]))
    .y((d) => yScale(d[yAxis]));

  return (
    <SVGContainer
      width={dimensions.width}
      height={dimensions.height}
      stickTo={stickTo}
    >
      <path
        style={{ fill: "none", stroke: "steelblue", strokeWidth: 1.5 }}
        d={pathGenerator(data.coordinates)}
      />
    </SVGContainer>
  );
};

export default LineChartV2;
