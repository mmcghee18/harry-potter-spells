import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import BookProgression from "./article-sections/BookProgression.jsx";
import SmallMultiples from "./article-sections/SmallMultiples.jsx";
import Header from "./article-sections/Header.jsx";
import GlobalFonts from "./fonts/fonts";
import "./App.css";
import { GlobalStyle } from "./styles.js";

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
