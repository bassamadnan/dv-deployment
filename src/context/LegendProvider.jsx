import { createContext, useContext, useState, useEffect } from "react";

// keeps track of the country selected

const LegendContext = createContext();

const LegendProvider = ({ children }) => {
  const [select, setSelect] = useState("leaflet");
  const [box, setBox] = useState(false);
  const [marker, setMarker] = useState("circle");
  const [period, setPeriod] = useState("2022 Summer");
  const [mapType, setMapType] = useState("Default");
  const [nonRW, setNonRW] = useState(false);
  const [rwRadius, setRwRadius] = useState(2);
  const [nonRwRadius, setNonRwRadius] = useState(2);
  const [topBusinesses, setTopBusinesses] = useState(1);
  const [rangeValues, setRangeValues] = useState([1, 2500]);
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
       setMapType,
       nonRW,
       setNonRW,
       rwRadius,
       setRwRadius,
       nonRwRadius,
       setNonRwRadius,
       topBusinesses,
       setTopBusinesses,
       rangeValues,
       setRangeValues
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
