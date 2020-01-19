import React from "react";
import PropTypes from "prop-types";
import { FaMap } from "react-icons/fa";

import Tile from "../../../UI/Tile/Tile";

import classes from "./FisheryDetailsTile.module.css";

const FisheryDetailsTile = props => {
  return (
    <Tile
      sm={"SM-4"}
      md={"MD-3"}
      xl={"XL-3"}
      topLeft={
        <>
          <FaMap size={16} />
          Spot details
        </>
      }
    >
      <div className={classes.FisheryDetailsTile}>
        <div className={classes.Title}>Spot name</div>
        <div className={classes.Data}>{props.name}</div>
        <div className={classes.Title}>Description</div>
        <div className={classes.Data}>{props.description}</div>
      </div>
    </Tile>
  );
};

FisheryDetailsTile.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FisheryDetailsTile;
