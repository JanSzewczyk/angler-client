import React from "react";
import PropTypes from "prop-types";
import { FaShareAlt, FaMapMarkedAlt } from "react-icons/fa";
import { Map, TileLayer, Marker } from "react-leaflet";

import { fishingTripMarker } from "../../../Maps/Markers/FishingTrip/FishingTripMarker";
import Tile from "../../../UI/Tile/Tile";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";

import classes from "./FisheryTile.module.css";

const FisheryTile = props => {
  return (
    <Tile
      sm={"SM-8"}
      md={"MD-6"}
      xl={"XL-6"}
      topLeft={
        <Aux>
          <FaMapMarkedAlt size={16} />
          Fishing spot
        </Aux>
      }
      topRight={
        props.sharePost ? (
          <div className={classes.Share} onClick={props.onCreatePost}>
            <FaShareAlt size={20} />
          </div>
        ) : null
      }
    >
      <Map
        style={{
          width: "100%",
          height: "300px"
        }}
        center={props.position}
        zoom={12}
        maxZoom={19.8}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker icon={fishingTripMarker} position={props.position}></Marker>
      </Map>
    </Tile>
  );
};

FisheryTile.propTypes = {
  onCreatePost: PropTypes.func.isRequired,
  position: PropTypes.array.isRequired,
  sharePost: PropTypes.bool.isRequired
};

export default FisheryTile;
