import React, { useContext, useEffect, useState } from "react";

//local components
import TableContainer from "../TableContainer/tableContainer";
import SessionsContext from "../../context/sessionContext";
import { getTime, getDate } from "../../utils/formatTimeAndDate";

const tableHeader = {
  _id: "Session Id",
  userId: "User Id",
  chargerId: "Charger Id",
  sessionStatus: "Session Status",
  sessionDuration: "Session Duration",
  location: "Location",
  tatalKlwCharged: "Klw Charged",
  revenue: "Revenue",
  date: "date",
};

// external components

const excludedKeys = ["transactions", "timestamp"];

const formatSessions = (data) => {
  const mewData = structuredClone(data);
  getTime(mewData);
  getDate(mewData);
  return mewData;
};

function SessionsTable({ popup, setPopup, chargerId,active,data,setData,dataSearch,onClick }) { 
  const { sessions, fetchSessions, deleteSession,getSessionsByStatus } = 
    useContext(SessionsContext);
  

  useEffect(() => {
    if(sessions.length===0){
      if (chargerId) fetchSessions(chargerId);
      else fetchSessions();
    }  
       
  }, [sessions]);   
  
  
  const onChange=(e)=>{
    const value=e.target.value
    const NewData=dataSearch.filter( s=>s.status.includes(value)  || s.location.includes(value))
    setData(NewData)  
    if(value==='' || value.includes(' ')) setData(dataSearch)                                 
  }

  return (
    <>
      <TableContainer
        data={[tableHeader, ...formatSessions(data? data : sessions)]} 
        width="1400px"
        pupup={popup}
        setPopup={setPopup}
        buttonValue="Export"
        onClickDelete={(id) => deleteSession(id)}
        excludedKeys={excludedKeys}
        remove
        dateFilter
        onChange={onChange} 
        onClick={onClick}  
        ImporData={null}
      />
    </>
  );
}

export default SessionsTable;
