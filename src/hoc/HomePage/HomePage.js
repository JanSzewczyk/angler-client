import React from "react";

import Aux from "../Auxiliary/Auxiliary";
import FullLogo from "../../components/FullLogo/FullLogo";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";

import classes from "./HomePage.module.css";

const homePage = props => (
  <Aux>
    <main className={classes.Layout}>
      <div className={classes.Left}>
        <FullLogo />
        <nav>
          <NavigationItems />
        </nav>
        <div className={classes.Content}>{props.children}</div>
      </div>
      <div className={classes.Right}>
        <div className={classes.Showcase}>
          <div>
            <h1 className={classes.ShowcaseText}>
              Let's create the future <strong>together</strong>
            </h1>
          </div>
        </div>
      </div>
    </main>
  </Aux>
);

export default homePage;
