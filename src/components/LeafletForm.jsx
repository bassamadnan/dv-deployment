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
    <div style={{ position: 'relative' }}>
      {/* Toggle Button */}
      <button
        onClick={toggleMinimize}
        style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '2px solid #3b82f6',
          backgroundColor: 'white',
          color: '#3b82f6',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3b82f6';
          e.target.style.color = 'white';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.color = '#3b82f6';
          e.target.style.transform = 'scale(1)';
        }}
        title={isMinimized ? "Expand Settings" : "Collapse Settings"}
      >
        {isMinimized ? '⚙' : '×'}
      </button>

      {!isMinimized && (
        <>
          <h3 style={{ marginTop: '0', marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>
            Leaflet Settings
          </h3>
          {/* Display Filter Options */}
          <div>
            <label>
              Display Filter:
              <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="rw_neighbors">1a. RW (385) + Neighbors (1460)</option>
                <option value="rw_neighbors_control">1b. RW + Neighbors + Control (5888)</option>
                <option value="neighbors_control">2. Neighbors + Control</option>
                <option value="matched_neighbors_control">3. Matched Neighbors (672) + Control (4809)</option>
                <option value="matched_business_final">4. Matched Business Final - Neighbors (672) + Control (4809)</option>
                <option value="matched_zip_final">5. Matched Zip Final - Neighbors (840) + Control (5881)</option>
                <option value="unmatched_final">6. Unmatched Final - Neighbors (1460) + Control (5888)</option>
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