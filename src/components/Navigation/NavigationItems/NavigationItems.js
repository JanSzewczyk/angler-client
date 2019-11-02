import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      SIGN IN
    </NavigationItem>
    <NavigationItem link="/signup">SIGN UP</NavigationItem>
  </ul>
);

export default navigationItems;
