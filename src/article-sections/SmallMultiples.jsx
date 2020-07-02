import React, { useState } from "react";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/CustomRadialChart.jsx";
import bookTitles from "../data/bookTitles.js";
import { spellColors } from "../styles.js";
import _ from "lodash";

const WrappingRows = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.33vw;
  position: relative;
`;

const Mentions = styled.p`
  position: absolute;
  top: 12.5vh;
  right: 16.66vw;
  font-size: 2.5em;
`;

const Text = styled.div`
  width: 60vw;
  height: 30vh;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SpellContainer = styled.p`
  margin-right: 10px;
`;

const Spell = styled.a`
  color: white;
  opacity: ${(props) => (props.selected ? 1 : 0.4)};
  background: ${(props) =>
    props.selected ? spellColors[props.spellType] : null};
  color: ${(props) =>
    props.spellType === "charm" && props.selected ? "black" : "white"};

  &:hover {
    color: ${(props) =>
      props.spellType === "charm" && props.selected ? "black" : "white"};
    opacity: 1;
  }
`;

const SectionContainer = styled.div`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Fade = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 100px;
  z-index: 100;
  background: linear-gradient(
    to top,
    rgb(48, 47, 44) 0%,
    rgb(48, 47, 44, 0) 100%
  );
`;

const Title = styled.h3`
  opacity: ${(props) => (props.hasMentions ? 1 : 0.1)};
`;

const getListOfUniqueSpells = (spells) => {
  const spellsForEachBook = _.map(spells, (bookData) =>
    _.map(bookData, (d) => ({ spell: d.spell, type: d.type }))
  );
  const allSpells = _.union(...spellsForEachBook);
  const uniqueSpells = _.uniqBy(allSpells, (s) => s.spell);

  return _.sortBy(uniqueSpells, (d) => {
    if (d.spell.includes("(")) {
      return d.spell.substring(1, d.spell.length - 1);
    }
    return d.spell;
  });
};

const SmallMultiples = ({ spells }) => {
  const [selectedSpell, setSelectedSpell] = useState(null);

  return (
    <SectionContainer>
      <h1>An Owl's-Eye View</h1>
      <WrappingRows>
        {_.range(1, 8).map((book) => {
          const lookupMentions = _.get(
            _.find(spells[book], (d) => d.spell === selectedSpell),
            "mentions"
          );
          const mentions = lookupMentions ? lookupMentions : 0;
          return (
            <ChartWrapper key={book}>
              <Title key={`title-${book}`} hasMentions={mentions !== 0}>
                {bookTitles[book]}
              </Title>
              <CustomRadialChart
                fullData={spells}
                currentBook={book}
                smallMultiple={true}
                selectedSpell={selectedSpell}
              />
              <Mentions key={`mentions-${book}`}>
                <strong>{mentions !== 0 ? mentions : null}</strong>
              </Mentions>
            </ChartWrapper>
          );
        })}
        <Text>
          {_.map(getListOfUniqueSpells(spells), ({ spell, type }) => (
            <SpellContainer key={spell}>
              <Spell
                href="#"
                onClick={(e) => {
                  setSelectedSpell(spell);
                  e.preventDefault();
                }}
                selected={spell === selectedSpell}
                spellType={type.toLowerCase()}
              >
                {spell}
              </Spell>
            </SpellContainer>
          ))}
        </Text>
      </WrappingRows>
      <Fade />
    </SectionContainer>
  );
};

export default SmallMultiples;
