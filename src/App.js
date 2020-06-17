import React, { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled, { createGlobalStyle } from "styled-components";
import RadialChart from "./data-viz/RadialChart.jsx";
import spells from "./data/spell_counts.json";

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

const AppWrapper = styled.div`
  display: flex;
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
      <AppWrapper>
        <ScrollamaWrapper>
          <Scrollama onStepEnter={onStepEnter} offset={0.5}>
            {[1, 2, 3, 4, 5, 6, 7].map((book) => (
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
            title="Spell Use"
            stickTo="top"
          />
        </div>
      </AppWrapper>
    </>
  );
}

export default App;
