import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled, { createGlobalStyle } from "styled-components";
import BarChart from "./BarChart.jsx";
import LineChart from "./LineChart.jsx";
import LineChartV2 from "./LineChartV2.jsx";
import _ from "lodash";

import { spells, characterLines, bookPages } from "./data/data.js";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScrollamaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepWrapper = styled.div`
  margin: 50vh 0;
  font-size: 50px;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  const [book, setBook] = useState(null);

  const onStepEnter = ({ data }) => {
    setBook(data);
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <ChartWrapper>
          <BarChart
            data={spells[book]}
            xAxis={"spell"}
            yAxis={"mentions"}
            title="Spell Use"
            stickTo="top"
          />
          <BarChart
            data={characterLines[book]}
            xAxis={"character"}
            yAxis={"lines"}
            title="Character Lines"
            stickTo="bottom"
          />
        </ChartWrapper>
        <ScrollamaWrapper>
          <Scrollama onStepEnter={onStepEnter} offset={0.5}>
            {[1, 2, 3, 4, 5, 6, 7].map((book) => (
              <Step data={book} key={book}>
                <StepWrapper>{book}</StepWrapper>
              </Step>
            ))}
          </Scrollama>
        </ScrollamaWrapper>
        <ChartWrapper>
          <LineChartV2
            data={{
              title: bookPages.title,
              coordinates: bookPages.coordinates.slice(0, book),
              //coordinates: bookPages.coordinates,
            }}
            x={"bookNum"}
            y={"pages"}
            stickTo="top"
          />
        </ChartWrapper>
      </AppWrapper>
    </>
  );
}

export default App;
