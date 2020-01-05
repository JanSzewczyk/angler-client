import React from "react";
import PropTypes from "prop-types";
import {
  MdNotifications,
  MdNotificationsActive,
  MdRemoveRedEye,
  MdClose
} from "react-icons/md";

import Aux from "../../../../../hoc/Auxiliary/Auxiliary";

import classes from "./UserNotificationsListItem.module.css";

const UserNotificationsListItem = props => {
  let notificationClasses = [classes.UserNotificationsListItem];
  if (!props.notificationData.looked) {
    notificationClasses.push(classes.UserNotificationsListItemUnread);
  }
  return (
    <Aux>
      <li className={notificationClasses.join(" ")}>
        <div className={classes.Icon}>
          {props.notificationData.looked ? (
            <MdNotifications size={14} />
          ) : (
            <MdNotificationsActive size={14} />
          )}
        </div>
        <div className={classes.Date}>
          <div className={classes.Value}>
            {props.notificationData.releaseTime}
          </div>
          <div className={classes.Value}>
            {props.notificationData.releaseDate}
          </div>
        </div>
        <div className={classes.Message}>{props.notificationData.message}</div>
        {!props.notificationData.looked ? (
          <div className={classes.Action} onClick={props.lookedOnClick}>
            <MdRemoveRedEye size={16} />
          </div>
        ) : null}
        <div className={classes.Action} onClick={props.removeOnClick}>
          <MdClose size={16} />
        </div>
      </li>
      <div className={classes.Line} />
    </Aux>
  );
};

UserNotificationsListItem.propTypes = {
  notificationData: PropTypes.object.isRequired,
  lookedOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired
};

export default UserNotificationsListItem;
