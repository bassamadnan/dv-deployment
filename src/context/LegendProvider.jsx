import { createContext, useContext, useState } from "react";

const LegendContext = createContext();

const LegendProvider = ({ children }) => {
  const [select, setSelect] = useState("leaflet");
  const [box, setBox] = useState(false);
  const [marker, setMarker] = useState("circle");
  const [mapType, setMapType] = useState("Default");
  // Simplified size controls: RW vs Non-RW
  const [rwRadius, setRwRadius] = useState(3);
  const [nonRwRadius, setNonRwRadius] = useState(2);
  
  // New state for distance-based filtering (the 4 points)
  const [filterType, setFilterType] = useState("rw_only");
  
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
        rwRadius,
        setRwRadius,
        nonRwRadius,
        setNonRwRadius,
        filterType,
        setFilterType
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