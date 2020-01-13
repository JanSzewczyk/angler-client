import React, { Component } from "react";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import axios from "../../../axios";

import Tile from "../../../components/UI/Tile/Tile";
import Button from "../../../components/UI/Buttons/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FriendsContainer from "../../../components/UserProfile/UserInformations/Friends/FriendsContainer";
import FriendsListIteam from "../../../components/UserProfile/UserInformations/Friends/FriendsListIteam/FriendsListIteam";
import Loading from "../../../components/FishingTrips/Loading/Loading";

import { connect } from "react-redux";

export class Friends extends Component {
  state = {
    addFriends: false,
    friendsList: [],
    unknownUsers: [],
    loading: true,
    actionLoading: false
  };
  componentDidMount() {
    this.getUserFriends();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.actionLoading === false &&
      prevState.actionLoading === true
    ) {
      this.state.addFriends ? this.getUnknownUsers() : this.getUserFriends();
    }
  }

  getUserFriends = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/friend/" + this.props.nick, config)
      .then(res => {
        this.setState({
          loading: false,
          friendsList: res.data
        });
      })
      .catch(err => {
        console.log("error UserProfile");
      });
  };

  getUnknownUsers = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/friend/unknown", config)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          unknownUsers: res.data
        });
      })
      .catch(err => {
        console.log("error UserProfile");
      });
  };

  changeAddFriendHandler = () => {
    this.setState(
      {
        addFriends: !this.state.addFriends
      },
      () => {
        this.state.addFriends ? this.getUnknownUsers() : this.getUserFriends();
      }
    );
  };

  declineInvitationHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .delete("/friend/decline/" + id, config)
      .then(res => {
        console.log("accept UserProfile declineInvitationHandler");
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserProfile declineInvitationHandler");
        this.setState({
          actionLoading: false
        });
      });
  };

  acceptInvitationHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .put("/friend/accept/" + id, {}, config)
      .then(res => {
        console.log("accept UserProfile acceptInvitationHandler");
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserProfile acceptInvitationHandler");
        this.setState({
          actionLoading: false
        });
      });
  };

  inviteUserHandler = nick => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .post("/friend/" + nick, {}, config)
      .then(res => {
        console.log("accept UserProfile inviteUserHandler");
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserProfile inviteUserHandler");
        this.setState({
          actionLoading: false
        });
      });
  };

  removeUserFromFriends = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    this.setState({
      actionLoading: true
    });

    axios
      .delete("/friend/" + id, config)
      .then(res => {
        console.log("accept UserProfile removeUserFromFriends");
        this.setState({
          actionLoading: false
        });
      })
      .catch(err => {
        console.log("error UserProfile removeUserFromFriends");
        this.setState({
          actionLoading: false
        });
      });
  };

  render() {
    let view = null;
    if (this.state.loadind ) {
      view = <Loading />;
    }

    if (
      !this.state.addFriends &&
      !this.state.loading 
    ) {
      view = (
        <Aux>
          {this.state.friendsList.length !== 0 ? (
            this.state.friendsList.map(friend => (
              <FriendsListIteam
                key={friend.id}
                status={friend.status}
                userStatus={this.props.userStatus}
                nick={friend.userNick}
                onClick={() =>
                  this.props.redirectTo("/profile/" + friend.userNick)
                }
                declineOnClick={() => this.declineInvitationHandler(friend.id)}
                acceptOnCilick={() => this.acceptInvitationHandler(friend.id)}
                inviteOnClick={() => this.inviteUserHandler(friend.userNick)}
                removeOnClick={() => this.removeUserFromFriends(friend.id)}
              />
            ))
          ) : (
            <Aux>friends list empty</Aux>
          )}
        </Aux>
      );
    }

    if (
      this.state.addFriends &&
      !this.state.loading &&
      !this.state.actionLoading
    ) {
      view = (
        <Aux>
          {this.state.unknownUsers.length !== 0 ? (
            this.state.unknownUsers.map(friend => (
              <FriendsListIteam
                key={friend.id}
                status={friend.status}
                userStatus={this.props.userStatus}
                nick={friend.userNick}
                onClick={() =>
                  this.props.redirectTo("/profile/" + friend.userNick)
                }
                inviteOnClick={() => this.inviteUserHandler(friend.userNick)}
              />
            ))
          ) : (
            <Aux>no users to invite</Aux>
          )}
        </Aux>
      );
    }

    let config =
      this.props.userStatus === 0
        ? {
            sm: "SM-4",
            md: "MD-4",
            xl: "XL-4"
          }
        : {
            sm: "SM-6",
            md: "MD-6",
            xl: "XL-6"
          };

    return (
      <Tile
        {...config}
        topLeft={
          this.state.addFriends ? (
            <Aux>
              <FaSearch size={16} />
              Add new friend
            </Aux>
          ) : (
            <Aux>
              <FaUserFriends size={16} />
              Friends
            </Aux>
          )
        }
        topRight={
          <Aux>
            {this.props.userStatus === 0 ? (
              <Button clicked={this.changeAddFriendHandler}>
                {this.state.addFriends ? (
                  <Aux>
                    <FaUserFriends size={15} />
                    friends
                  </Aux>
                ) : (
                  <Aux>
                    <FaSearch size={15} />
                    find user
                  </Aux>
                )}
              </Button>
            ) : null}
          </Aux>
        }
      >
        <FriendsContainer>{view}</FriendsContainer>
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

export default connect(mapStateToProps)(Friends);
