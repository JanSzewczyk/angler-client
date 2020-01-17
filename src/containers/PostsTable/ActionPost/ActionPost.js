import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios";

import PostTextField from "../../../components/PostsTable/PostTextField/PostTextField";
import Loading from "../../../components/FishingTrips/Loading/Loading";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import FisheryPost from "../../../components/PostsTable/Post/FisheryPost/FisheryPost";
import FishingTripPost from "../../../components/PostsTable/Post/FishingTripPost/FishingTripPost";
import EditPostTile from "../../../components/PostsTable/ActionPost/EditPostTile/EditPostTile";
import NewPostTile from "../../../components/PostsTable/ActionPost/NewPostTile/NewPostTile";

import { connect } from "react-redux";

class ActionPost extends Component {
  state = {
    postForm: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "What's the news?"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        notEqual: ""
      },
      valid: false
    },
    postData: null,
    activeField: false,
    loading: false
  };

  componentDidMount() {
    if (this.props.edit && this.props.updatePostData) {
      console.log(this.props.updatePostData);
      this.setState(
        {
          postData: this.props.updatePostData
        },
        () => this.fillData(this.props.updatePostData.description)
      );
    }
  }

  fillData = value => {
    this.setState({
      postForm: {
        ...this.state.postForm,
        value: value,
        validation: {
          ...this.state.postForm.validation,
          notEqual: value
        },
        valid: false
      },
      loading: false
    });
  };

  createNewPostHandler = () => {
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    const data = {
      description: this.state.postForm.value
    };

    this.setState({
      loading: true
    });

    axios
      .post("/post", data, config)
      .then(res => {
        this.fillData("", "");
        this.props.refreshData();
      })
      .catch(err => {
        console.log("error ActionPost createNewPost");
      });
  };

  updatePostHandler = () => {
    console.log("update post");
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    let data = this.state.postData;
    data = {
      ...data,
      description: this.state.postForm.value
    };

    this.setState({
      loading: true
    });

    axios
      .put("/post", data, config)
      .then(res => {
        this.props.closeEditPostOnClick();
      })
      .catch(err => {
        console.log("error ActionPost createNewPost");
        this.setState({
          loading: false
        });
      });
  };

  onActiveFieldHandler = action => {
    this.setState({
      activeField: action
    });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.notEqual) {
      isValid = value !== rules.notEqual && isValid;
    }

    return isValid;
  }

  inputChangedHandler = event => {
    const updatedForm = {
      ...this.state.postForm
    };
    updatedForm.value = event.target.value;
    updatedForm.valid = this.checkValidity(
      updatedForm.value,
      updatedForm.validation
    );
    updatedForm.touched = true;
    this.setState({
      postForm: updatedForm
    });
  };

  render() {
    let textarea = (
      <PostTextField
        onActiveField={action => this.onActiveFieldHandler(action)}
        changed={event => this.inputChangedHandler(event)}
        active={this.state.activeField}
        config={this.state.postForm.elementConfig}
        value={this.state.postForm.value}
      />
    );

    if (this.props.edit && this.state.postData) {
      textarea = (
        <Aux>
          <PostTextField
            onActiveField={action => this.onActiveFieldHandler(action)}
            changed={event => this.inputChangedHandler(event)}
            active={this.state.activeField}
            config={this.state.postForm.elementConfig}
            value={this.state.postForm.value}
          />
          {this.state.postData.fishery ? (
            <FisheryPost fisheryData={this.state.postData.fishery} />
          ) : null}
          {this.state.postData.fishingTrip ? (
            <FishingTripPost
              fishingTripData={this.state.postData.fishingTrip}
            />
          ) : null}
        </Aux>
      );
    }

    if (this.state.loading) {
      textarea = <Loading />;
    }

    return this.props.edit ? (
      <EditPostTile
        closeEditPostOnClick={this.props.closeEditPostOnClick}
        updatePostOnClick={() => this.updatePostHandler()}
        disabledButtom={!this.state.postForm.valid}
        loading={this.state.loading}
      >
        {textarea}
      </EditPostTile>
    ) : (
      <NewPostTile
        addNewPostOnClick={() => this.createNewPostHandler()}
        disabledButtom={!this.state.postForm.valid}
        activeField={this.state.activeField}
        loading={this.state.loading}
      >
        {textarea}
      </NewPostTile>
    );
  }
}

ActionPost.propTypes = {
  closeEditPostOnClick: PropTypes.func,
  refreshData: PropTypes.func,
  edit: PropTypes.bool,
  updatePostData: PropTypes.object
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(ActionPost);
