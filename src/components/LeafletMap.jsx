// src/components/LeafletMap.jsx
import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  CircleMarker,
  Popup,
  TileLayer,
  Rectangle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { getBusinessesByCategory } from "../utils/data_parser";
import { legendState } from "../context/LegendProvider";

// Component to create custom panes for layering
const CreatePanes = () => {
  const map = useMap();
  
  useEffect(() => {
    // Create custom panes with specific z-index values
    if (!map.getPane('controlPane')) {
      map.createPane('controlPane');
      map.getPane('controlPane').style.zIndex = 400;
    }
    if (!map.getPane('treated250Pane')) {
      map.createPane('treated250Pane');
      map.getPane('treated250Pane').style.zIndex = 450;
    }
    if (!map.getPane('treated125Pane')) {
      map.createPane('treated125Pane');
      map.getPane('treated125Pane').style.zIndex = 500;
    }
    if (!map.getPane('rwPane')) {
      map.createPane('rwPane');
      map.getPane('rwPane').style.zIndex = 600; // Highest - always on top
    }
  }, [map]);
  
  return null;
};

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

  // Color schemes with pane assignments for explicit layering
  const markerStyles = {
    rw_restaurants: {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.7,
      radius: rwRadius,
      pane: 'rwPane', // Top layer
    },
    treated125: {
      color: "blue",
      fillColor: "blue", 
      fillOpacity: 0.6,
      radius: nonRwRadius,
      pane: 'treated125Pane',
    },
    treated125_250Only: {
      color: "darkblue",
      fillColor: "darkblue",
      fillOpacity: 0.6,
      radius: nonRwRadius,
      pane: 'treated250Pane',
    },
    control: {
      color: "forestgreen",
      fillColor: "forestgreen",
      fillOpacity: 0.5,
      radius: nonRwRadius,
      pane: 'controlPane', // Bottom layer
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
          pane={categoryStyle.pane}
        >
          {popupContent}
        </CircleMarker>
      );
    } else {
      return (
        <Marker 
          key={key} 
          position={position}
          pane={categoryStyle.pane}
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
        <CreatePanes />
        
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

        {/* Render markers in REVERSE order - RW restaurants FIRST to appear on top */}
        {businessesByCategory.rw_restaurants.map((business, index) =>
          renderMarker(business, index, markerStyles.rw_restaurants, true)
        )}
        {businessesByCategory.treated125.map((business, index) =>
          renderMarker(business, index, markerStyles.treated125, false)
        )}
        {businessesByCategory.treated125_250Only.map((business, index) =>
          renderMarker(business, index, markerStyles.treated125_250Only, false)
        )}
        {businessesByCategory.control.map((business, index) =>
          renderMarker(business, index, markerStyles.control, false)
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