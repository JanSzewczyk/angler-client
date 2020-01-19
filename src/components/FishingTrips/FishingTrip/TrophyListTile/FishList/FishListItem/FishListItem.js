import React from "react";
import PropTypes from "prop-types";
import { MdRemoveCircle, MdEdit } from "react-icons/md";

import Aux from "../../../../../../hoc/Auxiliary/Auxiliary";

import classes from "./FishListItem.module.css";

const FishListItem = props => {
  return (
    <Aux>
      <li className={classes.FishListItem}>
        <div className={classes.Item}>
          <div className={classes.Type}>species</div>
          <div className={classes.Value}>{props.fish.fish.name}</div>
        </div>
        <div className={classes.Item}>
          <div className={classes.Type}>weight</div>
          <div className={classes.Value}>{props.fish.weight}kg</div>
        </div>
        <div className={classes.Item}>
          <div className={classes.Type}>length</div>
          <div className={classes.Value}>{props.fish.length}cm</div>
        </div>
        <div className={classes.ActionEdit} onClick={props.onEdit}>
          <MdEdit size={25} />
        </div>
        <div className={classes.ActionRemove} onClick={props.onDelete}>
          <MdRemoveCircle size={25} />
        </div>
      </li>
      <div className={classes.Line} />
    </Aux>
  );
};

FishListItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fish: PropTypes.object.isRequired
};

export default FishListItem;
