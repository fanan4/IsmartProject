import React, { useState, useContext } from "react";
import "./newStation.scss";

// local components
import CustomInput from "../CustomInput/customInput";
import Layer from "../Layer/layer";
import TextHeader from "../TextHeader/textHeader";
import CustomButton from "../CustomButton/customButton";
import ChargePointsContext from "../../context/chargePointsContext";

const cancelStyles = {
  backgroundColor: "white",
  color: "#777777",
  border: "1px solid #777777",
};

function NewStation({ popup, setPopup }) {
  const [data, setData] = useState({
    chargerName: "",
    location: "",
    longitude: "",
    latitude: "",
    connectorId: "",
    connectorType: "",
    chargerModel: "",
  });
  const { addChargePoint, isLoading } = useContext(ChargePointsContext);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <Layer
      onClick={(e) => {
        setPopup(false);
      }}
    >
      <form className="new-user" onClick={(e) => e.stopPropagation()}>
        <TextHeader
          level="small"
          value="Add New User"
          styles={{ marginBottom: "0.8rem" }}
          onChange={handleChange}
        />
        <CustomInput
          name="chargerName"
          label="Charger Name"
          value={data.chargerName}
          onChange={handleChange}
        />
        <CustomInput
          name="location"
          label="Charger Location"
          value={data.location}
          onChange={handleChange}
        />
        <div className="cordinates">
          <CustomInput
            name="longitude"
            label="Longitude"
            value={data.longitude}
            onChange={handleChange}
          />
          <CustomInput
            name="latitude"
            label="Latitude"
            value={data.latitude}
            onChange={handleChange}
          />
        </div>
        <CustomInput
          name="connectorId"
          label="Connector Id"
          value={data.connectorId}
          onChange={handleChange}
        />
        <CustomInput
          name="connectorType"
          label="Connector Type"
          value={data.connectorType}
          onChange={handleChange}
        />
        <CustomInput
          name="chargerModel"
          label="Charger Model"
          value={data.chargerModel}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton
            value="Cancel"
            styles={cancelStyles}
            onClick={() => setPopup(false)}
          />
          <CustomButton
            value="Add"
            onClick={() => {
              addChargePoint(data);
              setPopup(false);
            }}
          />
        </div>
      </form>
    </Layer>
  );
}

export default NewStation;
