import _ from "lodash";

export const canvasWidth = 600;
export const canvasHeight = 600;
export const margin = 100;

export const mostMentions = (data) => {
  return _.get(
    _.maxBy(data, (d) => d.mentions),
    "mentions"
  );
};
