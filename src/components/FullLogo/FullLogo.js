import React from "react";

import FullLogo from "../../assets/logo/full_logo.png";
import classes from "./FullLogo.module.css";

const fullLogo = props => (
  <div className={classes.FullLogo}>
    {/* <img src={burgerLogo} alt="MyBurger" /> */}
    <img src={FullLogo} alt="AnglerLogo" />
  </div>
);

export default fullLogo;
