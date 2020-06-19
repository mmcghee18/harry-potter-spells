import React from "react";
import XYFrame from "semiotic/lib/XYFrame";
import styled from "styled-components";

const Chart = styled(XYFrame)`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
`;

const LineChart = ({ data, xAxis, yAxis, title, stickTo }) => {
  const frameProps = {
    /* --- Data --- */
    lines: data,

    /* --- Size --- */
    size: [400, 400],
    margin: 70,

    /* --- Layout --- */
    type: "bar",

    /* --- Process --- */
    xAccessor: xAxis,
    yAccessor: yAxis,

    /* --- Customize --- */
    lineStyle: (d, i) => ({
      stroke: "#E0488B",
      strokeWidth: 2,
      fill: "none",
    }),
    title,
    axes: [
      {
        orient: "left",
        label: "Number of Pages",
      },
      {
        orient: "bottom",
        label: { name: "Book Number", locationDistance: 55 },
      },
    ],
  };

  return <Chart {...frameProps} stickTo={stickTo} />;
};

export default LineChart;
