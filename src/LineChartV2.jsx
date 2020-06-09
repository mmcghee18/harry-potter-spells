import React from "react";
import { line } from "d3-shape";
import { scaleQuantize, scaleLinear } from "d3-scale";

const LineChartV2 = ({ data, xAxis, yAxis }) => {
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
    <svg
      width={dimensions.width}
      height={dimensions.height}
      style={{ margin: "30px" }}
    >
      <path
        style={{ fill: "none", stroke: "steelblue", strokeWidth: 1.5 }}
        d={pathGenerator(data.coordinates)}
      />
    </svg>
  );
};

export default LineChartV2;
