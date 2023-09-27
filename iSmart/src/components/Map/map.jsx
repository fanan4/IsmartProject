import React, { useContext, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChargePointsContext from "../../context/chargePointsContext";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// local components
// import available from "../../assets/images/ev-station-available.svg";
// import charging from "../../assets/images/ev-station-charging.svg";
// import offline from "../../assets/images/ev-station-offline.svg";

// const icons = {
//   offline: offline,
//   available: available,
//   charging: charging,
// };

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 32.22216717936178,
  lng: -7.9290911959991615,
};

// cordinates test
const cords = [
  {
    pos: {
      lat: 32.62246717936178,
      lng: -7.7290911959991615,
    },
    status: "charging",
  },
  {
    pos: { lat: 32.52216717936178, lng: -7.1290911959991615 },
    status: "available",
  },
  {
    pos: { lat: 32.59216717936178, lng: -7.1990911959991615 },
    status: "charging",
  },
  {
    pos: { lat: 32.22216717936178, lng: -7.9290911959991615 },
    status: "offline",
  },
  {
    pos: { lat: 31.92216717936178, lng: -7.1290911959991615 },
    status: "available",
  },
  {
    pos: { lat: 32.84216717936178, lng: -8.1230911959991615 },
    status: "offline",
  },
  {
    pos: { lat: 32.28216717936178, lng: -8.1840911959991615 },
    status: "charging",
  },
  {
    pos: { lat: 32.10216717936178, lng: -7.1640911959991615 },
    status: "available",
  },
  {
    pos: { lat: 32.10216717936178, lng: -5.1640911959991615 },
    status: "charging",
  },
];

const chargingPin = new Leaflet.Icon({
  iconUrl: require("../../assets/images/charging-pin.png"),
  iconRetinaUrl: require("../../assets/images/charging-pin.png"),
  iconSize: new Leaflet.Point(40, 40),
});
const availablePin = new Leaflet.Icon({
  iconUrl: require("../../assets/images/available-pin.png"),
  iconRetinaUrl: require("../../assets/images/available-pin.png"),
  iconSize: new Leaflet.Point(40, 40),
});
const offlinePin = new Leaflet.Icon({
  iconUrl: require("../../assets/images/offline-pin.png"),
  iconRetinaUrl: require("../../assets/images/offline-pin.png"),
  iconSize: new Leaflet.Point(40, 40),
});

const getPin = (status) => {
  switch (status) {
    case "charging":
      return chargingPin;
    case "available":
      return availablePin;
    case "offline":
      return offlinePin;
    default:
      return offlinePin;
  }
};

function Map({cordinates} ) {

  return (
    <MapContainer center={center} zoom={8} style={{ height: "100%" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMapContainer</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cordinates.map((cor, idx) => (
        <Marker
          key={idx}
          position={{ lat: cor.latitude, lng: cor.longitude }}
          icon={getPin(cor.status)}
        >
          <Popup>
            <div>{cor.chargerName}</div>
            <div style={{ textTransform: "capitalize" }}>{cor.status}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
