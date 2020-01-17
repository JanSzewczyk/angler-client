import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import { fishingTripMarker } from "../../../Maps/Markers/FishingTrip/FishingTripMarker";

import classes from "./FisheryPost.module.css";

const FisheryPost = props => {
  return (
    <div className={classes.Fishery}>
      <div className={classes.FisheryInfo}>
        <div className={classes.Name}>{props.fisheryData.name}</div>
        <div className={classes.Description}>
          {props.fisheryData.description}
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
            props.fisheryData.latitude,
            props.fisheryData.altitude
          ]}
          zoom={12}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            icon={fishingTripMarker}
            position={[
              props.fisheryData.latitude,
              props.fisheryData.altitude
            ]}
          ></Marker>
        </Map>
      </div>
    </div>
  );
};

FisheryPost.propTypes = {
  fisheryData: PropTypes.object.isRequired
};

export default FisheryPost;
