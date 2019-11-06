import React from 'react';

import classes from "./Header.module.css";

const header = props => {

  return (
    <header className={classes.Header}>
      <div className={classes.HeaderContainer}>
        <div className={classes.Logo}>
          {/* <i className="icon icon-econ"></i> */}
          <span className={classes.Title}>Angler</span>
        </div>
      </div>
      <div className={classes.HeaderContainer}>
        <div className={classes.User} onClick={props.showUserPanel}>
          {/* <i className="icon icon-profile"></i> */}
          <span>USERNAME</span>
        </div>
      </div>
    </header>
  )
}

export default header;
