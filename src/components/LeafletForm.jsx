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
    nonRwRadius,
    setNonRwRadius,
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

  const handleRwRadiusChange = (event) => {
    setRwRadius(parseInt(event.target.value));
  };

  const handleNonRwRadiusChange = (event) => {
    setNonRwRadius(parseInt(event.target.value));
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
          {/* Display Filter Options */}
          <div>
            <label>
              Display Filter:
              <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="rw_neighbors">1a. RW (385) + Neighbors (1460)</option>
                <option value="rw_neighbors_control">1b. RW + Neighbors + Control (5888)</option>
                <option value="neighbors_control">2. Neighbors + Control</option>
                <option value="matched_neighbors_control">3. Matched Neighbors (672) + Control (4809)</option>
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
              RW Restaurant Size:
              <select value={rwRadius} onChange={handleRwRadiusChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </label>
          </div>
          
          <div>
            <label>
              Non-RW Business Size:
              <select value={nonRwRadius} onChange={handleNonRwRadiusChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default LeafletForm;