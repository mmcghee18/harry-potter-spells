import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import _ from "lodash";
import { Popover, Drawer } from "antd";
import { spellColors } from "../styles.js";
import bookTitles from "../data/bookTitles.js";

const FilledPiece = styled.g`
  opacity: ${(props) => (props.insignificant ? 0.4 : 1)};
  fill: ${(props) => spellColors[props.spellType]};
`;

const Title = styled.p`
  color: #302f2c;
  font-color: white;
`;

const Effect = styled.p`
  color: #302f2c;
`;

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

const MovingPiece = ({ data, book, pathA, pathB, mentions, highlighted }) => {
  const [clickedSpell, setClickedSpell] = useState(null);

  const insignificant = data.mentions < 3;

  const animations = useSpring({
    config: { duration: 1500 },
    d: pathB,
    opacity: insignificant ? 0.4 : 1,
    from: { d: pathA, opacity: 0 },
  });

  const tooltipTitle = (
    <Title>
      {data.spell} : {data.mentions}
    </Title>
  );

  const tooltipContent = (
    <div>
      <Effect>{data.effect}</Effect>
    </div>
  );

  const onClose = () => {
    setClickedSpell(null);
  };

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

  return (
    <>
      <Popover
        arrowPointAtCenter={true}
        title={tooltipTitle}
        content={tooltipContent}
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
      >
        <FilledPiece
          spellType={data.type.toLowerCase()}
          insignificant={insignificant}
          onClick={() => setClickedSpell(data)}
        >
          <animated.path
            {...animations}
            stroke={highlighted ? "white" : null}
            strokeWidth={highlighted ? 2.5 : null}
          />
        </FilledPiece>
      </Popover>
      <Drawer
        title={drawerHeader}
        width={"60vw"}
        placement="right"
        visible={clickedSpell}
        closable={false}
        onClose={onClose}
        bodyStyle={{
          background: "#D6CCA9",
          display: "flex",
          flexDirection: "column",
        }}
        headerStyle={{ background: "#D6CCA9", borderBottom: "none" }}
      >
        {_.map(mentions, (mention, i) => (
          <Mention key={i}>"... {mention} ..."</Mention>
        ))}
      </Drawer>
    </>
  );
};

export default MovingPiece;
