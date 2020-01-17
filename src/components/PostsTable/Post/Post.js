import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import ActionPost from "../../../containers/PostsTable/ActionPost/ActionPost";
import FisheryPost from "./FisheryPost/FisheryPost";
import FishingTripPost from "./FishingTripPost/FishingTripPost";
import Tile from "../../UI/Tile/Tile";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./Post.module.css";

const Post = props => {
  let content = null;

  if (props.postData.fishingTrip) {
    content = <FishingTripPost fishingTripData={props.postData.fishingTrip} />;
  }

  if (props.postData.fishery) {
    content = <FisheryPost fisheryData={props.postData.fishery} />;
  }

  let post = (
    <Tile
      sm={"SM-12"}
      md={"MD-12"}
      xl={"XL-12"}
      topLeft={
        <Aux>
          <Link
            to={"/profile/" + props.postData.userNick}
            className={classes.Link}
          >
            <div>
              <FaUserCircle size={20} />
            </div>
            <div className={classes.PostInfo}>
              <div className={classes.Nick}>{props.postData.userNick}</div>
              <div className={classes.Date}>
                {props.postData.releaseTime} {props.postData.releaseDate}
              </div>
            </div>
          </Link>
        </Aux>
      }
      topRight={
        !props.postData.status ? (
          <div className={classes.Actions}>
            {!props.editPost ? (
              <div
                className={classes.ActionEdit}
                onClick={() => props.editPostOnClick(props.postData.id)}
              >
                <FaEdit size={20} />
              </div>
            ) : null}
            <div
              className={classes.ActionRemove}
              onClick={props.deletePostOnClick}
            >
              <MdDeleteForever size={20} />
            </div>
          </div>
        ) : null
      }
    >
      <div className={classes.Post}>{props.postData.description}</div>
      {content}
    </Tile>
  );

  if (props.editPost) {
    post = (
      <ActionPost
        edit
        updatePostData={props.postData}
        closeEditPostOnClick={() => props.editPostOnClick(null)}
      />
    );
  }

  return post;
};

Post.propTypes = {
  editPostOnClick: PropTypes.func.isRequired,
  deletePostOnClick: PropTypes.func.isRequired,
  postData: PropTypes.object.isRequired,
  editPost: PropTypes.bool.isRequired
};

export default Post;
