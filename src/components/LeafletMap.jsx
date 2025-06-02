import React from "react";
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
import { getFilteredBusinesses, getBusinessesByCategory } from "../utils/data_parser";
import { legendState } from "../context/LegendProvider";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = () => {
  const { 
    box, 
    marker, 
    mapType, 
    rwRadius, 
    nonRwRadius,
    filterType 
  } = legendState();

  // Get filtered businesses based on selected filter type
  const filteredBusinesses = getFilteredBusinesses(filterType);
  const businessesByCategory = getBusinessesByCategory(filteredBusinesses);

  const washingtonDCBounds = [
    [38.791645, -77.119759], // [ymin, xmin]
    [38.99511, -76.909395], // [ymax, xmax]
  ];

  // Color schemes with RW vs Non-RW size controls
  const markerStyles = {
    rw_restaurants: {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.7,
      radius: rwRadius,
    },
    neighbors_05: {
      color: "blue",
      fillColor: "blue", 
      fillOpacity: 0.6,
      radius: nonRwRadius,
    },
    neighbors_10: {
      color: "darkblue",
      fillColor: "darkblue",
      fillOpacity: 0.6,
      radius: nonRwRadius,
    },
    neighbors_20: {
      color: "orange",
      fillColor: "orange",
      fillOpacity: 0.5,
      radius: nonRwRadius,
    },
    beyond_20: {
      color: "lightgreen",
      fillColor: "lightgreen",
      fillOpacity: 0.5,
      radius: nonRwRadius,
    }
  };

  const renderMarker = (business, index, categoryStyle) => {
    const position = [business.lat, business.long];
    const popupContent = (
      <Popup>
        <div>
          <h3>{business.businessName}</h3>
          <p>Location: {business.addressLocality}</p>
          <p>Category: {business.category}</p>
          <p>Distance to RW: {business.distance_to_nearest_rw} miles</p>
          <p>Nearest RW: {business.nearest_rw_restaurant}</p>
          <a href={business.businessUrl} target="_blank" rel="noopener noreferrer">
            View on Yelp
          </a>
        </div>
      </Popup>
    );

    const key = `${business.category}-${index}`;

    if (marker === "circle") {
      return (
        <CircleMarker
          key={key}
          center={position}
          pathOptions={categoryStyle}
        >
          {popupContent}
        </CircleMarker>
      );
    } else {
      return (
        <Marker key={key} position={position}>
          {popupContent}
        </Marker>
      );
    }
  };

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

        {/* Render markers by category with appropriate colors */}
        {businessesByCategory.rw_restaurants.map((business, index) =>
          renderMarker(business, index, markerStyles.rw_restaurants)
        )}
        {businessesByCategory.neighbors_05.map((business, index) =>
          renderMarker(business, index, markerStyles.neighbors_05)
        )}
        {businessesByCategory.neighbors_10.map((business, index) =>
          renderMarker(business, index, markerStyles.neighbors_10)
        )}
        {businessesByCategory.neighbors_20.map((business, index) =>
          renderMarker(business, index, markerStyles.neighbors_20)
        )}
        {businessesByCategory.beyond_20.map((business, index) =>
          renderMarker(business, index, markerStyles.beyond_20)
        )}

        {box && (
          <Rectangle
            bounds={washingtonDCBounds}
            pathOptions={{ color: "blue" }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;