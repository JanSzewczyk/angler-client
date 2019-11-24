import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

const button = props => {
  const buttonClasses = [classes.Button];
  if (props.btnType) {
    buttonClasses.push(classes[props.btnType]);
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  btnType: PropTypes.string
};

export default button;
