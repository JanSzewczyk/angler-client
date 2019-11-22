import React from "react";
import { FaHome, FaFish } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import NavbarItem from "./NavbarItem/NavbarItem";

import classes from "./NavbarItems.module.css";

const navbarItems = props => (
  <ul className={classes.NavbarItems}>
    <NavbarItem link="/" exact>
      <FaHome size={20} />
      Home
    </NavbarItem>
    <NavbarItem link="/trips" exact>
      <FaFish size={20} />
        Fishing Trips
    </NavbarItem>
    <NavbarItem link="/logout" exact> 
      <FiLogOut size={20} />
        Logout
    </NavbarItem>
  </ul>
);

export default navbarItems;
