import React from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import {  fishingTripMarker  } from "../../../components/Maps/Markers/FishingTrip/FishingTripMarker"

import Buttom from "../../../components/UI/Buttons/Button/Button";

import classes from "./FishingTripCard.module.css";
import { GiFlashGrenade } from "react-icons/gi";

const fishingTripCard = props => {

  const position = [51.5, -0.09];

  return (
    <div className={classes.FishingTripCard}>
      <div className={classes.Head}>
        <div className={classes.Left}>
          <div className={classes.Title}>Fajna wyprawa </div>
          <div className={classes.Date}>213-152-2341</div>
        </div>
        <div className={classes.Right}>
          <Buttom>Show</Buttom>
        </div>
      </div>
      <div className={classes.Body}>
        <div className={classes.Content}>
            <Map
            center={position}
            zoom={17}
            maxZoom={19.8}
            style={{
               width: "100%",
              height: "300px"
            }}
            // dragging={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          <Marker
            position={position}
            icon={ fishingTripMarker }
            >
              <Popup >
                hejo
              </Popup>
          </Marker>
          </Map>
        </div>
      </div>
      <div className={classes.Bottom}>
        <div className={classes.Left}>adfgasdgasdgasdgasd</div>
      </div>
    </div>
  );
};

export default fishingTripCard;
