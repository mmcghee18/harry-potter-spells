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
    oSort: (a, b, aData, bData) => bData[0][yAxis] - aData[0][yAxis],

    /* --- Customize --- */
    pieceClass: (d) => {
      let myClass = d.type.toLowerCase();
      if (d[yAxis] < 3) {
        myClass += " insignificant";
      }
      return myClass;
    },
    baseMarkProps: { transitionDuration: { default: 2000 } },
    renderKey: (datapoint) => datapoint.spell,

    /* --- Annotate --- */
    oLabel: {
      orient: "stem",
      padding: 5,
      label: (d) => (
        <text fill="white" fontSize={12}>
          {d}
        </text>
      ),
    },
  };

  return <Chart {...frameProps} />;
};

export default RadialChart;
