import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../axios";

import Post from "../../components/PostsTable/Post/Post";
import Loading from "../../components/FishingTrips/Loading/Loading";
import ActionPost from "./ActionPost/ActionPost";
import Aux from "../../hoc/Auxiliary/Auxiliary";

import { connect } from "react-redux";

class PostsTable extends Component {
  state = {
    addNewPostWindow: false,
    posts: [],
    editPost: null,
    loading: true
  };

  componentDidMount() {
    this.downloadPostsData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.editPost !== null && this.state.editPost === null) {
      this.downloadPostsData();
    }
  }

  downloadPostsData = () => {
    if (this.props.userStatus === 0 || !this.props.userStatus) {
      this.setState({
        addNewPostWindow: true
      });
    }

    if (!this.props.userStatus && !this.props.nick) {
      this.getAllPosts();
    } else {
      this.getUserPosts(this.props.nick);
    }
  };

  getAllPosts = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/post", config)
      .then(res => {
        this.setState({
          posts: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log("error PostsTable getAllPosts");
      });
  };

  getUserPosts = username => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/post/" + username, config)
      .then(res => {
        this.setState({
          posts: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log("error PostsTable getUserPosts");
      });
  };

  editPostHandler = id => {
    this.setState({
      editPost: id
    });
  };

  deletePostHandler = id => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .delete("/post/" + id, config)
      .then(res => {
        this.setState(
          {
            loading: false
          },
          () => this.downloadPostsData()
        );
      })
      .catch(err => {
        console.log("error PostsTable deletePostHandler");
      });
  };

  render() {
    let view = <Loading />;

    if (!this.state.loading && this.state.posts.length > 0) {
      view = (
        <Aux>
          {this.state.posts.map(post => (
            <Post
              key={post.id}
              postData={post}
              editPost={this.state.editPost === post.id}
              deletePostOnClick={() => this.deletePostHandler(post.id)}
              editPostOnClick={id => this.editPostHandler(id)}
            />
          ))}
        </Aux>
      );
    }

    if (!this.state.loading && this.state.posts.length === 0) {
      view = <Aux>no posts</Aux>;
    }

    return (
      <Aux>
        {this.state.addNewPostWindow ? (
          <ActionPost refreshData={() => this.downloadPostsData()} />
        ) : null}
        {view}
      </Aux>
    );
  }
}

PostsTable.propTypes = {
  userStatus: PropTypes.number,
  nick: PropTypes.string
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(PostsTable);
