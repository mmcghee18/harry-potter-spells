import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/CustomRadialChart.jsx";
import TreeMap from "../data-viz/TreeMap.jsx";
import _ from "lodash";
import { writtenThoughts, highlightedSections } from "./bookThoughts.js";
import treeDataByBook from "../data/treeDataByBook.json";

const Wrapper = styled.div`
  width: 100%;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 10%;
`;

const ScrollamaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 74px;
`;

const StepWrapper = styled.div`
  margin: 50vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  opacity: ${(props) => (props.$triggered ? 1 : 0.4)};
  z-index: 1000;
  &:nth-child(1) {
    margin-top: -20vh;
  }
`;

const Loading = styled.div`
  margin-top: 40px;
`;

const BookProgression = ({ spells, spellMentions }) => {
  const [currentBook, setCurrentBook] = useState(1);
  const [previousBook, setPreviousBook] = useState(0);

  const onStepEnter = ({ data, direction }) => {
    if (direction === "up") setPreviousBook(data + 1);
    else if (direction === "down") setPreviousBook(data - 1);
    setCurrentBook(data);
  };

  return !_.isEmpty(spells[currentBook]) ? (
    <Wrapper>
      <ChartWrapper>
        <TreeMap data={treeDataByBook[currentBook]} />
      </ChartWrapper>

      <ScrollamaWrapper>
        <Scrollama onStepEnter={onStepEnter} offset={0.6}>
          {_.range(1, 8).map((book) => (
            <Step data={book} key={book}>
              <StepWrapper $triggered={currentBook === book}>
                <h1>Book {book}</h1>
                <div>{writtenThoughts[book]}</div>
              </StepWrapper>
            </Step>
          ))}
        </Scrollama>
      </ScrollamaWrapper>
    </Wrapper>
  ) : (
    <Loading>Loading...</Loading>
  );
};

export default BookProgression;
