import React, { Component } from "react";

import Header from "../../components/Header/Header";
import UserPanel from "../../components/UserPanel/UserPanel";
import Toolbar from "../../components/Toolbar/Toolbar";
import Navbar from "../../components/Navbar/Navbar";
import Temp from "../../containers/Temp/Temp";
import Aux from "../Auxiliary/Auxiliary";

import classes from "./AppPage.module.css";

class AppPage extends Component {
  state = {
    showUserPanel: false,
    showNavbar: true
  }

  showUserPanelHandler = () => {
    this.setState({
      showUserPanel: !this.state.showUserPanel
    })
  }

  showNavbarHandler = () => {
    console.log("eloo")
    this.setState({
      showNavbar: !this.state.showNavbar
    });
  }

  render() {
    return (
      <Aux>
        <Header showUserPanel={this.showUserPanelHandler} />
        <main className={classes.Main}>
          <UserPanel show={this.state.showUserPanel} />
          <div className={classes.App}>
            <Toolbar showUserPanel={this.showNavbarHandler} />
            <div className={classes.AppBody}>
              <Navbar show={this.state.showNavbar} />
              {/* <div className={classes.AppContent}>
                {this.props.children}
              </div> */}
              <Temp />
            </div>
          </div>
        </main>
      </Aux>
    )
  }
}

export default AppPage;
