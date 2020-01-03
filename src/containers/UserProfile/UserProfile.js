import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "../../axios";

import UserInformations from "../../components/UserProfile/UserInformations/UserInformations";
import UserProfileContainer from "../../components/UserProfile/UserProfileContainer";
import Posts from "../../components/UserProfile/Posts/Posts";
import Loading from "../../components/FishingTrips/Loading/Loading";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import { connect } from "react-redux";

class UserProfile extends Component {
  state = {
    redirect: false,
    loading: true,
    userDetails: null,
    fisheries: [],
    status: null
  };

  componentDidMount() {
    if (this.props.match.params.nick) {
      this.getUserData(this.props.match.params.nick);
    } else {
      this.state({
        redirect: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.nick !== prevProps.match.params.nick) {
      this.getUserData(this.props.match.params.nick);
    }
  }

  getUserData = username => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      loading: true
    });
    axios
      .get("/user/" + username, config)
      .then(res => {
        console.log(res.data);
        const data = res.data;

        this.setState({
          loading: false,
          status: data.status,
          fisheries: data.fisheries,
          userDetails: data.user
        });
      })
      .catch(err => {
        console.log("error UserProfile component");
      });
  };

  redirectToHandler = path => {
    console.log(this.props);
    console.log(path);
    this.props.history.push(path);

  };

  render() {
    let view = <Loading />;

    if (!this.state.loading) {
      view = (
        <Aux>
          <UserInformations
            status={this.state.status}
            userDetails={this.state.userDetails}
            fisheries={this.state.fisheries}
            nick={this.props.match.params.nick}
            redirectTo={this.redirectToHandler}
          />
          <Posts />
        </Aux>
      );
    }

    if (this.state.redirect) {
      view = <Redirect to="/" />;
    }

    return <UserProfileContainer>{view}</UserProfileContainer>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(UserProfile);
