import React from "react";
import DataForm from "./DataForm";
import LeafletForm from "./LeafletForm";
import { legendState } from "../context/LegendProvider";

const Form = () => {
  const { select, setSelect } = legendState();

  const selects = ["d3", "leaflet"];

  const handleSelectChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <div>
      <div>
        <label>
          Visualize:
          <select value={select} onChange={handleSelectChange}>
            {selects.map((selectOption, index) => (
              <option key={index} value={selectOption}>
                {selectOption === "leaflet" ? "Leaflet" : "D3"}
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