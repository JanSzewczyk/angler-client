import React from "react";
import PropTypes from "prop-types";

import Aux from "../../hoc/Auxiliary/Auxiliary";

import classes from "./Feedback.module.css";
import Defeat from "../../assets/icons/defeat.png";
import Success from "../../assets/icons/success.png";

const feedback = props => {
  let image = Defeat;
  if (props.success) {
    image = Success ;
  }

  return (
    <Aux>
      <h1>{props.title}</h1>
      <div className={classes.Icon}>
        <img src={image} alt={"confirm"} />
      </div>
      <div className={classes.Content}>{props.children}</div>
    </Aux>
  );
};

feedback.propTypes = {
  title: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
};

export default feedback;
