import React from "react";

import classes from "./Spinner.module.css";

const spinner = () => (
  <div className={classes.Loader}>
    <div className={classes.First}></div>
    <div className={classes.Second}></div>
    <div className={classes.Third}></div>
  </div>
);

export default spinner;
