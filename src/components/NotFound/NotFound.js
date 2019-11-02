import React from "react";

import classes from "./NotFound.module.css";

const notFound = () => (
  <div className={classes.NotFound}>
    <h1>404</h1>
    <h2>PAGE NOT FOUND</h2>
    <p>Sorry :(</p>
    <a href="/">go to homepage</a>
  </div>
);

export default notFound;
