import React from "react";
import PropTypes from "prop-types";

import TrophyTableItem from "./TrophyTableItem/TrophyTableItem";

import classes from "./TrophyTable.module.css";

const TrophyTable = props => {
  return props.trophies.length > 0 ? (
    <table className={classes.TrophyTable}>
      <tbody>
        {props.trophies.map(trophy => (
          <TrophyTableItem
            key={trophy.id}
            species={trophy.fish.name}
            length={trophy.length}
            weight={trophy.weight}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <div className={classes.Empty}>no trophies</div>
  );
};

TrophyTable.propTypes = {
  trophies: PropTypes.array.isRequired
};

export default TrophyTable;
