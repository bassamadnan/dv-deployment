import { createContext, useContext, useState } from "react";

const LegendContext = createContext();

const LegendProvider = ({ children }) => {
  const [select, setSelect] = useState("leaflet");
  const [box, setBox] = useState(false);
  const [marker, setMarker] = useState("circle");
  const [mapType, setMapType] = useState("Default");

  // New state for distance-based filtering
  const [filterType, setFilterType] = useState("matched_business_final");

  // Visibility toggles for each category
  const [showRW, setShowRW] = useState(false);
  const [showNeighbors, setShowNeighbors] = useState(true);
  const [showControl, setShowControl] = useState(true);

  // Individual size controls for each category
  const [rwRadius, setRwRadius] = useState(3);
  const [neighborsRadius, setNeighborsRadius] = useState(2);
  const [controlRadius, setControlRadius] = useState(2);

  // Color controls for each category
  const [rwColor, setRwColor] = useState("#ff0000"); // red
  const [neighborsColor, setNeighborsColor] = useState("#0000ff"); // blue
  const [controlColor, setControlColor] = useState("#228b22"); // forestgreen

  // Remove old period, nonRW, rangeValues states - not needed anymore

  return (
    <LegendContext.Provider
      value={{
        select,
        setSelect,
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
      }}
    >
      {children}
    </LegendContext.Provider>
  );
};

export const legendState = () => {
  return useContext(LegendContext);
};

export default LegendProvider;