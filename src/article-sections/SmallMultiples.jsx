import React from "react";
import styled from "styled-components";
import RadialChart from "../data-viz/semiotic-bar-charts/RadialChart.jsx";
import spells from "../data/spellCounts.json";
import bookTitles from "../data/bookTitles.js";
import _ from "lodash";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const MultipleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h3`
  text-align: center;
`;

const SmallMultiples = () => {
  return (
    <Wrapper>
      {_.range(1, 8).map((book) => (
        <MultipleWrapper key={book}>
          <Title key={`title-${book}`}>{bookTitles[book]}</Title>
          <RadialChart
            key={`chart-${book}`}
            data={spells[book]}
            xAxis={"spell"}
            yAxis={"mentions"}
            width={500}
            height={500}
            sticky={false}
            margin={50}
          />
        </MultipleWrapper>
      ))}
    </Wrapper>
  );
};

export default SmallMultiples;
