import React from "react";
import PropTypes from "prop-types";
import { MdAddBox, MdAdd } from "react-icons/md";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Tile from "../../../UI/Tile/Tile";
import Buttom from "../../../UI/Buttons/Button/Button";

import classes from "./NewPostTile.module.css";

const NewPostTile = props => {
  return (
    <Tile
      sm={"SM-12"}
      md={"MD-12"}
      xl={"XL-12"}
      topLeft={
        <Aux>
          <MdAddBox size={16} />
          Create post
        </Aux>
      }
      botRight={
        (props.activeField || !props.disabledButtom) && !props.loading ? (
          <Buttom
            btnType={"Primary"}
            clicked={props.addNewPostOnClick}
            disabled={props.disabledButtom}
          >
            <MdAdd size={15} />
            add new post
          </Buttom>
        ) : null
      }
    >
      {props.children}
    </Tile>
  );
};

NewPostTile.propTypes = {
  addNewPostOnClick: PropTypes.func.isRequired,
  disabledButtom: PropTypes.bool.isRequired,
  activeField: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default NewPostTile;
