import _ from "lodash";
import spells from "../../data/spellCounts.json";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";

export const canvasWidth = 600;
export const canvasHeight = 600;
export const margin = 100;

export const mostMentions = (data) => {
  return _.get(
    _.maxBy(data, (d) => d.mentions),
    "mentions"
  );
};

export const getPath = (book, spell) => {
  const data = spells[book];
  const numBars = data.length;
  const i = _.findIndex(data, { spell });

  if (i == -1) return null;
  const scale = scaleLinear()
    .domain([0, mostMentions(data)])
    .range([0, canvasWidth / 2]);

  const pieceData = _.find(data, { spell });

  const arcGenerator = arc()
    .startAngle(((Math.PI * 2) / numBars) * i)
    .endAngle(((Math.PI * 2) / numBars) * (i + 1))
    .innerRadius(0)
    .outerRadius(scale(pieceData.mentions));

  return arcGenerator();
};
