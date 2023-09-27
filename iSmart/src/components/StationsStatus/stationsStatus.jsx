import React, { useContext, useEffect } from "react";
import "./stationsStatus.scss";

// external components
import { PieChart } from "react-minimal-pie-chart";
import { BsFillCircleFill } from "react-icons/bs";

// local components
import TextHeader from "../TextHeader/textHeader";
import ChargePointsContext from "../../context/chargePointsContext";

const titleStyles = {
  fontWeight: "500",
  fontSize: "16px",
};

function StationsStatus() {
  const { statusStats, fetchStatusStats } = useContext(ChargePointsContext);

  const availablePersentage = Math.round(
    (statusStats.available / statusStats.total) * 100
  );
  const chargingPersentage = Math.round(
    (statusStats.charging / statusStats.total) * 100
  );
  const offlinePersentage = Math.round(
    (statusStats.offline / statusStats.total) * 100
  );

  console.log(statusStats.total);

  useEffect(() => {
    fetchStatusStats();
  }, []);

  return (
    <div className="station-status">
      <TextHeader level="small" value="Charge Points" styles={titleStyles} />
      <PieChart
        className="chart"
        animate={true}
        lineWidth="50"
        // paddingAngle="2"
        // rounded
        radius={45}
        segmentsShift="1"
        // onMouseOver={() => {}}
        data={[
          { title: "Charging", value: chargingPersentage, color: "#00B3FF" },
          { title: "Available", value: availablePersentage, color: "#AFC759" },
          { title: "Offline", value: offlinePersentage, color: "#FF6B65" },
        ]}
      />
      <div className="status">
        <div className="info">
          <BsFillCircleFill className="icon" color="#00B3FF" />
          <span> Charging </span>
          <p>{chargingPersentage} %</p>
        </div>
        <div className="info">
          <BsFillCircleFill className="icon" color="#AFC759" />
          <span> Available </span>
          <p>{availablePersentage} %</p>
        </div>
        <div className="info">
          <BsFillCircleFill className="icon" color="#FF6B65" />
          <span> Offline </span>
          <p>{offlinePersentage} %</p>
        </div>
      </div>
    </div>
  );
}

export default StationsStatus;
