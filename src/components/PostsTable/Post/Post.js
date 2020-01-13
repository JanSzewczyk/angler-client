import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import TrophyTable from "./TrophyTable/TrophyTable";
import { Map, TileLayer, Marker } from "react-leaflet";
import { fishingTripMarker } from "../../Maps/Markers/FishingTrip/FishingTripMarker";

import Tile from "../../UI/Tile/Tile";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./Post.module.css";

const Post = props => {
  let content = null;

  if (props.postData.fishingTrip) {
    content = (
      <div className={classes.FishingTrip}>
        <div className={classes.TripInfo}>
          <div className={classes.TripName}>
            {props.postData.fishingTrip.title}
          </div>
          <div className={classes.TripDate}>
            {props.postData.fishingTrip.tripDate}
          </div>
          <div className={classes.TripDescription}>
            {props.postData.fishingTrip.description}
          </div>
          <div className={classes.Line} />
          <div className={classes.Trophies}>TROPHIES</div>
          <div className={classes.TrophyTable}>
            <TrophyTable trophies={props.postData.fishingTrip.trophies} />
          </div>
        </div>
        <div className={classes.TripMap}>
          <Map
            style={{
              width: "100%",
              minHeight: "200px",
              height: "100%"
            }}
            center={[
              props.postData.fishingTrip.fishery.latitude,
              props.postData.fishingTrip.fishery.altitude
            ]}
            zoom={12}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              icon={fishingTripMarker}
              position={[
                props.postData.fishingTrip.fishery.latitude,
                props.postData.fishingTrip.fishery.altitude
              ]}
            ></Marker>
          </Map>
        </div>
      </div>
    );
  }

  if (props.postData.fishery) {
    content = (
      <div className={classes.Fishery}>
        <div className={classes.FisheryInfo}>
          <div className={classes.Name}>{props.postData.fishery.name}</div>
          <div className={classes.Description}>
            {props.postData.fishery.description}
          </div>
        </div>
        <div className={classes.FisheryMap}>
          <Map
            style={{
              width: "100%",
              minHeight: "200px",
              height: "100%"
            }}
            center={[
              props.postData.fishery.latitude,
              props.postData.fishery.altitude
            ]}
            zoom={12}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              icon={fishingTripMarker}
              position={[
                props.postData.fishery.latitude,
                props.postData.fishery.altitude
              ]}
            ></Marker>
          </Map>
        </div>
      </div>
    );
  }

  return (
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
};

Post.propTypes = {
  editPostOnClick: PropTypes.func.isRequired,
  deletePostOnClick: PropTypes.func.isRequired,
  postData: PropTypes.object.isRequired,
  editPost: PropTypes.bool.isRequired
};

export default Post;
