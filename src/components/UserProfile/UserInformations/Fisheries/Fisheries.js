import React from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FaWater } from "react-icons/fa";

import { fishingTripMarker } from "../../../Maps/Markers/FishingTrip/FishingTripMarker";

import Tile from "../../../UI/Tile/Tile";

const Fisheries = props => {
  return (
    <Tile
      sm={"SM-8"}
      md={"MD-8"}
      xl={"XL-8"}
      topLeft={
        <>
          <FaWater size={16} />
          Fisheries
        </>
      }
    >
      <Map
        center={[50, 23]}
        zoom={6}
        style={{
          width: "100%",
          height: "400px"
        }}
        maxZoom={19.8}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {props.fisheries.map(fishery => (
          <Marker
            key={fishery.id}
            icon={fishingTripMarker}
            position={[fishery.latitude, fishery.altitude]}
          >
            <Popup minWidth={90}>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexFlow: "column"
                }}
              >
                <div>{fishery.name}</div>
                <div>{fishery.description}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </Tile>
  );
};

Fisheries.propTypes = {
  fisheries: PropTypes.array
};

export default Fisheries;
