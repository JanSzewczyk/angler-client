import React from "react";

import NavbarItems from "./NavbarItems/NavbarItems";

import classes from "./Navbar.module.css";

const navbar = props => {
  let navbarClasses = [classes.Navbar];
  if (!props.open) {
    navbarClasses.push(classes.Hidden);
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <nav>
        <NavbarItems />
      </nav>
    </div>
  );
};

export default navbar;
