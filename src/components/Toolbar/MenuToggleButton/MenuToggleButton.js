import React from "react";

import classes from "./MenuToggleButton.module.css";

const MenuToggleButton = props => {
  let classIcon = [classes.Icon];

  if (props.active) {
    classIcon.push(classes.Active);
  }
  return (
    <div className={classes.MenuToggleButton} onClick={props.show}>
      <div className={classIcon.join(" ")}>
        <div className={classes.Hamburger} />
      </div>
        Menu
    </div>
  );
};

export default MenuToggleButton;
