import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import HomePage from "./hoc/HomePage/HomePage";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import Recover from "./containers/Recover/Recover";
import NotFound from "./components/NotFound/NotFound";
import AppPage from "./hoc/AppPage/AppPage";
import Logout from "./containers/Signin/Logout/Logout";
import Confirmation from "./containers/Signup/Confirmation/Confirmation";
import ChangePassword from "./containers/Recover/ChangePassword/ChangePassword";
import Home from "./containers/Home/Home";
import FishingTrips from "./containers/FishingTrips/FishingTrips";
import FishingTrip from "./containers/FishingTrips/FishingTrip/FishingTrip";
import ActionFishingTrip from "./containers/FishingTrips/ActionFishingTrip/ActionFishingTrip";
import Fisheries from "./containers/Fisheries/Fisheries";
import Atlas from "./containers/Atlas/Atlas";
import UserProfile from "./containers/UserProfile/UserProfile";
import News from "./components/News/News";
import PostsTable from "./containers/PostsTable/PostsTable";
import Aux from "./hoc/Auxiliary/Auxiliary";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Aux>
        {this.props.isAuthenticated ? (
          <AppPage>
            <Switch>
              <Route path={"/trips/addTrip"} component={ActionFishingTrip} />
              <Route path={"/trips/edit/:id"} component={ActionFishingTrip} />
              <Route path={"/trips/:id"} exact component={FishingTrip} />
              <Route path={"/fisheries"} exact component={Fisheries} />
              <Route path={"/profile/:nick"} component={UserProfile} />
              <Route path="/trips" component={FishingTrips} />
              <Route path="/news">
                <News>
                  <PostsTable />
                </News>
              </Route>
              <Route path="/atlas" component={Atlas} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={Home} />
            </Switch>
          </AppPage>
        ) : (
          <HomePage>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/recover" component={Recover} />
              <Route path="/changePassword" component={ChangePassword} />
              <Route path="/confirm" component={Confirmation} />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
