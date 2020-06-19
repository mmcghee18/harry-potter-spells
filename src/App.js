import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import _ from "lodash";
import BookProgression from "./article-sections/BookProgression.jsx";
import SmallMultiples from "./article-sections/SmallMultiples.jsx";
import CustomRadialChart from "./data-viz/CustomRadialChart.jsx";

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
  flex-direction: column;
  align-items: center;
`;

function App() {
  // Scroll to the top on render *smoooooothly*
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <GlobalStyle />

      <AppWrapper>
        <BookProgression />
        <SmallMultiples />
      </AppWrapper>
    </>
  );
}

export default App;
