import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import { fishingTripMarker } from "../../../Maps/Markers/FishingTrip/FishingTripMarker";

import TrophyTable from "../TrophyTable/TrophyTable";

import classes from "./FishingTripPost.module.css";

const FishingTripPost = props => {
  return (
    <div className={classes.FishingTrip}>
      <div className={classes.TripInfo}>
        <div className={classes.TripName}>{props.fishingTripData.title}</div>
        <div className={classes.TripDate}>{props.fishingTripData.tripDate}</div>
        <div className={classes.TripDescription}>
          {props.fishingTripData.description}
        </div>
        <div className={classes.Line} />
        <div className={classes.Trophies}>TROPHIES</div>
        <div className={classes.TrophyTable}>
          <TrophyTable trophies={props.fishingTripData.trophies} />
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
            props.fishingTripData.fishery.latitude,
            props.fishingTripData.fishery.altitude
          ]}
          zoom={12}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            icon={fishingTripMarker}
            position={[
              props.fishingTripData.fishery.latitude,
              props.fishingTripData.fishery.altitude
            ]}
          ></Marker>
        </Map>
      </div>
    </div>
  );
};

FishingTripPost.propTypes = {
  fishingTripData: PropTypes.object.isRequired
};

export default FishingTripPost;
