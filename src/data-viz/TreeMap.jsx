import React from "react";
import fakeData from "../data/flare-2.json";
import useChartDimensions from "../hooks/useChartDimensions.js";
import { treemap, hierarchy } from "d3-hierarchy";
import { scaleOrdinal, schemeCategory10 } from "d3-scale";

const getParentNode = (node) => {
  let n = node;
  while (n.depth > 1) {
    n = n.parent;
  }
  return n.data.name;
};

const TreeMap = () => {
  const chartSettings = { marginLeft: 50, marginRight: 50 };
  const [ref, dms] = useChartDimensions(chartSettings);

  const h = hierarchy(fakeData)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
  const tm = treemap().size([dms.boundedWidth, dms.boundedHeight]).padding(1)(
    h
  );
  const leaves = tm.leaves();
  console.log({ leaves });

  const colorScale = scaleOrdinal(schemeCategory10);

  return (
    <div
      ref={ref}
      style={{
        height: "600px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg height={dms.height} width={dms.width}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          {leaves.map((node) => {
            const { data, parent, depth, height, x0, x1, y0, y1 } = node;
            const topParent = getParentNode(node);
            return (
              <rect
                x={x0}
                y={y0}
                height={y1 - y0}
                width={x1 - x0}
                fill={colorScale(topParent)}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TreeMap;
