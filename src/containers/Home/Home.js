import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import { GiFishing } from "react-icons/gi";
import DivIcon from "react-leaflet-div-icon";
import "leaflet/dist/leaflet.css";
import {  fishingTripMarker  } from '../../components/Maps/Markers/FishingTrip/FishingTripMarker';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.5,
      lng: -0.09,
      zoom: 17
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        style={{
          width: "100%",
          height: "500px"
        }}
        maxZoom={19.8}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
    );
  }
}

export default Home;

// width: 100%;
//     height: 100%;
//     position: fixed;
//     outline: none;
