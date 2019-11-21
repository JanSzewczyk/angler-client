import React from "react";

import NotFound from "../../assets/icons/notFound.png";

import classes from "./NotFound.module.css";

const notFound = () => (
  <div className={classes.NotFound}>
    <img src={NotFound} alt="PageNotFound" />
    <h1>PAGE NOT FOUND</h1>
  </div>
);

export default notFound;
