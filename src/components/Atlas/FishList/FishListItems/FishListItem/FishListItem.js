import React from "react";
import PropTypes from "prop-types";
import { FaFish } from "react-icons/fa";

import Aux from "../../../../../hoc/Auxiliary/Auxiliary";

import classes from "./FishListItem.module.css";

const FishListItem = props => {
  return (
    <Aux>
      <li className={classes.FishListItem} onClick={props.clicked}>
        <div className={classes.Fish}>
          <FaFish size={16} />
          {props.fish.name}
        </div>
        <div className={classes.Item}>click to see the details</div>
      </li>
      <div className={classes.Line} />
    </Aux>
  );
};

FishListItem.propTypes = {
  clicked: PropTypes.func.isRequired,
  fish: PropTypes.object.isRequired
};

export default FishListItem;
