import React from "react";
import PropTypes from "prop-types";

import classes from "./FishingTripToolbar.module.css";

const FishingTripToolbar = props => {
  return (
    <div className={classes.Header}>
      <div className={classes.Left}>{props.left}</div>
      <div className={classes.Right}>{props.right}</div>
    </div>
  );
};

FishingTripToolbar.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element
};

export default FishingTripToolbar;
