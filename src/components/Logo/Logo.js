import React from "react";

import Bg_Logo from "../../assets/logo/bg_logo.png";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo}>
    <img src={Bg_Logo} alt="Logo" />
  </div>
);

export default logo;
