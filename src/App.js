import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./hoc/HomePage/HomePage";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import Recover from "./containers/Recover/Recover";
import NotFound from "./components/NotFound/NotFound";
import AppPage from "./hoc/AppPage/AppPage";
import Aux from "./hoc/Auxiliary/Auxiliary";

import * as actions from "./store/actions/index";

class App extends Component {
  state = {
    loggin: false
  };

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Aux>
        {this.props.isAuthenticated ? (
          <AppPage></AppPage>
        ) : (
            <HomePage>
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/recover" component={Recover} />
                <Route path="/" exact component={Signin} />
                <Route component={NotFound} />
              </Switch>
            </HomePage>
          )}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
