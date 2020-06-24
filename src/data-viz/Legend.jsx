import React from "react";
import _ from "lodash";
import { animated, useSpring } from "react-spring";
import LegendRow from "./LegendRow.jsx";

const Legend = ({ dms, data }) => {
  const totalMentions = _.sumBy(data, "mentions");
  const numberAnimation = useSpring({
    total: totalMentions,
  });

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
      <text x={dms.width * 0.5 - 60} y={-20} fill="white">
        Total spell mentions =
      </text>
      <animated.text x={dms.width * 0.5 + 107} y={-20} fill="white">
        {numberAnimation.total.interpolate((val) => Math.floor(val))}
      </animated.text>
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
