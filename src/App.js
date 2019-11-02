import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./hoc/HomePage/HomePage";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import Recover from "./containers/Recover/Recover";
import NotFound from "./components/NotFound/NotFound";
import AppPage from "./hoc/AppPage/AppPage";
import Aux from "./hoc/Auxiliary/Auxiliary";

class App extends Component {
  state = {
    loggin: false
  };

  render() {
    return (
      <Aux>
        {!this.state.loggin ? (
          <HomePage>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/recover" component={Recover} />
              <Route path="/" exact component={Signin} />
              <Route component={NotFound} />
            </Switch>
          </HomePage>
        ) : (
          <AppPage></AppPage>
        )}
      </Aux>
    );
  }
}

export default App;
