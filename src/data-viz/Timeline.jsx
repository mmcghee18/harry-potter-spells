import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { animated, useSprings } from "react-spring";
import { scaleLinear } from "d3-scale";
import bookLengths from "../data/bookLengths.js";
import useChartDimensions from "../hooks/useChartDimensions.js";

const Timeline = ({ book, mentions, clickedSpell }) => {
  const chartSettings = { height: 50 };
  const [ref, dms] = useChartDimensions(chartSettings);
  const domain = [0, bookLengths[book]]; // book character indicies
  const range = [10, dms.width - 20]; // width of line
  const xScale = scaleLinear().domain(domain).range(range);
  const circleR = 3;

  const [springs, set] = useSprings(mentions.length, (m) => ({
    cx: -20,
  }));
  set((m) => {
    return clickedSpell
      ? {
          cx: xScale(mentions[m].index),
          delay: 500,
          config: { mass: 1, tension: 160, friction: 17 },
        }
      : { cx: -20 };
  });

  return (
    <div ref={ref}>
      <svg width={dms.width} height={dms.height}>
        <path
          d={["M", range[0], chartSettings.height / 2, "H", range[1]].join(" ")}
          stroke="grey"
        />
        {springs.map((props, i) => (
          <>
            <animated.circle
              key={i}
              cx={props.cx}
              cy={chartSettings.height / 2}
              r={circleR}
            />
          </>
        ))}
      </svg>
    </div>
  );
};

export default Timeline;
