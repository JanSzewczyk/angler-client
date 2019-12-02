import React from "react";
import PropTypes from "prop-types";

import FishListItem from "./FishListItem/FishListItem";

import classes from "./FishList.module.css";

const FishList = props => {
  return (
    <ul className={classes.FishList}>
      {props.fishes.map(fish => (
        <FishListItem
          key={fish.id}
          fish={fish}
          onEdit={() => props.onEdit(fish.id)}
          onDelete={() => props.onDelete(fish.id)}
        />
      ))}
    </ul>
  );
};

FishList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fishes: PropTypes.array.isRequired
};

export default FishList;
