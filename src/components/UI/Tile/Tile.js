import React from "react";
import PropTypes from "prop-types";

import classes from "./Tile.module.css";

const tile = props => {

  return (
    <div
      className={[
        classes.Tile,
        classes[props.sm],
        classes[props.md],
        classes[props.xl]
      ].join(" ")}
    >
      <div className={classes.Top}>
        <div className={classes.Left}>{props.topLeft}</div>
        <div className={classes.Right}>{props.topRight}</div>
      </div>
      <div className={classes.Body}>
        <div className={classes.Content}>{props.children}</div>
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Left}>{props.botLeft}</div>
        <div className={classes.Right}>{props.botRight}</div>
      </div>
    </div>
  );
};

tile.propTypes = {
  sm: PropTypes.string.isRequired,
  md: PropTypes.string.isRequired,
  xl: PropTypes.string.isRequired,
  topLeft: PropTypes.element,
  topRight: PropTypes.element,
  botLeft: PropTypes.element,
  botRight: PropTypes.element
};

export default tile;
