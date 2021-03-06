import React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaUserTimes,
  FaUserPlus,
  FaUserMinus,
  FaUserClock,
  FaUserCheck
} from "react-icons/fa";

import Aux from "../../../../../hoc/Auxiliary/Auxiliary";

import classes from "./FriendsListIteam.module.css";

const FriendsListIteam = props => {
  let action = null;
  switch (props.status) {
    case 1:
      if (props.userStatus === 0) {
        action = (
          <div className={classes.ActionRemove} onClick={props.removeOnClick}>
            <FaUserMinus size={17} />
          </div>
        );
      }
      break;
    case 2:
      if (props.userStatus === 0) {
        action = (
          <Aux>
            <div className={classes.ItemDescription}>wait for approval</div>
            <div className={classes.Item}>
              <div
                className={classes.ActionRemove}
                onClick={props.declineOnClick}
              >
                <FaUserTimes size={17} />
              </div>
            </div>
          </Aux>
        );
      }
      break;
    case 3:
      if (props.userStatus === 0) {
        action = (
          <Aux>
            <div className={classes.Item}>
              <div
                className={classes.ActionEdit}
                onClick={props.acceptOnCilick}
              >
                <FaUserCheck size={17} />
              </div>
              <div
                className={classes.ActionRemove}
                onClick={props.declineOnClick}
              >
                <FaUserTimes size={17} />
              </div>
            </div>
            <div className={classes.ItemDescription}>add to friends</div>
          </Aux>
        );
      }
      break;
    case 4:
      action = (
        <div className={classes.ActionEdit} onClick={props.inviteOnClick}>
          <FaUserPlus size={17} />
        </div>
      );
      break;
    default:
  }

  return (
    <Aux>
      <li className={classes.FriendsListIteam}>
        <div className={classes.User} onClick={props.onClick}>
          {props.status === 2 && props.userStatus === 0 ? (
            <FaUserClock size={17} />
          ) : (
            <FaUser size={14} />
          )}
          {props.nick}
        </div>
        <div className={classes.Actions}>{action}</div>
      </li>
      <div className={classes.Line} />
    </Aux>
  );
};

FriendsListIteam.propTypes = {
  status: PropTypes.number.isRequired,
  userStatus: PropTypes.number.isRequired,
  nick: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  declineOnClick: PropTypes.func,
  acceptOnCilick: PropTypes.func,
  inviteOnClick: PropTypes.func,
  removeOnClick: PropTypes.func
};

export default FriendsListIteam;
