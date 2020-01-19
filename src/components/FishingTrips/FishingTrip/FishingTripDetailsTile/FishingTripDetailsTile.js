import React from "react";
import PropTypes from "prop-types";
import { IoMdText } from "react-icons/io";

import Tile from "../../../UI/Tile/Tile";

import classes from "./FishingTripDetailsTile.module.css";

const FishingTripDetailsTile = props => {
  return (
    <Tile
      sm={"SM-4"}
      md={"MD-3"}
      xl={"XL-3"}
      topLeft={
        <>
          <IoMdText size={16} />
          Your trip
        </>
      }
    >
      <div className={classes.Info}>
        <div className={classes.Title}>Tite</div>
        <div className={classes.Data}>{props.title}</div>
        <div className={classes.Title}>Date</div>
        <div className={classes.Data}>{props.tripDate}</div>
        <div className={classes.Title}>Description</div>
        <div className={classes.Data}>{props.description}</div>
      </div>
    </Tile>
  );
};

FishingTripDetailsTile.propTypes = {
  title: PropTypes.string.isRequired,
  tripDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FishingTripDetailsTile;
