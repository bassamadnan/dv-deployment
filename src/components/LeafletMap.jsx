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
import { getBusinessesByCategory, getRWBusinesses } from "../utils/data_parser";
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
    filterType,
    showRW,
    showNeighbors,
    showControl,
    rwRadius,
    neighborsRadius,
    controlRadius,
    rwColor,
    neighborsColor,
    controlColor
  } = legendState();

  // Get businesses by category based on selected filter type
  const businessesByCategory = getBusinessesByCategory(filterType);

  // Get RW businesses if showRW is enabled
  const rwBusinesses = showRW ? getRWBusinesses() : [];

  // Filter based on visibility toggles
  const visibleNeighbors = showNeighbors ? businessesByCategory.neighbors : [];
  const visibleControl = showControl ? businessesByCategory.control : [];

  const washingtonDCBounds = [
    [38.791645, -77.119759], // [ymin, xmin]
    [38.99511, -76.909395], // [ymax, xmax]
  ];

  // Color schemes with pane assignments for explicit layering
  const markerStyles = {
    rw_restaurants: {
      color: rwColor,
      fillColor: rwColor,
      fillOpacity: 0.7,
      radius: rwRadius,
      pane: 'rwPane', // Top layer
    },
    neighbors: {
      color: neighborsColor,
      fillColor: neighborsColor,
      fillOpacity: 0.6,
      radius: neighborsRadius,
      pane: 'treated125Pane',
    },
    control: {
      color: controlColor,
      fillColor: controlColor,
      fillOpacity: 0.5,
      radius: controlRadius,
      pane: 'controlPane', // Bottom layer
    }
  };

  const renderMarker = (business, index, categoryStyle, category) => {
    const position = [business.lat, business.long];

    // Popup content for all businesses
    const popupContent = (
      <Popup>
        <div>
          <h3>{business.businessName}</h3>
          <p>Location: {business.addressLocality}</p>
          <p>Business Type: {business.Level1} - {business.Level2}</p>
          <p>Category: {category === 'rw_restaurants' ? 'RW Restaurant' : category === 'neighbors' ? 'Neighbor (Treated 250)' : 'Control'}</p>
          <a href={business.businessUrl} target="_blank" rel="noopener noreferrer">
            View on Yelp
          </a>
        </div>
      </Popup>
    );

    const key = `${category}-${business.businessID}-${index}`;

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

        {/* Render markers - RW restaurants on top (rendered last) */}
        {visibleControl.map((business, index) =>
          renderMarker(business, index, markerStyles.control, 'control')
        )}
        {visibleNeighbors.map((business, index) =>
          renderMarker(business, index, markerStyles.neighbors, 'neighbors')
        )}
        {rwBusinesses.map((business, index) =>
          renderMarker(business, index, markerStyles.rw_restaurants, 'rw_restaurants')
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