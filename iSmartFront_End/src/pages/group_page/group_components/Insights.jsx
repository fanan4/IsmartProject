import { useContext, useEffect, useState } from "react";


import ChargePointsContext from "../../../context/chargePointsContext";
import GroupsContext from "../../../context/groupsContext";
import graphContext from "../../../context/graphContext";
import Chartconfig from "../../../components/CustomedChart/Chartconfig";
import InfoCard from "../../../components/InfoCard/infoCard";
import StationsStatus from "../../../components/StationsStatus/stationsStatus";
import CustomChart from "../../../components/CustomedChart/CustomChart";
import Map from "../../../components/Map/map";

export default  ({id})=>{
    const {
      data,
      list,
      datatypeindex,
    } = useContext(graphContext);
    
    const {  fetchCordinates } = useContext(ChargePointsContext);
    const {fetchStatistics ,statistics} = useContext(GroupsContext)
    useEffect(() => {
      fetchCordinates();
     
      fetchStatistics(id);
    }, []);
      return   <div className="page-container" > 
   
             <div className="stats">
        
              <div className="grid">
                <InfoCard
                  title="Active Sessions"
                  number={statistics.totalActiveSession}
                  progress="242.23"
                />
                <InfoCard
                  title="Total Sessions"
                  number={
                    statistics.totalSessions  
                  }
                  progress="24.739"
                />
                <InfoCard
                  title="Total Duration"
                  number={
                    (statistics.totalDuration / 60  ).toFixed(2) + " H"
                  }
                  progress="19.32"
                />
                <InfoCard
                  title="Energy Used"
                  number={statistics.totalEnergyUsed / 1000   + " Klw"}
                  progress="45.217"
                />
              </div>
              <div className="charge-points">
                <StationsStatus /> 
              </div>
            </div>  
            <div className="chart-stats-contaienr ">
            <div className="chart-container "> 
            <Chartconfig  />
            <CustomChart  data = {data}   list= {list}    datatypeindex={datatypeindex} />  
            </div> 
            <div className="map-container ">
            <Map cordinates={statistics.cordinates}/>
            </div>
            </div>
            </div>;
    }