import React, { useState } from "react";
import styled from "styled-components";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import _ from "lodash";
import "./CustomRadialChart.css";
import { useTransition, animated } from "react-spring";

const canvasWidth = 600;
const canvasHeight = 600;
const margin = 100;

const Pieces = styled.g`
  transform: translate(${canvasWidth / 2}px, ${canvasHeight / 2}px);
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
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

const SVGCanvas = styled.svg`
  margin: ${margin}px;
  position: sticky;
  top: ${margin}px;
`;

const AnnotationLayer = styled.div``;

const mostMentions = (data) => {
  return _.get(
    _.maxBy(data, (d) => d.mentions),
    "mentions"
  );
};

const Piece = ({
  data,
  i,
  scale,
  numBars,
  setHoveredPiece,
  setMouseX,
  setMouseY,
}) => {
  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(data.mentions));

  return (
    <g
      className={data.type.toLowerCase()}
      onMouseEnter={(e) => {
        setHoveredPiece(data);
        setMouseX(e.nativeEvent.pageX);
        setMouseY(e.nativeEvent.pageY);
      }}
      onMouseLeave={() => {
        setHoveredPiece(null);
        setMouseX(null);
        setMouseY(null);
      }}
    >
      <path d={arcGenerator()} />
    </g>
  );
};

const CustomRadialChart = ({ data }) => {
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const scale = scaleLinear()
    .domain([0, mostMentions(data)])
    .range([0, canvasWidth / 2]);

  return (
    <>
      <SVGCanvas height={canvasHeight} width={canvasWidth}>
        <Pieces>
          {_.map(data, (d, i) => (
            <Piece
              key={d.spell}
              data={d}
              i={i}
              scale={scale}
              numBars={data.length}
              setHoveredPiece={setHoveredPiece}
              setMouseX={setMouseX}
              setMouseY={setMouseY}
            />
          ))}
        </Pieces>
      </SVGCanvas>
      <AnnotationLayer>
        {hoveredPiece && (
          <Tooltip key={hoveredPiece.spell} $x={mouseX} $y={mouseY}>
            {hoveredPiece.spell} : {hoveredPiece.mentions}
          </Tooltip>
        )}
      </AnnotationLayer>
    </>
  );
};

export default CustomRadialChart;
