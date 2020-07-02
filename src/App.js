import React, { useEffect } from "react";
import styled from "styled-components";
import BookProgression from "./article-sections/BookProgression.jsx";
import SmallMultiples from "./article-sections/SmallMultiples.jsx";
import Header from "./article-sections/Header.jsx";
import Footer from "./article-sections/Footer.jsx";
import spells from "./data/spellCounts.json";
import spellMentions from "./data/spellMentions.json";
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
        <BookProgression spells={spells} spellMentions={spellMentions} />
        <SmallMultiples spells={spells} />
        <Footer />
      </AppWrapper>
    </>
  );
}

export default App;
