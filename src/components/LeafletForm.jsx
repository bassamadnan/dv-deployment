import React, { useState } from 'react'
import { legendState } from '../context/LegendProvider'

const LeafletForm = () => {
  const { box, setBox, marker,radius, setMarker, mapType, setMapType, nonRw, setNonRW, setRadius} = legendState()
  const [isMinimized, setIsMinimized] = useState(false)

  const handleShowBoxChange = (event) => {
    const value = event.target.checked
    setBox(value)
  }

  const handleMarkerTypeChange = (event) => {
    const value = event.target.value
    setMarker(value)
  }

  const handleMapTypeChange = (event) => {
    const value = event.target.value
    setMapType(value)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleShowNonRWChange = (event) => {
    const value = event.target.checked
    setNonRW(value)
  }

  const handleRadiusChange = (event) => {
    const value = parseInt(event.target.value)
    setRadius(value)
  }

  return (
    <div>
      <h3>
        Leaflet Settings
        <button onClick={toggleMinimize}>
          {isMinimized ? 'Expand' : 'Minimize'}
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
              <select value={radius} onChange={handleRadiusChange}>
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
  )
}

export default LeafletForm