import React from "react";

import classes from "./Posts.module.css";

const Posts = props => {
  return <div className={classes.Posts}>
    {props.children}
  </div>;
};

export default Posts;
