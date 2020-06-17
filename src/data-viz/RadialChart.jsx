import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";
import { scaleSqrt } from "d3-scale";
import "./RadialChart.css";

const Chart = styled(OrdinalFrame)`
  position: ${(props) => (props.sticky ? "sticky" : null)};
  top: ${(props) => (props.sticky ? 0 : null)};
`;

const Tooltip = styled.div`
  display: flex;
  background-color: white;
  color: black;
  border-radius: 10px;
  height: 80px;
  width: 180px;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const RadialChart = ({ data, xAxis, yAxis, width, height, margin, sticky }) => {
  const frameProps = {
    /* --- Data --- */
    data,

    /* --- Size --- */
    size: [width, height],
    margin: margin ? margin : 100,

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

    /* --- Interact --- */
    hoverAnnotation: true,
    tooltipContent: (d) => (
      <Tooltip>
        {d.summary[0].data[xAxis]} : {d.summary[0].data[yAxis]}
      </Tooltip>
    ),

    /* --- Annotate --- */
    // oLabel: {
    //   orient: "stem",
    //   padding: 5,
    //   label: (d) => (
    //     <text fill="white" fontSize={12}>
    //       {d}
    //     </text>
    //   ),
    // },
  };

  return <Chart {...frameProps} sticky={sticky} />;
};

export default RadialChart;
