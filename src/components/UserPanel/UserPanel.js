import React from "react";

import classes from "./UserPanel.module.css";

const userBar = props => {

  let panelClasses = [classes.UserPanel];
  if (!props.show) {
    panelClasses.push(classes.Hidden)
  }

  return (
    <div className={panelClasses.join(" ")}>
      userBar
    </div>
  );
}

export default userBar;