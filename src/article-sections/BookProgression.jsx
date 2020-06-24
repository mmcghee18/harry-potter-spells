import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/CustomRadialChart.jsx";
import spells from "../data/spellCounts.json";
import _ from "lodash";

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

const StepWrapper = styled.div`
  margin: 50vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
`;

const Loading = styled.div`
  margin-top: 40px;
`;

const BookTitle = styled.h3`
  font-size: 1.6em;
`;

const BookProgression = () => {
  const [book, setBook] = useState(1);
  const [previousBook, setPreviousBook] = useState(0);

  const onStepEnter = ({ data, direction }) => {
    if (direction === "up") setPreviousBook(data + 1);
    else if (direction === "down") setPreviousBook(data - 1);
    setBook(data);
  };

  return !_.isEmpty(spells[book]) ? (
    <>
      <ChartWrapper>
        <CustomRadialChart
          fullData={spells}
          currentBook={book}
          previousBook={previousBook}
        />
      </ChartWrapper>

      <ScrollamaWrapper>
        <Scrollama onStepEnter={onStepEnter} offset={0.7}>
          {_.range(1, 8).map((book) => (
            <Step data={book} key={book}>
              <StepWrapper>
                <BookTitle>Book {book}</BookTitle>
                <div>{bookThoughts[book]}</div>
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

const bookThoughts = {
  1: (
    <>
      <p>Turns out there's not actually that much magic in Book 1.</p>
      <p>
        The most uttered spell is <strong>Wingardium Leviosa</strong>, which
        Harry, Ron, and Hermione learn in Charms class and later use to defeat a
        troll.
      </p>
      <p>Click on a spell to see where it's mentioned!</p>
    </>
  ),
  2: <p>thoughts about book 2</p>,
  3: <p>thoughts about book 3</p>,
  4: <p>thoughts about book 4</p>,
  5: <p>thoughts about book 5</p>,
  6: <p>thoughts about book 6</p>,
  7: <p>thoughts about book 7</p>,
};
