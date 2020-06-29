import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
