import React, { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled, { createGlobalStyle } from "styled-components";
import RadialChart from "./data-viz/RadialChart.jsx";
import spells from "./data/spellCounts.json";
import bookTitles from "./data/bookTitles.js";
import _ from "lodash";

const GlobalStyle = createGlobalStyle`
  body {
    background: #302f2c;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const BookProgression = styled.div`
  display: flex;
  justify-content: center;
`;

const Multiples = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const MultipleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h3`
  text-align: center;
`;

function App() {
  const [book, setBook] = useState(null);

  // Scroll to the top on render *smoooooothly*
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onStepEnter = ({ data }) => {
    setBook(data);
  };

  return (
    <>
      <GlobalStyle />
      <BookProgression>
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
      </BookProgression>

      <Multiples>
        {_.range(1, 8).map((book) => (
          <MultipleWrapper>
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
      </Multiples>
    </>
  );
}

export default App;
