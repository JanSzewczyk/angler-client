import React from "react";
import PropTypes from "prop-types";


import classes from "./Posts.module.css";

const Posts = props => {
  return <div className={classes.Posts}>
    {props.children}
  </div>;
};

export default Posts;
