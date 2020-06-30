import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/CustomRadialChart.jsx";
import spells from "../data/spellCounts.json";
import spellMentions from "../data/spellMentions.json";
import _ from "lodash";
import { writtenThoughts, highlightedSections } from "./bookThoughts.js";
import { useSpring, animated } from "react-spring";

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
  align-items: center;
  align-self: flex-start;
  margin-left: 50px;
`;

const StepWrapper = styled(animated.div)`
  margin: 50vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  opacity: ${(props) => (props.triggered ? 1 : 0.4)};
  &:nth-child(1) {
    margin-top: -20vh;
  }
`;

const Loading = styled.div`
  margin-top: 40px;
`;

const BookTitle = styled.h3`
  font-size: 1.6em;
`;

const BookProgression = () => {
  const [currentBook, setCurrentBook] = useState(1);
  const [previousBook, setPreviousBook] = useState(0);

  const onStepEnter = ({ data, direction }) => {
    if (direction === "up") setPreviousBook(data + 1);
    else if (direction === "down") setPreviousBook(data - 1);
    setCurrentBook(data);
  };

  return !_.isEmpty(spells[currentBook]) ? (
    <>
      <ChartWrapper>
        <CustomRadialChart
          fullData={spells}
          mentions={spellMentions}
          currentBook={currentBook}
          previousBook={previousBook}
          highlightedSections={_.get(highlightedSections, currentBook)}
        />
      </ChartWrapper>

      <ScrollamaWrapper>
        <Scrollama onStepEnter={onStepEnter} offset={0.7}>
          {_.range(1, 8).map((book) => (
            <Step data={book} key={book}>
              <StepWrapper triggered={currentBook === book}>
                <BookTitle>Book {book}</BookTitle>
                <div>{writtenThoughts[book]}</div>
              </StepWrapper>
            </Step>
          ))}
        </Scrollama>
      </ScrollamaWrapper>
    </>
  ) : (
    <Loading>Loading...</Loading>
  );
};

export default BookProgression;
