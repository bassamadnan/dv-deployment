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
    filterType,
    setFilterType,
    showRW,
    setShowRW,
    showNeighbors,
    setShowNeighbors,
    showControl,
    setShowControl,
    rwRadius,
    setRwRadius,
    neighborsRadius,
    setNeighborsRadius,
    controlRadius,
    setControlRadius,
    rwColor,
    setRwColor,
    neighborsColor,
    setNeighborsColor,
    controlColor,
    setControlColor
  } = legendState();

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formSectionStyle = {
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #e5e7eb'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '5px',
    color: '#374151'
  };

  const categoryBlockStyle = {
    backgroundColor: '#f9fafb',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '8px'
  };

  const flexRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px'
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
        <div>
          <h3 style={{ marginTop: '0', marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>
            Map Settings
          </h3>

          {/* Data Filter Section */}
          <div style={formSectionStyle}>
            <label style={labelStyle}>Data Source</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: '100%', padding: '5px', fontSize: '12px' }}
            >
              <option value="matched_business_final">Matched Business Final - Neighbors (672) + Control (4809)</option>
              <option value="matched_zip_final">Matched Zip Final - Neighbors (840) + Control (5881)</option>
              <option value="unmatched_final">Unmatched Final - Neighbors (1460) + Control (5888)</option>
            </select>
          </div>

          {/* Visibility Controls */}
          <div style={formSectionStyle}>
            <label style={labelStyle}>Visibility</label>
            <div>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                <input
                  type="checkbox"
                  checked={showRW}
                  onChange={(e) => setShowRW(e.target.checked)}
                  style={{ marginRight: '6px' }}
                />
                Show RW Businesses
              </label>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                <input
                  type="checkbox"
                  checked={showNeighbors}
                  onChange={(e) => setShowNeighbors(e.target.checked)}
                  style={{ marginRight: '6px' }}
                />
                Show Neighbors
              </label>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                <input
                  type="checkbox"
                  checked={showControl}
                  onChange={(e) => setShowControl(e.target.checked)}
                  style={{ marginRight: '6px' }}
                />
                Show Control
              </label>
            </div>
          </div>

          {/* Customization Section */}
          <div style={formSectionStyle}>
            <label style={labelStyle}>Customization</label>

            {/* RW Customization */}
            {showRW && (
              <div style={categoryBlockStyle}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#dc2626' }}>
                  RW Businesses
                </div>
                <div style={flexRowStyle}>
                  <span style={{ fontSize: '11px', minWidth: '40px' }}>Color:</span>
                  <select
                    value={rwColor}
                    onChange={(e) => setRwColor(e.target.value)}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    <option value="#ff0000">Red</option>
                    <option value="#0000ff">Blue</option>
                    <option value="#228b22">Green</option>
                    <option value="#ffa500">Orange</option>
                    <option value="#800080">Purple</option>
                    <option value="#000000">Black</option>
                    <option value="#ffff00">Yellow</option>
                    <option value="#ff69b4">Pink</option>
                  </select>
                  <span style={{ fontSize: '11px', minWidth: '35px', marginLeft: '5px' }}>Size:</span>
                  <select
                    value={rwRadius}
                    onChange={(e) => setRwRadius(parseInt(e.target.value))}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Neighbors Customization */}
            {showNeighbors && (
              <div style={categoryBlockStyle}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#2563eb' }}>
                  Neighbors
                </div>
                <div style={flexRowStyle}>
                  <span style={{ fontSize: '11px', minWidth: '40px' }}>Color:</span>
                  <select
                    value={neighborsColor}
                    onChange={(e) => setNeighborsColor(e.target.value)}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    <option value="#ff0000">Red</option>
                    <option value="#0000ff">Blue</option>
                    <option value="#228b22">Green</option>
                    <option value="#ffa500">Orange</option>
                    <option value="#800080">Purple</option>
                    <option value="#000000">Black</option>
                    <option value="#ffff00">Yellow</option>
                    <option value="#ff69b4">Pink</option>
                  </select>
                  <span style={{ fontSize: '11px', minWidth: '35px', marginLeft: '5px' }}>Size:</span>
                  <select
                    value={neighborsRadius}
                    onChange={(e) => setNeighborsRadius(parseInt(e.target.value))}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Control Customization */}
            {showControl && (
              <div style={categoryBlockStyle}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#16a34a' }}>
                  Control
                </div>
                <div style={flexRowStyle}>
                  <span style={{ fontSize: '11px', minWidth: '40px' }}>Color:</span>
                  <select
                    value={controlColor}
                    onChange={(e) => setControlColor(e.target.value)}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    <option value="#ff0000">Red</option>
                    <option value="#0000ff">Blue</option>
                    <option value="#228b22">Green</option>
                    <option value="#ffa500">Orange</option>
                    <option value="#800080">Purple</option>
                    <option value="#000000">Black</option>
                    <option value="#ffff00">Yellow</option>
                    <option value="#ff69b4">Pink</option>
                  </select>
                  <span style={{ fontSize: '11px', minWidth: '35px', marginLeft: '5px' }}>Size:</span>
                  <select
                    value={controlRadius}
                    onChange={(e) => setControlRadius(parseInt(e.target.value))}
                    style={{ padding: '3px', fontSize: '11px', flex: 1 }}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Map Options */}
          <div style={formSectionStyle}>
            <label style={labelStyle}>Map Options</label>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Marker Type</label>
              <select
                value={marker}
                onChange={(e) => setMarker(e.target.value)}
                style={{ width: '100%', padding: '4px', fontSize: '11px' }}
              >
                <option value="circle">Circle</option>
                <option value="default">Pin</option>
              </select>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', display: 'block', marginBottom: '3px' }}>Base Map</label>
              <select
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                style={{ width: '100%', padding: '4px', fontSize: '11px' }}
              >
                <option value="Default">Default</option>
                <option value="Gray Canvas">Gray Canvas</option>
                <option value="Detailed">Detailed</option>
                <option value="None">None</option>
              </select>
            </div>
            <label style={{ display: 'block', fontSize: '12px' }}>
              <input
                type="checkbox"
                checked={box}
                onChange={(e) => setBox(e.target.checked)}
                style={{ marginRight: '6px' }}
              />
              Show Bounding Box
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletForm;
