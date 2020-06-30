import { createGlobalStyle } from "styled-components";
import HarryPotterTitleFont from "./HarryP-Title.ttf";
import Publico from "./publico/PublicoText-Roman-Web.woff2";
import NationalWebWoff from "./national/National2Web-Regular.woff";
import NationalWebWoff2 from "./national/National2Web-Regular.woff2";
import NationalWebBoldWoff from "./national/National2Web-Bold.woff";
import NationalWebBoldWoff2 from "./national/National2Web-Bold.woff2";

export default createGlobalStyle`
  @font-face {
    font-family: 'Harry Potter Title';
    src: url(${HarryPotterTitleFont});
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Publico';
    src: url(${Publico});
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'National 2 Web';
    src: url(${NationalWebWoff}) format('woff'), url(${NationalWebWoff2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'National 2 Web Bold';
    src: url(${NationalWebBoldWoff}) format('woff'), url(${NationalWebBoldWoff2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;
