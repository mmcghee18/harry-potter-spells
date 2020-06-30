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
  console.log({ spells });

  return (
    <SectionContainer>
      <h1>Bird's Eye View</h1>
      <WrappingRows>
        {_.range(1, 8).map((book) => (
          <ChartWrapper key={book}>
            <h3 key={`title-${book}`}>{bookTitles[book]}</h3>
            <CustomRadialChart
              fullData={spells}
              currentBook={book}
              smallMultiple={true}
              selectedSpell={selectedSpell}
            />
            <p key={`mentions-${book}`}>5</p>
          </ChartWrapper>
        ))}
        <Text>
          <h1>All Spells</h1>
          <ul>
            <li>
              <a href="#" onClick={() => setSelectedSpell("Alohomora")}>
                Alohomora
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setSelectedSpell("Avada Kedavra")}>
                Avada Kedavra
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setSelectedSpell("Accio")}>
                Accio
              </a>
            </li>
          </ul>
        </Text>
      </WrappingRows>
    </SectionContainer>
  );
};

export default SmallMultiples;
