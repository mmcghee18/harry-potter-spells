import React from "react";
import _ from "lodash";
import LegendRow from "./LegendRow.jsx";

const Legend = ({ dms, data }) => {
  const totalMentions = _.sumBy(data, "mentions");
  let mentionsByType = {};

  const spellTypes = ["charm", "spell", "jinx", "hex", "curse", "unforgivable"];
  spellTypes.forEach((spellType) => {
    const mentions = _.sumBy(data, (d) => {
      if (d.type.toLowerCase() === spellType) {
        return d.mentions;
      }
      return 0;
    });
    mentionsByType[spellType] = mentions;
  });

  const rankedSpellTypes = _.orderBy(
    spellTypes,
    (type) => mentionsByType[type],
    ["desc"]
  );

  return (
    <g
      transform={`translate(${[
        dms.marginLeft,
        dms.height + dms.marginTop - dms.marginBottom,
      ].join(",")})`}
    >
      {rankedSpellTypes.map((spellType, i) => (
        <LegendRow
          key={spellType}
          dms={dms}
          i={i}
          spellType={spellType}
          spellTypes={spellTypes}
          percentage={parseInt(
            ((mentionsByType[spellType] / totalMentions) * 100).toFixed()
          )}
        />
      ))}
    </g>
  );
};

export default Legend;
