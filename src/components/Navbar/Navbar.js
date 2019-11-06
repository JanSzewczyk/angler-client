import React from "react";

import classes from "./Navbar.module.css";

const navbar = props => {
  let navbarClasses = [classes.Navbar];
  if (!props.show) {
    navbarClasses.push(classes.Hidden)
  }

  return (
    <div className={navbarClasses.join(" ")}>
      elo
    </div>
  )
};

export default navbar;