import React from "react";
import styled from "styled-components";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import _ from "lodash";
import "./CustomRadialChart.css";

const canvasWidth = 600;
const canvasHeight = 600;
const margin = 100;

const Pieces = styled.g`
  transform: translate(${canvasWidth / 2}px, ${canvasHeight / 2}px);
`;

const SVGCanvas = styled.svg`
  margin: ${margin}px;
  position: sticky;
  top: ${margin}px;
`;

const mostMentions = (data) => {
  return _.get(
    _.maxBy(data, (d) => d.mentions),
    "mentions"
  );
};

const Piece = ({ data, i, scale, numBars }) => {
  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(data.mentions));

  console.log(`My outer radius is ${scale(data.mentions)}`);

  return (
    <g className={data.type.toLowerCase()}>
      <path d={arcGenerator()} />
    </g>
  );
};

const CustomRadialChart = ({ data }) => {
  const scale = scaleLinear()
    .domain([0, mostMentions(data)])
    .range([0, canvasWidth / 2]);

  return (
    <SVGCanvas height={canvasHeight} width={canvasWidth}>
      <Pieces>
        {_.map(data, (d, i) => (
          <Piece
            key={d.spell}
            data={d}
            i={i}
            scale={scale}
            numBars={data.length}
          />
        ))}
      </Pieces>
    </SVGCanvas>
  );
};

export default CustomRadialChart;
