import React, { useEffect } from "react";
import DataForm from "./DataForm";
import LeafletForm from "./LeafletForm";
import { legendState } from "../context/LegendProvider";

const Form = () => {
  const { select, setSelect, period, setPeriod } = legendState();

  const selects = ["d3", "leaflet"];

  const periods = [
    "2022 Summer",
    "2023 Winter",
    "2023 Summer",
    "2024 Winter",
    "All",
  ];

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelect(value);
  };

  const handlePeriodChange = (event) => {
    const value = event.target.value;
    setPeriod(value);
  };
  useEffect(() => {
    console.log("value ", select);
  }, [select])

  return (
    <div>
      <div>
        <label>
          Visualize:
          <select value={select} onChange={handleSelectChange}>
            {selects.map((selectOption, index) => (
              <option key={index} value={selectOption}>
                {selectOption === "leaflet" ? "Leaflet" : "d3"}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Period:
          <select value={period} onChange={handlePeriodChange}>
            {periods.map((period, index) => (
              <option key={index} value={period}>
                {period}
              </option>
            ))}
          </select>
        </label>
      </div>
      {select === "leaflet" && <LeafletForm />}
      {select === "d3" && <DataForm />}
    </div>
  );
};

export default Form;