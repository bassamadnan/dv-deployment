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
import { getBusinessesByCategory } from "../utils/data_parser";
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

  // Get businesses by category based on selected filter type
  const businessesByCategory = getBusinessesByCategory(filterType);

  const washingtonDCBounds = [
    [38.791645, -77.119759], // [ymin, xmin]
    [38.99511, -76.909395], // [ymax, xmax]
  ];

  // Color schemes with explicit zIndex for layering control
  const markerStyles = {
    rw_restaurants: {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.7,
      radius: rwRadius,
      zIndex: 1000, // Highest priority
    },
    treated125: {
      color: "blue",
      fillColor: "blue", 
      fillOpacity: 0.6,
      radius: nonRwRadius,
      zIndex: 300,
    },
    treated125_250Only: {
      color: "darkblue",
      fillColor: "darkblue",
      fillOpacity: 0.6,
      radius: nonRwRadius,
      zIndex: 200,
    },
    control: {
      color: "forestgreen",
      fillColor: "forestgreen",
      fillOpacity: 0.5,
      radius: nonRwRadius,
      zIndex: 100, // Lowest priority
    }
  };

  const renderMarker = (business, index, categoryStyle, isRW = false) => {
    const position = [business.lat, business.long];
    
    // Different popup content for RW vs non-RW businesses
    const popupContent = (
      <Popup>
        <div>
          <h3>{isRW ? business["Restaurant Name"] : business.businessName}</h3>
          <p>Location: {isRW ? business.Location : business.addressLocality}</p>
          {!isRW && (
            <>
              <p>Business Type: {business.Level1} - {business.Level2}</p>
              <p>Treatment Status:</p>
              <ul>
                <li>Treated 125: {business.treated125 ? "Yes" : "No"}</li>
                <li>Treated 125-250: {business.treated125_250Only ? "Yes" : "No"}</li>
                <li>Control: {business.control ? "Yes" : "No"}</li>
              </ul>
            </>
          )}
          <a href={isRW ? business.yelpUrl : business.businessUrl} target="_blank" rel="noopener noreferrer">
            View on Yelp
          </a>
        </div>
      </Popup>
    );

    const key = `${isRW ? 'rw' : 'nonrw'}-${index}`;

    if (marker === "circle") {
      return (
        <CircleMarker
          key={key}
          center={position}
          pathOptions={categoryStyle}
          zIndexOffset={categoryStyle.zIndex || 0}
        >
          {popupContent}
        </CircleMarker>
      );
    } else {
      return (
        <Marker 
          key={key} 
          position={position}
          zIndexOffset={categoryStyle.zIndex || 0}
        >
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

        {/* Render markers by treatment category - RW restaurants LAST so they appear on top */}
        {businessesByCategory.control.map((business, index) =>
          renderMarker(business, index, markerStyles.control, false)
        )}
        {businessesByCategory.treated125_250Only.map((business, index) =>
          renderMarker(business, index, markerStyles.treated125_250Only, false)
        )}
        {businessesByCategory.treated125.map((business, index) =>
          renderMarker(business, index, markerStyles.treated125, false)
        )}
        {/* RW restaurants rendered LAST to appear on top */}
        {businessesByCategory.rw_restaurants.map((business, index) =>
          renderMarker(business, index, markerStyles.rw_restaurants, true)
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