import React from "react";
import { line } from "d3-shape";
import { useSpring, useTransition, animated } from "react-spring";
import { scaleLinear } from "d3-scale";
import useChartDimensions from "../../hooks/useChartDimensions.js";
import styled from "styled-components";
import Axes from "./Axes";
import _ from "lodash";

const ChartContainer = styled.div`
  position: sticky;
  top: ${(prop) => (prop.stickTo == "top" ? 0 : null)};
  bottom: ${(prop) => (prop.stickTo == "bottom" ? 0 : null)};
  width: 350px;
  height: 350px;
`;

const LineChartV2 = ({ data, x, y, stickTo }) => {
  const chartSettings = {
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
  };

  const [ref, dms] = useChartDimensions(chartSettings);

  const xScale = scaleLinear().domain([1, 7]).range([0, dms.boundedWidth]);
  const yScale = scaleLinear().domain([0, 900]).range([dms.boundedHeight, 0]);

  const items = data.coordinates;
  const itemKeys = _.map(items, (item) => item.key);

  const transitions = useTransition(items, (item) => item.key, {
    from: { strokeDashoffset: dms.width },
    enter: { strokeDashoffset: 0 },
    leave: { strokeDashoffset: dms.width },
  });

  return (
    <>
      <ChartContainer ref={ref} stickTo={stickTo}>
        <svg width={dms.width} height={dms.height}>
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            {/* Axis layer */}
            <Axes
              domainX={[1, 7]}
              rangeX={[0, dms.boundedWidth]}
              domainY={[0, 900]}
              rangeY={[dms.boundedHeight, 0]}
              numTicksX={7}
              numTicksY={10}
              labelX={"book #"}
              labelY={"pages"}
              dms={dms}
            />
            {/* Plot layer */}
            {items.length === 1 && (
              <circle
                cx={xScale(items[0][x])}
                cy={yScale(items[0][y])}
                r="3"
                style={{
                  fill: "steelblue",
                }}
              />
            )}
            <g>
              {transitions.map(({ item, props }) => {
                return (
                  <animated.svg
                    key={item.key}
                    strokeDasharray={dms.width}
                    strokeDashoffset={props.strokeDashoffset}
                  >
                    <path
                      style={{
                        fill: "none",
                        stroke: "steelblue",
                        strokeWidth: 1.5,
                      }}
                      d={[
                        "M",
                        item.key > 0
                          ? xScale(items[item.key - 1][x])
                          : xScale(item[x]),
                        item.key > 0
                          ? yScale(items[item.key - 1][y])
                          : yScale(item[y]),
                        "L",
                        xScale(item[x]),
                        yScale(item[y]),
                      ].join(" ")}
                    />
                  </animated.svg>
                );
              })}
            </g>
          </g>
        </svg>
      </ChartContainer>
    </>
  );
};

export default LineChartV2;
