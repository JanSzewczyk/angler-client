import React from "react";
import PropTypes from "prop-types";
import { FaFish, FaArrowsAltH, FaWeightHanging } from "react-icons/fa";

import classes from "./TrophyTableItem.module.css";

const TrophyTableItem = props => {
  return (
    <tr className={classes.Row}>
      <td className={classes.Item}>
        <FaFish size={10} />
        {props.species}
      </td>
      <td className={classes.Item}>
        <FaArrowsAltH size={10} />
        {props.length}cm
      </td>
      <td className={classes.Item}>
        <FaWeightHanging size={10} />
        {props.weight}kg
      </td>
    </tr>
  );
};

TrophyTableItem.propTypes = {
  species: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired
};

export default TrophyTableItem;
