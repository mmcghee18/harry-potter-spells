import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import BookProgression from "./article-sections/BookProgression.jsx";
import SmallMultiples from "./article-sections/SmallMultiples.jsx";
import Header from "./article-sections/Header.jsx";
import GlobalFonts from "./fonts/fonts";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  h1 {
    font-family: "Harry Potter Title";
    font-size: 4em;
    color: white;
  }

  h2 {
    color: white;
  }

  h3 {
    color: white;
  }

  body {
    background: #302f2c;
    margin: 0;
    font-family: 'National 2 Web', 'Helvetica Neue', sans-serif;
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
      <GlobalFonts />

      <AppWrapper>
        <Header />
        <BookProgression />
        {/* <SmallMultiples /> */}
      </AppWrapper>
    </>
  );
}

export default App;
