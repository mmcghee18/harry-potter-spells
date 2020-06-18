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

const CustomRadialChart = () => {
  const data = [
    { spell: "Alohomora", mentions: 2, type: "Charm" },
    { spell: "(Anti-Cheating Spell)", mentions: 1, type: "Spell" },
    { spell: "Bluebell Flames", mentions: 1, type: "Spell" },
    { spell: "Locomotor Mortis", mentions: 1, type: "Curse" },
    { spell: "Mimblewimble", mentions: 1, type: "Curse" },
    { spell: "Petrificus Totalus", mentions: 1, type: "Curse" },
    { spell: "Switching Spell", mentions: 1, type: "Spell" },
    { spell: "Wingardium Leviosa", mentions: 3, type: "Charm" },
  ];

  const scale = scaleLinear()
    .domain([0, mostMentions(data)])
    .range([0, canvasWidth / 2]);

  return (
    <svg height={canvasHeight} width={canvasWidth} style={{ margin }}>
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
    </svg>
  );
};

export default CustomRadialChart;
