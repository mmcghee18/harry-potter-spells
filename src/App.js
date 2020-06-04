import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled, { createGlobalStyle } from "styled-components";
import PieChart from "./PieChart.jsx";

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
`;

const ScrollamaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepWrapper = styled.div`
  margin: 50vh 0;
`;

function App() {
  // TODO: read it in from a .csv file
  const data = {
    1960: [
      { race: "Black", population: 5000 },
      { race: "White", population: 40000 },
    ],
    1970: [
      { race: "Black", population: 40000 },
      { race: "White", population: 5000 },
    ],
  };

  const [year, setYear] = useState(null);

  const onStepEnter = ({ data }) => {
    setYear(data);
  };

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <PieChart />
        <ScrollamaWrapper>
          <Scrollama>
            {[1960, 1970].map((year) => (
              <Step data={year} key={year}>
                <StepWrapper>Step {year}</StepWrapper>
              </Step>
            ))}
          </Scrollama>
        </ScrollamaWrapper>
      </AppWrapper>
    </>
  );
}

export default App;
