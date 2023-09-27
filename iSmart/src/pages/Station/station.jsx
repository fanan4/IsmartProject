import React, { useContext, useEffect, useState } from "react";
import "./station.scss";

// external components
import { useParams } from "react-router-dom";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import SideBar from "../../components/SideBar/sideBar";
import GeneralDetails from "../../components/GeneralDetails/generalDetails";
import ChargePointsContext from "../../context/chargePointsContext";
import Spinner from "../../components/Spinner/Spinner";
import SessionsTable from "../../components/SessionsTable/SessionsTable";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import TextHeader from "../../components/TextHeader/textHeader";
import colors from "../../utils/colors";
import chargePointsGraphContext from "../../context/chargePointGraphContext";
import CustomChart from "../../components/CustomedChart/CustomChart";
import graphContext from "../../context/graphContext";
import ChargePointChartConfig from "../../components/CustomedChart/ChargePointChartConfig";
import AuthContext from "../../context/authContext";

const switchOptions = (active, chargePoint, setChargePoint, id) => {
 
  switch (active) {
    case "General":
      return (
        <GeneralDetails
          chargePoint={chargePoint}
          id={id}
          setChargePoint={setChargePoint}
        />
      );
    case "Sessions":
      return (
        <StationSessions chargePoint={chargePoint }  id = {id} />
      );
    case "Transactions":
      return (
       <StationTranSactions chargePoint={  chargePoint} id = {id} />
      );
    case "Reservations":
      return <div className="detail">Reservations</div>;
    case "Logs":
      return <div className="detail">Logs</div>;
    case "Connectors":
      return <div className="detail">Connectors</div>;
    case "Settings":
      return <div className="detail">Settings</div>;
    default:
      return <div>default</div>;
  }
};

function Station() {
  const [chargePoint, setChargePoint] = useState(null);
  const [active, setActive] = useState("General");
  const { isLoading, getChargePointById } = useContext(ChargePointsContext);
  const { user }=useContext(AuthContext)
  const { id } = useParams();
  console.log('iddddd  passedd is :',id)
  
  useEffect(() => {
    getChargePointById(id, setChargePoint);
  }, []);

 

  return (
    <div className="cntr">
  
      {user.role=='Superadmin'?<SideBar active="charge-points" />:null } 
      <div className="page-cntr charge-point-details" style={{width:user.role=="admin"?"100%":null}}>
        <CustomHeader value="Charge Point Details" />
        <OptionsNav
          options="General,Sessions,Transactions,Reservations,Logs,Connectors,Settings"
          active={active}
          setActive={setActive}
        />
   
        {!isLoading && chargePoint ? (
          switchOptions(active, chargePoint, setChargePoint, id)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
const StationSessions =({chargePoint ,id }  )=>{
  const {    datatypeindex ,
    list,
    dataOfCharePoint,
    fetchByChargePoint
   } = useContext(chargePointsGraphContext);
   useEffect(()=>{
    console.log(id);
    fetchByChargePoint("sessions" , id )
   },[])
  
  return   <div className="detail">
  <TextHeader
    level="small"
    value={`${chargePoint.chargerName} Sessions`}
    styles={{ color: colors.textColor, margin: "1rem 0 0 1rem" }}
  />
  <SessionsTable chargerId={chargePoint._id} />
  <ChargePointChartConfig id = {id} />
  <CustomChart  data = {dataOfCharePoint}   list= {list}    datatypeindex={datatypeindex} />
</div>
}
const StationTranSactions =({chargePoint , id  }  )=>{
  const {   
    datatypeindex ,
    list,
    dataOfCharePoint,
    fetchByChargePoint
   } = useContext(chargePointsGraphContext);
   useEffect(()=>{
    fetchByChargePoint("transactions" , id )
   },[])
 
  return   <div className="detail">
  <TextHeader
    level="small"
    value={`${chargePoint.chargerName} Transactions`}
    styles={{ color: colors.textColor, margin: "1rem 0 0 1rem" }}
  />
  <TransactionsTable chargerId={chargePoint._id} />
  <ChargePointChartConfig id = {id} />
 
  <CustomChart  data = {dataOfCharePoint}   list= {list}    datatypeindex={datatypeindex} />
     
</div>}

export default Station;
