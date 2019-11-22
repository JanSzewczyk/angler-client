import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavbarItem.module.css";

const navbarItem = props => (
  <li className={classes.NavbarItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.Active}
    >
      {props.children}
    </NavLink>
    <div className={classes.Line} />
  </li>
);

export default navbarItem;
