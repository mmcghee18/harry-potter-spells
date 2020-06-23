import _ from "lodash";
import spells from "../../data/spellCounts.json";
import { arc } from "d3-shape";
import { scaleSqrt } from "d3-scale";

// export const canvasWidth = 800;
// export const canvasHeight = 800;
// export const margin = 100;

export const labelHeight = 80;
export const labelWidth = 180;
export const labelRx = 10;
export const textSize = 14;

export const mostMentions = (data) => {
  return _.get(
    _.maxBy(data, (d) => d.mentions),
    "mentions"
  );
};

export const getPath = (book, spell, maxLength) => {
  const data = _.orderBy(spells[book], ["mentions"], ["desc"]);
  const numBars = data.length;
  const i = _.findIndex(data, { spell });

  if (i === -1) return null;
  const scale = scaleSqrt()
    .domain([0, mostMentions(data)])
    .range([0, maxLength / 2]);

  const pieceData = _.find(data, { spell });

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(pieceData.mentions));

  return arcGenerator();
};

export const getNullPath = (book, spell) => {
  const data = _.orderBy(spells[book], ["mentions"], ["desc"]);
  const numBars = data.length;
  const i = _.findIndex(data, { spell });

  if (i === -1) return null;

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(5);

  return arcGenerator();
};
