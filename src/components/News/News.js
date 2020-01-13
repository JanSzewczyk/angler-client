import React from "react";

import classes from "./News.module.css";

const News = props => {
  return <div className={classes.News}>
      <div className={classes.Posts}>
          {props.children}
      </div>
  </div>;
};

export default News;
