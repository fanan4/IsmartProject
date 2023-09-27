import React, { useContext, useState } from "react";
import "./generalDetails.scss";

// local component
import CustomInput from "../../components/CustomInput/customInput";
import CustomButton from "../../components/CustomButton/customButton";
import ChargePointsContext from "../../context/chargePointsContext";

function GeneralDetails({ chargePoint, id, setChargePoint }) {
  const [data, setData] = useState({
    chargerName: chargePoint.chargerName || "",
    location: chargePoint.location || "",
    address: chargePoint.address || "",
    longitude: chargePoint.longitude || "",
    latitude: chargePoint.latitude || "",
    connectorId: chargePoint.connectorId || "",
    connectorType: chargePoint.connectorType || "",
    chargerModel: chargePoint.chargerModel || "",
    supportNumber: chargePoint.supportNumber || "",
  });
  const { updateChargePoint } = useContext(ChargePointsContext);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="general-detail">
      <div className="section">
        <CustomInput
          label="Charger Name"
          name="chargerName"
          value={data.chargerName}
          onChange={handleChange}
        />
        <CustomInput
          label="Location"
          name="location"
          value={data.location}
          onChange={handleChange}
        />
        <CustomInput
          label="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
        />
        <div className="cordinates">
          <CustomInput
            label="Longitude"
            name="longitude"
            value={data.longitude}
            onChange={handleChange}
          />
          <CustomInput
            label="Latitude"
            name="latitude"
            value={data.latitude}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="section">
        <CustomInput
          label="Connector Id"
          name="connectorId"
          value={data.connectorId}
          onChange={handleChange}
        />
        <CustomInput
          label="Connector Type"
          name="connectorType"
          value={data.connectorType}
          onChange={handleChange}
        />
        <CustomInput
          label="Charger Model"
          name="chargerModel"
          value={data.chargerModel}
          onChange={handleChange}
        />
        <CustomInput
          label="Support phone number"
          name="supportNumber"
          value={data.supportNumber}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton
            onClick={() => updateChargePoint(id, data, setChargePoint)}
            value="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralDetails;
