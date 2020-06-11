import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";
import { scaleSqrt } from "d3-scale";

const Chart = styled(OrdinalFrame)`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
`;

const RadialChart = ({ data, xAxis, yAxis, title, stickTo }) => {
  const frameProps = {
    /* --- Data --- */
    data,

    /* --- Size --- */
    size: [350, 350],
    margin: 100,

    /* --- Layout --- */
    type: "bar",
    projection: "radial",

    /* --- Process --- */
    oAccessor: xAxis,
    rAccessor: yAxis,
    rScaleType: scaleSqrt(),

    /* --- Customize --- */
    style: { fill: "#ac58e5", stroke: "white" },
    title,

    /* --- Annotate --- */
    oLabel: (d) => <text fontSize={14}>{d}</text>,
  };

  return <Chart {...frameProps} stickTo={stickTo} />;
};

export default RadialChart;
