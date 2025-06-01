import React, { useState } from "react";
import { legendState } from "../context/LegendProvider";

const LeafletForm = () => {
  const {
    box,
    setBox,
    marker,
    setMarker,
    mapType,
    setMapType,
    rwRadius,
    setRwRadius,
    filterType,
    setFilterType
  } = legendState();
  
  const [isMinimized, setIsMinimized] = useState(false);

  const handleShowBoxChange = (event) => {
    setBox(event.target.checked);
  };

  const handleMarkerTypeChange = (event) => {
    setMarker(event.target.value);
  };

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRwRadius(parseInt(event.target.value));
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div>
      <h3>
        Leaflet Settings
        <button onClick={toggleMinimize}>
          {isMinimized ? "Expand" : "Minimize"}
        </button>
      </h3>
      {!isMinimized && (
        <>
          {/* NEW: 4-Point Distance Filter */}
          <div>
            <label>
              Display Filter:
              <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="rw_only">1. RW Restaurants Only</option>
                <option value="rw_plus_neighbors_05">2. RW + Neighbors (0.5 mi)</option>
                <option value="rw_plus_neighbors_10">3. RW + Neighbors (1.0 mi)</option>
                <option value="all_categories">4. All Categories</option>
              </select>
            </label>
          </div>
          
          <div>
            <label>
              <input
                type="checkbox"
                checked={box}
                onChange={handleShowBoxChange}
              />
              Show Bounding Box
            </label>
          </div>
          
          <div>
            <label>
              Marker Type:
              <select value={marker} onChange={handleMarkerTypeChange}>
                <option value="circle">Circle</option>
                <option value="default">Default</option>
              </select>
            </label>
          </div>
          
          <div>
            <label>
              Map Type:
              <select value={mapType} onChange={handleMapTypeChange}>
                <option value="Default">Default</option>
                <option value="Gray Canvas">Gray Canvas</option>
                <option value="Detailed">Detailed</option>
                <option value="None">None</option>
              </select>
            </label>
          </div>
          
          <div>
            <label>
              Marker Radius:
              <select value={rwRadius} onChange={handleRadiusChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default LeafletForm;