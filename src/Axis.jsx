import React from "react";
import { scaleLinear } from "d3-scale";

const Axis = ({ domain, range, numTicks, dms }) => {
  const scale = scaleLinear().domain(domain).range(range);
  const width = range[1] - range[0];
  const pixelsPerTick = 30;
  const targetNumTicks = numTicks
    ? numTicks
    : Math.max(1, Math.floor(width / pixelsPerTick));

  const ticks = scale
    .ticks(targetNumTicks)
    .map((value) => ({ value, xOffset: scale(value) }));
  console.log(ticks);

  return (
    <g>
      <path
        d={[
          "M",
          range[0],
          dms.boundedHeight + 6,
          "v",
          -6,
          "H",
          range[1],
          "v",
          6,
        ].join(" ")}
        fill="none"
        stroke="black"
      />
      {ticks.map(({ value, xOffset }) => (
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
    </g>
  );
};

export default Axis;
