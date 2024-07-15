import React, { useState } from "react";
import ReactSlider from 'react-slider';
import { legendState } from "../context/LegendProvider";

const LeafletForm = () => {
  const {
    box,
    setBox,
    marker,
    rwRadius,
    setMarker,
    mapType,
    setMapType,
    nonRw,
    setNonRW,
    setRwRadius,
    rangeValues,
    setRangeValues
  } = legendState();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleShowBoxChange = (event) => {
    const value = event.target.checked;
    setBox(value);
  };

  const handleMarkerTypeChange = (event) => {
    const value = event.target.value;
    setMarker(value);
  };

  const handleMapTypeChange = (event) => {
    const value = event.target.value;
    setMapType(value);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleShowNonRWChange = (event) => {
    const value = event.target.checked;
    setNonRW(value);
  };

  const handleRadiusChange = (event) => {
    const value = parseInt(event.target.value);
    setRwRadius(value);
  };

  const handleRangeChange = (newValues) => {
    setRangeValues(newValues);
  };

  const handleInputChange = (index, value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 2500) {
      const newRangeValues = [...rangeValues];
      newRangeValues[index] = newValue;
      if (index === 0 && newValue < rangeValues[1]) {
        setRangeValues(newRangeValues);
      } else if (index === 1 && newValue > rangeValues[0]) {
        setRangeValues(newRangeValues);
      }
    }
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
              <input
                type="checkbox"
                checked={nonRw}
                onChange={handleShowNonRWChange}
              />
              Show non-RW
            </label>
          </div>
          <div>
            <label>
              Radius:
              <select value={rwRadius} onChange={handleRadiusChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Range:
              <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[1, 2500]}
                value={rangeValues}
                onChange={handleRangeChange}
                min={1}
                max={2500}
                pearling
                minDistance={10}
              />
            </label>
            <div className="text-sm">
              Lower Bound: 
              <input 
                type="number" 
                value={rangeValues[0]} 
                onChange={(e) => handleInputChange(0, e.target.value)}
                min={1}
                max={2500}
              />
              Upper Bound: 
              <input 
                type="number" 
                value={rangeValues[1]} 
                onChange={(e) => handleInputChange(1, e.target.value)}
                min={1}
                max={2500}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeafletForm;