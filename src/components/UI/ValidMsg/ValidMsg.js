import React from "react";

import classes from "./ValidMsg.module.css";

const validMsg = props =>
  props.show ? <div className={classes.Valid}>{props.message}</div> : null;

export default validMsg;
