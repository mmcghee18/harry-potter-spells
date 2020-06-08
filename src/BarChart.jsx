import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";

const Chart = styled(OrdinalFrame)`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
`;

const BarChart = ({ data, xAxis, yAxis, title, stickTo }) => {
  const frameProps = {
    /* --- Data --- */
    data,

    /* --- Size --- */
    size: [350, 350],
    margin: 100,

    /* --- Layout --- */
    type: "bar",

    /* --- Process --- */
    oAccessor: xAxis,
    rAccessor: yAxis,

    /* --- Customize --- */
    style: { fill: "#2d4c80", stroke: "white" },
    title,

    /* --- Annotate --- */
    oLabel: (d) => (
      <text fontSize={14} transform="rotate(45)">
        {d}
      </text>
    ),
  };

  return <Chart {...frameProps} stickTo={stickTo} />;
};

export default BarChart;
