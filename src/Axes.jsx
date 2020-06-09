import React from "react";
import { scaleLinear } from "d3-scale";

const Axes = ({
  domainX,
  rangeX,
  domainY,
  rangeY,
  numTicksX,
  numTicksY,
  dms,
}) => {
  const scaleX = scaleLinear().domain(domainX).range(rangeX);
  const scaleY = scaleLinear().domain(domainY).range(rangeY);
  const height = rangeY[0] - rangeY[1];
  const width = rangeX[1] - rangeX[0];

  const pixelsPerTick = 30;
  const targetNumTicksX = numTicksX
    ? numTicksX
    : Math.max(1, Math.floor(width / pixelsPerTick));
  const targetNumTicksY = numTicksY
    ? numTicksY
    : Math.max(1, Math.floor(height / pixelsPerTick));

  const ticksX = scaleX
    .ticks(targetNumTicksX)
    .map((value) => ({ value, xOffset: scaleX(value) }));
  const ticksY = scaleY
    .ticks(targetNumTicksY)
    .map((value) => ({ value, yOffset: scaleY(value) }));

  return (
    <g>
      {/* X axis */}
      <path
        d={[
          "M",
          rangeX[0],
          dms.boundedHeight + 6,
          "v",
          -6,
          "H",
          rangeX[1],
          "v",
          6,
        ].join(" ")}
        fill="none"
        stroke="black"
      />
      {ticksX.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, ${dms.boundedHeight})`}
        >
          <line y2="6" stroke="black" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {/* { Y axis */}
      <path
        d={[
          "M",
          rangeX[0] - 6,
          rangeY[1],
          "h",
          6,
          "V",
          rangeY[0],
          "h",
          -6,
        ].join(" ")}
        fill="none"
        stroke="red"
      />
      {ticksY.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2="-6" stroke="black" />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

export default Axes;
