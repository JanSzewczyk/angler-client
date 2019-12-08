import React, { createRef, Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { FaWater } from "react-icons/fa";
import axios from "../../axios";

import Tile from "../../components/UI/Tile/Tile";
import { fishingTripMarker } from "../../components/Maps/Markers/FishingTrip/FishingTripMarker";
import { userMarker } from "../../components/Maps/Markers/User/UserMarker";

import { connect } from "react-redux";

import classes from "./Fisheries.module.css";

class Fisheries extends Component {
  state = {
    fisheries: [],
    loading: true,
    hasLocation: false,
    latlng: {
      lat: 52.09,
      lng: 19.02
    }
  };

  componentDidMount() {
    this.getUserLocationHandler();
    let config = {
      headers: {
        Authorization: this.props.tokenType + " " + this.props.token
      }
    };

    axios
      .get("/lake", config)
      .then(res => {
        console.log(res.data);
        this.setState({
          fisheries: res.data,
          loading: false
        });
      })
      .catch(err => {});
  }

  mapRef = createRef();

  getUserLocationHandler = () => {
    const map = this.mapRef.current;
    if (map != null) {
      console.log("mapa");
      map.leafletElement.locate();
    }
  };

  handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };

  render() {
    const yourMarker = this.state.hasLocation ? (
      <Marker position={this.state.latlng} icon={userMarker}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null;

    return (
      <div className={classes.Fisheries}>
        <Tile
          sm={"SM-12"}
          md={"MD-8"}
          xl={"XL-6"}
          topLeft={
            <>
              <FaWater size={16} />
              Fisheries in Poland
            </>
          }
        >
          <Map
            center={this.state.latlng}
            zoom={9}
            style={{
              width: "100%",
              height: "400px"
            }}
            onLocationfound={this.handleLocationFound}
            maxZoom={19.8}
            ref={this.mapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {yourMarker}
            {this.state.fisheries.map(fishery => (
              <Marker
                key={fishery.id}
                icon={fishingTripMarker}
                position={[fishery.latitude, fishery.altitude]}
              >
                <Popup minWidth={90}>{fishery.name}</Popup>
              </Marker>
            ))}
          </Map>
        </Tile>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    tokenType: state.auth.tokenType
  };
};

export default connect(mapStateToProps)(Fisheries);
