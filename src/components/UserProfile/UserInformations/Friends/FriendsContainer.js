import React from "react";

import classes from "./FriendsContainer.module.css";

const FriendsContainer = props => {
  return (
    <ul className={classes.FriendsContainer}>
      {props.children}
    </ul>
  );
};

export default FriendsContainer;
