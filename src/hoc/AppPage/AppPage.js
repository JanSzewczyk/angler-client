import React, { Component } from "react";

import Loading from "../../components/Loading/Loading"
import Header from "../../components/Header/Header";
import UserPanel from "../../components/UserPanel/UserPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import Navbar from "../../components/Navbar/Navbar";
import Aux from "../Auxiliary/Auxiliary";

import classes from "./AppPage.module.css";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class AppPage extends Component {
  state = {
    showUserPanel: false,
    showNavbar: false
  };

  componentDidMount() {
    this.props.onGetUserInformation(this.props.tokenType, this.props.token);
  }

  showUserPanelHandler = () => {
    this.setState({
      showUserPanel: !this.state.showUserPanel
    });
  };

  showNavbarHandler = () => {
    this.setState({
      showNavbar: !this.state.showNavbar
    });
  };

  render() {
    return (
      <Aux>
        <Loading loading={this.props.loading} access={false}/>
        <Header
          showUserPanel={this.showUserPanelHandler}
          userName={
            this.props.userInformation.firstName +
            " " +
            this.props.userInformation.lastName
          }
        />
        <main className={classes.Main}>
          <UserPanel
            show={this.state.showUserPanel}
            showUserPanel={this.showUserPanelHandler}
            userInfo={this.props.userInformation}
          />
          <div className={classes.App}>
            <Toolbar showNavbar={this.showNavbarHandler} activeNavbar={this.state.showNavbar}/>
            <div className={classes.AppBody}>
              <Navbar open={this.state.showNavbar} />
              <div className={classes.AppContent}>
                {this.props.children}
              </div>
            </div>
          </div>
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType,
    userInformation: state.user.userInformation,
    loading: state.user.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserInformation: (type, token) =>
      dispatch(actions.getUserInformation(type, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
