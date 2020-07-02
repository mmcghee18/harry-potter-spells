import React from "react";
import styled from "styled-components";
import gif1 from "../images/its_leviosa.gif";
import gif2 from "../images/performing_spell.gif";

const Wrapper = styled.div`
  margin-top: 15vh;
  margin-bottom: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
`;

const Line = styled.hr`
  stroke-width: 0.2px;
  margin: 3em 0px 1em;
  stroke: white;
  opacity: 0.5;
  width: 100%;
  margin-bottom: 5vh;
`;

const Gifs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

const Link = styled.a`
  text-decoration: underline;
  color: white;
  &:hover {
    text-decoration: underline;
    color: #1890ff;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Line />
      <div style={{ alignSelf: "flex-start", width: "100%" }}>
        <h1>Credits</h1>
        <p>
          Full list of spells from{" "}
          <strong>
            <Link
              target="_blank"
              href="https://www.pojo.com/harry-potter-spell-list/"
            >
              here
            </Link>
          </strong>
          , supplemented by{" "}
          <strong>
            <Link
              target="_blank"
              href="https://harrypotter.fandom.com/wiki/List_of_spells"
            >
              here.
            </Link>
          </strong>
        </p>
        <p>
          Harry Potter books in .txt form from{" "}
          <strong>
            <Link
              target="_blank"
              href="https://github.com/neelk07/neelkothari/tree/master/blog/static/data/text"
            >
              here.
            </Link>
          </strong>
        </p>
      </div>
      <Gifs>
        <img src={gif1} alt="Wingardium Leviosa" />
        <img src={gif2} alt="Wingardium Leviosa part 2" />
      </Gifs>
      <div>Thanks for reading! ❤️</div>
    </Wrapper>
  );
};

export default Footer;
