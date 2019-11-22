import React from "react";
import PropTypes from "prop-types";

import MenuToggleButton from "./MenuToggleButton/MenuToggleButton";

import classes from "./Toolbar.module.css";

const toolbar = props => (
  <div className={classes.Toolbar}>
    {/* <button onClick={props.showNavbar}>elo</button> */}
      <MenuToggleButton show={props.showNavbar} active={props.activeNavbar}/>
  </div>
);

toolbar.propTypes = {
  showNavbar: PropTypes.func.isRequired,
  activeNavbar: PropTypes.bool.isRequired
};

export default toolbar;
