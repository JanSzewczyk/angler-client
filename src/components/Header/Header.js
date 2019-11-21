import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

import Logo from "../Logo/Logo";

import classes from "./Header.module.css";

const header = props => {
  return (
    <header className={classes.Header}>
      <Link to={"/"} className={classes.LogoContainer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <span className={classes.Title}>Angler</span>
      </Link>
      <div className={classes.UserContainer} onClick={props.showUserPanel}>
        <FaUserAlt size={25} />
        <div className={classes.User}>
          <span>{props.userName}</span>
        </div>
      </div>
    </header>
  );
};

export default header;
