import React, { useContext, useEffect   } from "react";
import "./dashboard.scss";

// local components
import SideBar from "../../components/SideBar/sideBar";
import CustomHeader from "../../components/CustomHeader/customHeader";
import InfoCard from "../../components/InfoCard/infoCard";
import StationsStatus from "../../components/StationsStatus/stationsStatus";
import SessionsContext from "../../context/sessionContext"; 
import Map from "../../components/Map/map"; 
import CustomChart from "../../components/CustomedChart/CustomChart"; 
import Chartconfig from "../../components/CustomedChart/Chartconfig";
import graphContext from "../../context/graphContext";
import ChargePointsContext from "../../context/chargePointsContext";

// external components

function Dashboard() {
  const { cordinates, fetchCordinates } = useContext(ChargePointsContext);

  useEffect(() => {
    fetchCordinates();
  }, []);

  const {
    fetchSessionsCount,
    fetchEnergyAndDuration,
    SessionsCount,
    energyAndDuration,
  } = useContext(SessionsContext);

  const {
    data,
    list,
    datatypeindex,
  } = useContext(graphContext);

  useEffect(() => {
    fetchSessionsCount();
    fetchEnergyAndDuration();
  }, []);

  return (
    <div className="cntr">
      <SideBar active="dashboard" /> 
      <div className="page-cntr">
        <CustomHeader value="Dashboard" /> 
        
        <div className="stats">
          <div className="grid">
            <InfoCard
              title="Active Sessions"
              number={SessionsCount.activeSessions}
              progress="242.23"
            />
            <InfoCard
              title="Total Sessions"
              number={
                SessionsCount.activeSessions + SessionsCount.inactiveSessions
              }
              progress="24.739"
            />
            <InfoCard
              title="Total Duration"
              number={
                (energyAndDuration.totalDuration / 60 + 4).toFixed(2) + " H"
              }
              progress="19.32"
            />
            <InfoCard
              title="Energy Used"
              number={energyAndDuration.totalEnergyUsed / 1000 + 38.32 + " Klw"}
              progress="45.217"
            />
          </div>
          <div className="charge-points">
            <StationsStatus />
          </div>
        </div> 
        <div>
        <div className="map"> 
        <Map cordinates={cordinates}/>
         </div>
      
        <div className="chart">
        <Chartconfig   />
        <CustomChart  data = {data}   list= {list}    datatypeindex={datatypeindex} />
        </div>
      
        </div>
         
      </div>
    </div>
  );
}

export default Dashboard;
