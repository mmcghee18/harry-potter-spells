const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const spells = {
  1: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  2: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  3: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  4: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  5: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  6: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
  7: [
    { spell: "Avada Kedavra", mentions: getRandomInt(100) },
    { spell: "Expeliarmus", mentions: getRandomInt(100) },
    { spell: "Levicorpus", mentions: getRandomInt(100) },
    { spell: "Reducto", mentions: getRandomInt(100) },
    { spell: "Lumos", mentions: getRandomInt(100) },
  ],
};

const characterLines = {
  1: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  2: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  3: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  4: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  5: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  6: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
  7: [
    { character: "Harry Potter", lines: getRandomInt(10000) },
    { character: "Ron", lines: getRandomInt(10000) },
    { character: "Hermione", lines: getRandomInt(10000) },
  ],
};

const bookPages = {
  title: "Page Counts",
  coordinates: [
    { key: 0, bookNum: 1, pages: 309 },
    { key: 1, bookNum: 2, pages: 341 },
    { key: 2, bookNum: 3, pages: 435 },
    { key: 3, bookNum: 4, pages: 734 },
    { key: 4, bookNum: 5, pages: 870 },
    { key: 5, bookNum: 6, pages: 652 },
    { key: 6, bookNum: 7, pages: 759 },
  ],
};

const topWords = {
  1: ["dursley", "wand", "spell", "wizard", "butterbeer"],
  2: ["bludger", "memory", "pensieve", "quill", "elf"],
  3: ["hippogriff", "azkaban", "escape", "dog", "map"],
  4: ["goblet", "tournament", "voldemort", "maze", "riddle"],
  5: ["oclumency", "castle", "owl", "friends", "lake"],
  6: ["squid", "quidditch", "snogging", "lessons", "liberation"],
  7: ["love", "family", "battle", "died", "green"],
};

export { spells, characterLines, bookPages, topWords };
