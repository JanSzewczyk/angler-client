import React from "react";

import classes from "./Toolbar.module.css";

const toolbar = props => (
  <div className={classes.Toolbar}>
    <button onClick={props.showUserPanel}>elo</button>
  </div>
);

export default toolbar;