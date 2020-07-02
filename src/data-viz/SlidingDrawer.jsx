import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { Drawer } from "antd";
import bookTitles from "../data/bookTitles.js";
import Timeline from "./Timeline.jsx";

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
