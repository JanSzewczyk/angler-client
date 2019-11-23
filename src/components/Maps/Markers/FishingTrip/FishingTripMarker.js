import L from "leaflet";
import icon from "../../../../assets/markers/fishing.png"
// import shadow from "./leaf-shadow.png"


var fishingTripMarker = L.icon({
  iconUrl: icon,
//   shadowUrl: shadow,
  iconSize: [38, 38], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
  iconAnchor: [8, 25], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [11, -30] // point from which the popup should open relative to the iconAnchor
});

export { fishingTripMarker };

// x / y