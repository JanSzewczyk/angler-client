import React from "react";
import PropTypes from "prop-types";

import FishListItem from "./FishListItem/FishListItem";

import classes from "./FishListItems.module.css";

const FishListItems = props => {
  return (
    <ul className={classes.FishListItems}>
      {props.fishes.map(fish => (
        <FishListItem
          key={fish.id}
          fish={fish}
          clicked={() => props.clicked(fish)}
        />
      ))}
    </ul>
  );
};

FishListItems.propTypes = {
  clicked: PropTypes.func.isRequired,
  fishes: PropTypes.array.isRequired
};

export default FishListItems;
