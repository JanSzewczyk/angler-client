import React, { Component } from "react";
import { MdNotifications } from "react-icons/md";
import axios from "../../../axios";

import Tile from "../../../components/UI/Tile/Tile";
import UserNotificationsList from "../../../components/UserProfile/UserInformations/UserNotificationsList/UserNotificationsList";
import Loading from "../../../components/FishingTrips/Loading/Loading";

import { connect } from "react-redux";

export class UserNotifications extends Component {
  state = {
    notifications: [],
    loading: true,
    actionLoading: false
  };

  componentDidMount() {
    this.getUserNotifications();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.actionLoading === false &&
      prevState.actionLoading === true
    ) {
      this.getUserNotifications();
    }
  }

  getUserNotifications = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/notification", config)
      .then(res => {
        this.setState({
          loading: false,
          notifications: res.data
        });
      })
      .catch(err => {
        console.log("error UserNotifications getUserNotifications");
      });
  };

  lookedNotificationHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .put("/notification/" + id, {}, config)
      .then(res => {
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserNotifications lookedNotificationHandler");
        this.setState({
          actionLoading: false
        });
      });
  };

  removeNotificationHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .delete("/notification/" + id, config)
      .then(res => {
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserNotifications removeNotificationHandler");
        this.setState({
          actionLoading: false
        });
      });
  };

  render() {
    let view = <Loading />;
    if (!this.state.loading) {
      view = (
        <UserNotificationsList
          notificationsData={this.state.notifications}
          lookedOnClick={this.lookedNotificationHandler}
          removeOnClick={this.removeNotificationHandler}
        />
      );
    }

    return (
      <Tile
        sm={"SM-6"}
        md={"MD-6"}
        xl={"XL-6"}
        topLeft={
          <>
            <MdNotifications size={16} />
            Notifications
          </>
        }
      >
        {view}
      </Tile>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(UserNotifications);
