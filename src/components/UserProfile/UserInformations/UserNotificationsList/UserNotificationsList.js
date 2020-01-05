import React from "react";
import PropTypes from "prop-types";

import UserNotificationsListItem from "./UserNotificationsListItem/UserNotificationsListItem";

import classes from "./UserNotificationsList.module.css";

const UserNotificationsList = props => {
  return (
    <ul className={classes.UserNotificationsList}>
      {props.notificationsData.map(notification => (
        <UserNotificationsListItem
          key={notification.id}
          notificationData={notification}
          lookedOnClick={() => props.lookedOnClick(notification.id)}
          removeOnClick={() => props.removeOnClick(notification.id)}
        />
      ))}
    </ul>
  );
};

UserNotificationsList.propTypes = {
  notificationsData: PropTypes.array.isRequired,
  lookedOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired
};

export default UserNotificationsList;
