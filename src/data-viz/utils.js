import _ from "lodash";
import spells from "../data/spellCounts.json";
import { arc } from "d3-shape";
import { scaleSqrt } from "d3-scale";

export const legendR = 10;

const mostMentions = (data) => {
  const topMentionsPerBook = _.map(data, (bookData) =>
    _.get(
      _.maxBy(bookData, (d) => d.mentions),
      "mentions"
    )
  );
  return _.max(topMentionsPerBook);
};

export const getPath = (book, spell, maxLength) => {
  const bookData = _.orderBy(spells[book], ["mentions"], ["desc"]);
  const numBars = bookData.length;
  const i = _.findIndex(bookData, { spell });

  if (i === -1) return null;
  const scale = scaleSqrt()
    .domain([0, mostMentions(spells)])
    .range([0, maxLength / 2]);

  const pieceData = _.find(bookData, { spell });

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(pieceData.mentions));

  return arcGenerator();
};

export const getNullPath = (book, spell) => {
  const bookData = _.orderBy(spells[book], ["mentions"], ["desc"]);
  const numBars = bookData.length;
  const i = _.findIndex(bookData, { spell });

  if (i === -1) return null;

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(5);

  return arcGenerator();
};
