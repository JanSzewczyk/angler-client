import React from "react";
import PropTypes from "prop-types";

import TimeLineItem from "./TimeLineItem/TimeLineItem";

import classes from "./TimeLine.module.css";

const TimeLine = props => {
    console.log(props.fishes)
  return (
    <ul className={classes.TimeLine}>
      {props.fishes.map(fish => (
        <TimeLineItem key={fish.id} fish={fish} />
      ))}
    </ul>
  );
};

TimeLine.propTypes = {
  fishes: PropTypes.array.isRequired
};

export default TimeLine;
