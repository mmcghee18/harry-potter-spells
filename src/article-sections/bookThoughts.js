import React from "react";
import { spellColors } from "../styles.js";
import styled from "styled-components";

const HighlightedSpell = styled.strong`
  background: ${(props) => spellColors[props.spellType]};
  color: ${(props) => (props.spellType === "charm" ? "black" : "white")};
`;

export const highlightedSections = {
  1: ["Wingardium Leviosa"],
  2: ["Expelliarmus"],
  3: ["Expecto Patronum", "Riddikulus"],
  4: ["Avada Kedavra", "Crucio", "Imperio"],
  5: [
    "Expelliarmus",
    "Stupefy",
    "Impedimenta",
    "Petrificus Totalus",
    "Reducto",
  ],
  6: ["Sectumsempra", "Levicorpus"],
  7: ["Avada Kedavra"],
};

export const writtenThoughts = {
  1: (
    <>
      <p>Turns out there's not actually that much magic in Book 1.</p>
      <p>
        The most uttered spell is{" "}
        <HighlightedSpell spellType="charm">
          Wingardium Leviosa
        </HighlightedSpell>
        , which Harry, Ron, and Hermione learn in Charms class and later use to
        defeat a troll.
      </p>
      <p>Hover over a spell to see where it's mentioned!</p>
    </>
  ),
  2: (
    <>
      <p>
        Harry's signature spell,{" "}
        <HighlightedSpell spellType="charm">Expelliarmus</HighlightedSpell>,
        makes its first appearance in Book 2.
      </p>
    </>
  ),
  3: (
    <>
      <p>
        It's not surprising to see signature Book 3 spells like{" "}
        <HighlightedSpell spellType="charm">Expecto Patronum</HighlightedSpell>{" "}
        and <HighlightedSpell spellType="spell">Riddikulus</HighlightedSpell> at
        the top.
      </p>
      <p>
        This is also the only book that is absent of "dark" magical spells
        (jinxes, hexes, or curses).
      </p>
    </>
  ),
  4: (
    <>
      <p>
        Book 4 is noticably darker than the first 3 books, with 27% dark spells
        (jinxes, hexes, or curses).
      </p>
      <p>
        This book also has the first spottings of the 3 unforgivable curses,
        which we learn about in class with "Professor Moody."
      </p>
    </>
  ),
  5: (
    <>
      <p>
        Book 5 features the first all-out battle of the series (The Battle of
        the Department of Mysteries, the first major conflict of the Second
        Wizarding War 🤓).
      </p>
      <p>
        Dumbledore's Army has been studying up on their dueling spells, and it
        shows.
      </p>
    </>
  ),
  6: (
    <>
      <p>
        The titular character (The Half-Blood Prince) created two of the most
        used spells in this book (
        <HighlightedSpell spellType="curse">Sectumsempra</HighlightedSpell> and{" "}
        <HighlightedSpell spellType="jinx">Levicorpus</HighlightedSpell>).
      </p>
      <p>
        Of the spells mentioned in this book, 30% are considered dark magic, the
        highest percentage of any book in the series.
      </p>
    </>
  ),
  7: (
    <>
      <p>The final book has the most spell mentions of all the books (190!).</p>
      <p>
        <HighlightedSpell spellType="unforgivable">
          Avada Kedavra
        </HighlightedSpell>{" "}
        is mentioned 7 times, the most since Book 4.
      </p>
    </>
  ),
};
