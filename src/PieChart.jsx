import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";
import styled from "styled-components";

const Chart = styled(OrdinalFrame)`
  position: sticky;
  top: 0;
  height: 100%;
`;

const PieChart = ({ data }) => {
  const frameProps = {
    /* --- Data --- */
    data,

    /* --- Size --- */
    size: [300, 300],
    margin: 70,

    /* --- Layout --- */
    type: "bar",
    projection: "radial",
    dynamicColumnWidth: "population",

    /* --- Process --- */
    oAccessor: "race",

    /* --- Customize --- */
    style: { fill: "#2d4c80", stroke: "white" },
    title: "Population",

    /* --- Annotate --- */
    oLabel: true,
  };

  return <Chart {...frameProps} />;
};

export default PieChart;
