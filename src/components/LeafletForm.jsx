import React, { useState } from 'react'
import { legendState } from '../context/LegendProvider'

const LeafletForm = () => {
  const { box, setBox, marker, setMarker, mapType, setMapType } = legendState()
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
                <option value="default">Default</option>
                <option value="circle">Circle</option>
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
        </>
      )}
    </div>
  )
}

export default LeafletForm