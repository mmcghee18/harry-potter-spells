import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { Drawer } from "antd";
import { animated, config, useSprings } from "react-spring";
import { scaleLinear } from "d3-scale";
import bookLengths from "../data/bookLengths.js";
import bookTitles from "../data/bookTitles.js";
import useChartDimensions from "../hooks/useChartDimensions.js";

const Mention = styled.p`
  color: black;
`;

const BlackH3 = styled.h3`
  color: black;
  margin-top: 30px;
`;

const BookTitle = styled.h1`
  color: black;
  text-align: center;
  font-size: 2em;
`;

const ItalicizedEffect = styled.p`
  font-style: italic;
`;

const Timeline = ({ book, mentions, clickedSpell }) => {
  const chartSettings = { height: 50 };
  const [ref, dms] = useChartDimensions(chartSettings);
  const domain = [0, bookLengths[book]]; // book character indicies
  const range = [10, dms.width - 20]; // width of line
  const xScale = scaleLinear().domain(domain).range(range);
  const circleR = 3;

  const [springs, set, stop] = useSprings(mentions.length, (m) => ({
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

const SlidingDrawer = ({ clickedSpell, setClickedSpell, mentions, book }) => {
  const drawerHeader = (
    <div>
      <BookTitle>Harry Potter and the {bookTitles[book]}</BookTitle>
      <BlackH3>
        {clickedSpell ? `${clickedSpell.spell} (${clickedSpell.type})` : ""}
      </BlackH3>
      <ItalicizedEffect>
        {clickedSpell ? clickedSpell.effect : null}
      </ItalicizedEffect>
    </div>
  );

  const onClose = () => {
    setClickedSpell(null);
  };

  return (
    <Drawer
      title={drawerHeader}
      width={"60vw"}
      placement="right"
      visible={clickedSpell}
      closable={false}
      onClose={onClose}
      bodyStyle={{
        background: "#d4be87",
        display: "flex",
        flexDirection: "column",
      }}
      headerStyle={{ background: "#d4be87", borderBottom: "none" }}
    >
      <Timeline book={book} mentions={mentions} clickedSpell={clickedSpell} />
      {_.map(mentions, (mention, i) => (
        <Mention key={i}>"... {mention.text} ..."</Mention>
      ))}
    </Drawer>
  );
};

export default SlidingDrawer;
