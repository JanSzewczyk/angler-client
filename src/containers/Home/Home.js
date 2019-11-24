import React, { createRef, Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fishingTripMarker } from "../../components/Maps/Markers/FishingTrip/FishingTripMarker";

class Home extends Component {
  state = {
    center: {
      lat: 51.505,
      lng: -0.09
    },
    marker: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 13,
    draggable: true
  };

  refmarker = createRef();

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng()
      });

      console.log(this.state.marker)
    }
  };

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map
        style={{
          width: "100%",
          height: "600px"
        }}
        center={position}
        zoom={this.state.zoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={fishingTripMarker}
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}
        >
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? "DRAG MARKER" : "MARKER FIXED"}
            </span>
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
