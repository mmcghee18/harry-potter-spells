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
    size: [300, 300],
    margin: 70,

    /* --- Layout --- */
    type: "bar",

    /* --- Process --- */
    oAccessor: xAxis,
    rAccessor: yAxis,

    /* --- Customize --- */
    style: { fill: "#2d4c80", stroke: "white" },
    title,

    /* --- Annotate --- */
    oLabel: true,
  };

  return <Chart {...frameProps} stickTo={stickTo} />;
};

export default BarChart;
