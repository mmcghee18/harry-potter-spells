import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";
import { scaleSqrt } from "d3-scale";
import "./RadialChart.css";

const Chart = styled(OrdinalFrame)`
  position: sticky;
  top: 0;
`;

const RadialChart = ({ data, xAxis, yAxis, title }) => {
  const frameProps = {
    /* --- Data --- */
    data,

    /* --- Size --- */
    size: [window.innerHeight - 100, window.innerWidth - 100],
    margin: 100,

    /* --- Layout --- */
    type: "bar",
    projection: "radial",

    /* --- Process --- */
    oAccessor: xAxis,
    rAccessor: yAxis,
    rScaleType: scaleSqrt(),

    /* --- Customize --- */
    //style: { fill: "#ac58e5", stroke: "white" },
    pieceClass: (d) => d["type"].toLowerCase(),

    title,

    /* --- Annotate --- */
    oLabel: (d) => <text fontSize={14}>{d}</text>,
  };

  return <Chart {...frameProps} />;
};

export default RadialChart;
