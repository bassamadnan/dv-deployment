import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  CircleMarker,
  Popup,
  TileLayer,
  Rectangle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { points } from "../utils/data_parser";
import { legendState } from "../context/LegendProvider";
import { filterPointsByRank } from "../utils/get_top_points";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = () => {
  const { box, marker, period, mapType, nonRW, rwRadius, nonRwRadius, rangeValues} = legendState();
  // console.log(rangeValues);
  const filteredNonRWPoints = filterPointsByRank(rangeValues);
  const filteredPoints =
    period === "All"
      ? points.filter((point) =>
          ["2022 Summer", "2023 Winter", "2023 Summer", "2024 Winter"].some(
            (key) => point[key] === 1
          )
        )
      : points.filter((point) => point[period] === 1);

  const washingtonDCBounds = [
    [38.791645, -77.119759], // [ymin, xmin]
    [38.99511, -76.909395], // [ymax, xmax]
  ];

  const circleMarkerOptions = {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.5,
    radius: rwRadius,
  };

  const nonRWCircleMarkerOptions = {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.5,
    radius: nonRwRadius,
  };

  const renderMarker = (point, index) => {
    const position = [point.lat, point.long];
    const popupContent = (
      <Popup>
        <div>
          <h3>{point["businessName"]}</h3>
          <p>Location: {point.addressLocality}</p>
          <a href={point.businessUrl} target="_blank" rel="noopener noreferrer">
            {point.businessUrl}
          </a>
        </div>
      </Popup>
    );

    if (marker === "circle") {
      return (
        <CircleMarker
          key={index}
          center={position}
          pathOptions={circleMarkerOptions}
        >
          {popupContent}
        </CircleMarker>
      );
    } else {
      return (
        <Marker key={index} position={position}>
          {popupContent}
        </Marker>
      );
    }
  };

  const renderNonRWMarker = (point, index) => {
    const position = [point.lat, point.long];
    const popupContent = (
      <Popup>
        <div>
          <h3>{point["businessName"]}</h3>
          <p>Location: {point.addressLocality}</p>
          <a href={point.businessUrl} target="_blank" rel="noopener noreferrer">
            {point.businessUrl}
          </a>
        </div>
      </Popup>
    );

    if (marker === "circle") {
      return (
        <CircleMarker
          key={index}
          center={position}
          pathOptions={nonRWCircleMarkerOptions}
        >
          {popupContent}
        </CircleMarker>
      );
    } else {
      return (
        <Marker key={index} position={position}>
          {popupContent}
        </Marker>
      );
    }
  };
  useEffect(() => {
    // console.log(filteredNonRWPoints);
  }, [nonRW, rangeValues])
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <MapContainer
        center={[38.9072, -77.0369]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        {mapType === "Default" && (
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          />
        )}
        {mapType === "Gray Canvas" && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          />
        )}
        {mapType === "Detailed" && (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )}
        {mapType === "None" && <TileLayer url="xyz" />}
        {filteredPoints.map(renderMarker)}
        {nonRW && filteredNonRWPoints.map(renderNonRWMarker)}
        {box && (
          <Rectangle
            bounds={washingtonDCBounds}
            pathOptions={{ color: "blue" }}
          />
        )}
      </MapContainer>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      ></div>
    </div>
  );
};

export default LeafletMap;