import React from "react";
import PropTypes from "prop-types";

import classes from "./PostTextField.module.css";

const PostTextField = props => {
  const inputClasses = [classes.TextField];

  if (props.active) {
    inputClasses.push(classes.Active);
  }

  return (
    <div className={classes.PostTextField}>
      <textarea
        className={inputClasses.join(" ")}
        onBlur={() => props.onActiveField(false)}
        onFocus={() => props.onActiveField(true)}
        value={props.value}
        onChange={props.changed}
        {...props.config}
      />
    </div>
  );
};

PostTextField.propTypes = {
  onActiveField: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired
};

export default PostTextField;
