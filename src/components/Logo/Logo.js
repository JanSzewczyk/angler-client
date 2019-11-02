import React from "react";

//import burgerLogo from '../../assets/images/burger-logo.png';
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo}>
    {/* <img src={burgerLogo} alt="MyBurger" /> */}
    <img src="https://image.ibb.co/hW1YHq/login-logo.png" alt="Sluralpright" />
  </div>
);

export default logo;
