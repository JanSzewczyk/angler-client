import React from "react";

import classes from "./UserProfileContainer.module.css";

const UserProfileContainer = props => {
  return <div className={classes.UserProfileContainer}>{props.children}</div>;
};

export default UserProfileContainer;