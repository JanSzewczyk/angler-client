import React from "react";
import PropTypes from "prop-types";
import { MdClose, MdEdit } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Tile from "../../../UI/Tile/Tile";
import Buttom from "../../../UI/Buttons/Button/Button";

import classes from "./EditPostTile.module.css";

const EditPostTile = props => {
  return (
    <Tile
      sm={"SM-12"}
      md={"MD-12"}
      xl={"XL-12"}
      topLeft={
        <Aux>
          <FaEdit size={16} />
          Edit post
        </Aux>
      }
      topRight={
        <div className={classes.Close} onClick={props.closeEditPostOnClick}>
          <MdClose size={20} />
        </div>
      }
      botRight={
        !props.loading ? (
          <Buttom
            btnType={"Primary"}
            clicked={props.updatePostOnClick}
            disabled={props.disabledButtom}
          >
            <MdEdit size={15} />
            save post
          </Buttom>
        ) : null
      }
    >
      {props.children}
    </Tile>
  );
};

EditPostTile.propTypes = {
  closeEditPostOnClick: PropTypes.func.isRequired,
  updatePostOnClick: PropTypes.func.isRequired,
  disabledButtom: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default EditPostTile;
