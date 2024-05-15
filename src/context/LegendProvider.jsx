import { createContext, useContext, useState, useEffect } from "react";

// keeps track of the country selected

const LegendContext = createContext();

const LegendProvider = ({ children }) => {
  const [select, setSelect] = useState("leaflet");
  const [box, setBox] = useState(false);
  const [marker, setMarker] = useState("Default");
  const [period, setPeriod] = useState("2022 Summer");
  const [mapType, setMapType] = useState("Default");
  return (
    <LegendContext.Provider
      value={{
       select,
       setSelect,
       box,
       setBox,
       marker,
       setMarker,
       period,
       setPeriod,
       mapType,
       setMapType
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
