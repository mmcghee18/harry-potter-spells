import React from "react";
import OrdinalFrame from "semiotic/lib/OrdinalFrame";

const PieChart = () => {
  const frameProps = {
    /* --- Data --- */
    data: [
      { race: "Black", population: 5000 },
      { race: "White", population: 40000 },
    ],

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
    style: { fill: "#ac58e5", stroke: "white" },
    title: "Population",

    /* --- Annotate --- */
    oLabel: true,
  };

  return <OrdinalFrame {...frameProps} />;
};

export default PieChart;
