import React from "react";
import { FaHome, FaFish, FaWater, FaBook, FaNewspaper } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiAnglerFish } from "react-icons/gi";
import PropTypes from "prop-types";

import NavbarItem from "./NavbarItem/NavbarItem";

import classes from "./NavbarItems.module.css";

const NavbarItems = props => (
  <ul className={classes.NavbarItems}>
    <NavbarItem link="/" exact>
      <FaHome size={20} />
      Home
    </NavbarItem>
    <NavbarItem link="/news">
      <FaNewspaper size={20} />
      News
    </NavbarItem>
    <NavbarItem link={"/profile/" + props.userName}>
      <GiAnglerFish size={20} />
      My Profile
    </NavbarItem>
    <NavbarItem link="/trips">
      <FaFish size={20} />
      Fishing Trips
    </NavbarItem>
    <NavbarItem link="/atlas">
      <FaBook size={20} />
      Fish Atlas
    </NavbarItem>
    <NavbarItem link="/fisheries">
      <FaWater size={20} />
      Fisheries in Poland
    </NavbarItem>
    <NavbarItem link="/logout" exact>
      <FiLogOut size={20} />
      Logout
    </NavbarItem>
  </ul>
);

NavbarItems.propTypes = {
  userName: PropTypes.string
};

export default NavbarItems;
