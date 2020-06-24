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
`;

const Loading = styled.div`
  margin-top: 40px;
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
                <div>Book {book}</div>
                <div>some thoughts about the book</div>
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
