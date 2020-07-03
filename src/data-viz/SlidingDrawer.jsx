import React, { useState, useRef } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Drawer } from "antd";
import bookTitles from "../data/bookTitles.js";
import Timeline from "./Timeline.jsx";

const Mention = styled.p`
  color: black;
  opacity: ${(props) => (props.highlighted ? 1 : 0.4)};
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
  const [hoveredMention, setHoveredMention] = useState(null);

  const refs = mentions.reduce((acc, value) => {
    acc[value.index] = React.createRef();
    return acc;
  }, {});
  const scrollToMention = (index) => {
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const drawerHeader = (
    <>
      <div>
        <BookTitle>Harry Potter and the {bookTitles[book]}</BookTitle>
        <BlackH3>
          {clickedSpell ? `${clickedSpell.spell} (${clickedSpell.type})` : ""}
        </BlackH3>
        <ItalicizedEffect>
          {clickedSpell ? clickedSpell.effect : null}
        </ItalicizedEffect>
      </div>
      <Timeline
        book={book}
        mentions={mentions}
        clickedSpell={clickedSpell}
        setHoveredMention={setHoveredMention}
        scrollToMention={scrollToMention}
      />
    </>
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
      {_.map(mentions, (mention, i) => {
        const createMarkup = () => {
          return { __html: `... ${mention.text} ...` };
        };

        return (
          <Mention
            key={i}
            ref={refs[mention.index]}
            dangerouslySetInnerHTML={createMarkup()}
            highlighted={
              hoveredMention ? hoveredMention === mention.index : true
            }
          />
        );
      })}
    </Drawer>
  );
};

export default SlidingDrawer;
