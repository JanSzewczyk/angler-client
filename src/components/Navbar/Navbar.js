import React from "react";
import PropTypes from "prop-types";

import NavbarItems from "./NavbarItems/NavbarItems";

import classes from "./Navbar.module.css";

const Navbar = props => {
  let navbarClasses = [classes.Navbar];
  if (!props.open) {
    navbarClasses.push(classes.Hidden);
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <nav>
        <NavbarItems userName={props.userName}/>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  open: PropTypes.bool.isRequired,
  userName: PropTypes.string
};

export default Navbar;
