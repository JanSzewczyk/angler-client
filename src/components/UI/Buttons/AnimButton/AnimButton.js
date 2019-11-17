import React from "react";

import classes from "./AnimButton.module.css";

const button = props => (
  <button
    className={[classes[props.btnStyle], classes[props.btnType]].join(" ")}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;