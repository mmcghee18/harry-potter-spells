import React, { useState } from "react";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/CustomRadialChart.jsx";
import bookTitles from "../data/bookTitles.js";
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
`;

const Text = styled.div`
  width: 60vw;
  height: 30vh;
`;

const SectionContainer = styled.div`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SmallMultiples = ({ spells }) => {
  const [selectedSpell, setSelectedSpell] = useState(null);

  return (
    <SectionContainer>
      <h1>Bird's Eye View</h1>
      <WrappingRows>
        {_.range(1, 8).map((book) => {
          const lookupMentions = _.get(
            _.find(spells[book], (d) => d.spell === selectedSpell),
            "mentions"
          );
          const mentions = lookupMentions ? lookupMentions : 0;
          return (
            <ChartWrapper key={book}>
              <h3 key={`title-${book}`}>{bookTitles[book]}</h3>
              <CustomRadialChart
                fullData={spells}
                currentBook={book}
                smallMultiple={true}
                selectedSpell={selectedSpell}
              />
              <p key={`mentions-${book}`}>{mentions === 0 ? "-" : mentions}</p>
            </ChartWrapper>
          );
        })}
        <Text>
          <p>
            <a
              href="#"
              onClick={(e) => {
                setSelectedSpell("Alohomora");
                e.preventDefault();
              }}
            >
              Alohomora
            </a>
          </p>
          <p>
            <a
              href="#"
              onClick={(e) => {
                setSelectedSpell("Avada Kedavra");
                e.preventDefault();
              }}
            >
              Avada Kedavra
            </a>
          </p>
          <p>
            <a
              href="#"
              onClick={(e) => {
                setSelectedSpell("Accio");
                e.preventDefault();
              }}
            >
              Accio
            </a>
          </p>
        </Text>
      </WrappingRows>
    </SectionContainer>
  );
};

export default SmallMultiples;
