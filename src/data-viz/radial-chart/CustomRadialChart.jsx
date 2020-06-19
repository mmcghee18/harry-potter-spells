import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import _ from "lodash";
import "./CustomRadialChart.css";
import Piece from "./Piece.jsx";
import { useTransition, animated, useSpring } from "react-spring";
import { canvasWidth, canvasHeight, margin, mostMentions } from "./utils.js";

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

const CustomRadialChart = ({ fullData, currentData, currentBook }) => {
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const [visibleSpells, setVisibleSpells] = useState(
    _.map(currentData, (d) => d.spell)
  );

  useEffect(() => {
    setVisibleSpells(_.map(currentData, (d) => d.spell));
  }, [currentData]);

  return (
    <>
      <SVGCanvas height={canvasHeight} width={canvasWidth}>
        {/* Create pieces for all 7 charts, on top of each other */}
        {_.range(1, 8).map((book) => {
          const data = fullData[book];
          const scale = scaleLinear()
            .domain([0, mostMentions(data)])
            .range([0, canvasWidth / 2]);

          return (
            <Pieces key={book}>
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
                  isShowing={
                    visibleSpells.includes(d.spell) && currentBook == book
                  }
                />
              ))}
            </Pieces>
          );
        })}
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
