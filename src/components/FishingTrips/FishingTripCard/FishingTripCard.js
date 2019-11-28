import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import {FaRegEdit, FaEye} from "react-icons/fa"

import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import Buttom from "../../../components/UI/Buttons/Button/Button";

import classes from "./FishingTripCard.module.css";

const fishingTripCard = props => {
  const position = [ props.data.fishery.latitude,props.data.fishery.altitude];

  return (
    <div className={classes.FishingTripCard}>
      <div className={classes.Body}>
        <div className={classes.Content}>
          <Map
            center={position}
            zoom={13}
            maxZoom={19.8}
            style={{
              width: "100%",
              height: "300px"
            }}
            scrollWheelZoom={false}
          >
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={fishingTripMarker} />
          </Map>
        </div>
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Left}>
          <div className={classes.Title}>{props.data.title}</div>
          <div className={classes.Date}>{props.data.tripDate}</div>
        </div>
        <div className={classes.Right}>
        <Buttom btnType={"Primary"} clicked={props.onEdit}>
            <FaRegEdit size={15} />
            edit
          </Buttom>
          <Buttom clicked={props.onShow}>
            <FaEye size={15} />
            show
          </Buttom>
        </div>
      </div>
    </div>
  );
};

fishingTripCard.propTypes = {
  data: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default fishingTripCard;
