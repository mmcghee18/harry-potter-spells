import React from "react";

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
        The most uttered spell is <strong>Wingardium Leviosa</strong>, which
        Harry, Ron, and Hermione learn in Charms class and later use to defeat a
        troll.
      </p>
      <p>Hover over a spell to see where it's mentioned!</p>
    </>
  ),
  2: (
    <>
      <p>
        Harry's signature spell, <strong>Expelliarmus</strong>, makes its first
        appearance in Book 2.
      </p>
    </>
  ),
  3: (
    <>
      <p>
        It's not surprising to see signature Book 3 spells like{" "}
        <strong>Expecto Patronum</strong> and <strong>Riddikulus</strong> at the
        top.
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
        used spells in this book (<strong>Sectumsempra</strong> and{" "}
        <strong>Levicorpus</strong>).
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
        <strong>Avada Kedavra</strong> is mentioned 7 times, the most since Book
        4.
      </p>
    </>
  ),
};
