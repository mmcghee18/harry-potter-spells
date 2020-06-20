import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import "./CustomRadialChart.css";
import Piece from "./Piece.jsx";
import MovingPiece from "./MovingPiece.jsx";
import { useTransition, animated, useSpring } from "react-spring";
import {
  canvasWidth,
  canvasHeight,
  margin,
  mostMentions,
  getPath,
} from "./utils.js";

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

const CustomRadialChart = ({
  fullData,
  currentData,
  currentBook,
  previousData,
  previousBook,
}) => {
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const visibleSpells = _.map(currentData, (d) => d.spell);
  const previousSpells = _.map(previousData, (d) => d.spell);

  const barsToMove = _.intersection(visibleSpells, previousSpells);

  return (
    <>
      <SVGCanvas height={canvasHeight} width={canvasWidth}>
        {/* Create pieces for all 7 charts, on top of each other */}
        {_.range(1, 8).map((book) => {
          const data = fullData[book];

          return (
            <Pieces key={book}>
              {_.map(data, (d) => {
                if (barsToMove.includes(d.spell)) {
                  return (
                    <MovingPiece
                      key={d.spell}
                      data={d}
                      setHoveredPiece={setHoveredPiece}
                      setMouseX={setMouseX}
                      setMouseY={setMouseY}
                      isShowing={
                        visibleSpells.includes(d.spell) && currentBook == book
                      }
                      previousPath={
                        barsToMove.includes(d.spell)
                          ? getPath(previousBook, d.spell)
                          : null
                      }
                      book={currentBook}
                    />
                  );
                }
                return (
                  <Piece
                    key={d.spell}
                    data={d}
                    setHoveredPiece={setHoveredPiece}
                    setMouseX={setMouseX}
                    setMouseY={setMouseY}
                    isShowing={
                      visibleSpells.includes(d.spell) && currentBook == book
                    }
                    book={currentBook}
                  />
                );
              })}
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
