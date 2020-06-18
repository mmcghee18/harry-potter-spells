import React, { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled, { createGlobalStyle } from "styled-components";
import RadialChart from "../data-viz/RadialChart.jsx";
import spells from "../data/spellCounts.json";
import bookTitles from "../data/bookTitles.js";
import _ from "lodash";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ScrollamaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepWrapper = styled.div`
  margin: 50vh 0;
  font-size: 50px;
`;

const BookProgression = () => {
  const [book, setBook] = useState(null);

  const onStepEnter = ({ data }) => {
    setBook(data);
  };

  return (
    <Wrapper>
      <ScrollamaWrapper>
        <Scrollama onStepEnter={onStepEnter} offset={0.5}>
          {_.range(1, 8).map((book) => (
            <Step data={book} key={book}>
              <StepWrapper>{book}</StepWrapper>
            </Step>
          ))}
        </Scrollama>
      </ScrollamaWrapper>
      <div>
        <RadialChart
          data={spells[book]}
          xAxis={"spell"}
          yAxis={"mentions"}
          width={window.innerWidth - 100}
          height={window.innerHeight - 100}
          sticky={true}
        />
      </div>
    </Wrapper>
  );
};

export default BookProgression;
