import React from "react";
import { legendR } from "./utils.js";
import _ from "lodash";

const Legend = ({ dms, data }) => {
  const spellTypes = ["charm", "spell", "jinx", "hex", "curse", "unforgivable"];

  const totalMentions = _.sumBy(data, "mentions");
  let mentionsByType = {};

  spellTypes.forEach((spellType) => {
    const mentions = _.sumBy(data, (d) => {
      if (d.type.toLowerCase() === spellType) {
        return d.mentions;
      }
      return 0;
    });
    mentionsByType[spellType] = mentions;
  });

  return (
    <g
      transform={`translate(${[
        dms.marginLeft,
        dms.height + dms.marginTop - dms.marginBottom,
      ].join(",")})`}
    >
      {spellTypes.map((spellType, i) => {
        const margin =
          (dms.marginBottom - spellTypes.length * legendR * 2) /
          (spellTypes.length + 1);

        const circleX = dms.width * 0.5;
        const circleY =
          i === 0
            ? margin + legendR
            : (margin + 2 * legendR) * i + (margin + legendR);

        const percentage = (
          (mentionsByType[spellType] / totalMentions) *
          100
        ).toFixed();

        return (
          <>
            <text
              key={`${spellType}-percent`}
              x={circleX - (legendR + 50)}
              y={circleY}
              fill="white"
            >
              {percentage}%
            </text>
            <circle
              key={`${spellType}-circle`}
              className={spellType}
              r={legendR}
              cx={circleX}
              cy={circleY - legendR / 2}
            />
            <text
              key={`${spellType}-label`}
              x={circleX + legendR + 20}
              y={circleY}
              fill="white"
            >
              {spellType}
            </text>
          </>
        );
      })}
    </g>
  );
};

export default Legend;
