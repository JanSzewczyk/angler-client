import React from "react";
import PropTypes from "prop-types";

import classes from "./TimeLineItem.module.css";

const TimeLineItem = props => {
  return (
    <li className={classes.TimeLineItem}>
      <div className={classes.Hour}>
        {props.fish.time}
      </div>
      <div className={classes.Info}>
        {props.fish.fish.name}
      </div>
    </li>
  );
};

TimeLineItem.propTypes = {
    fish: PropTypes.object.isRequired
};

export default TimeLineItem;
