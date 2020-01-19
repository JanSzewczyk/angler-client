import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker } from "react-leaflet";
import { FaRegEdit, FaEye, FaShareAlt } from "react-icons/fa";

import { fishingTripMarker } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import Buttom from "../../../components/UI/Buttons/Button/Button";
import Tile from "../../UI/Tile/Tile";

import classes from "./FishingTripCard.module.css";

const fishingTripCard = props => {
  const position = [
    props.fishingTripData.fishery.latitude,
    props.fishingTripData.fishery.altitude
  ];

  return (
    <Tile
      sm={"SM-6"}
      md={"MD-4"}
      xl={"XL-3"}
      topRight={
        <Buttom btnType={"Primary"} clicked={props.onEdit}>
          <FaRegEdit size={15} />
          edit
        </Buttom>
      }
      botLeft={
        <div className={classes.FishingTripDescription} onClick={props.onShow}>
          <div className={classes.Title}>{props.fishingTripData.title}</div>
          <div className={classes.Date}>{props.fishingTripData.tripDate}</div>
        </div>
      }
      botRight={
        <div className={classes.Actions}>
          <Buttom clicked={props.onShow}>
            <FaEye size={15} />
            show
          </Buttom>
          {!props.fishingTripData.share ? (
            <div className={classes.Share} onClick={props.onShare}>
              <FaShareAlt size={20} />
            </div>
          ) : null}
        </div>
      }
    >
      <Map
        center={position}
        zoom={13}
        maxZoom={19.8}
        style={{
          width: "100%",
          height: "250px"
        }}
        scrollWheelZoom={false}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={fishingTripMarker} />
      </Map>
    </Tile>
  );
};

fishingTripCard.propTypes = {
  fishingTripData: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired
};

export default fishingTripCard;
