import { useContext, useEffect, useState } from "react";


import GroupsContext from "../../../context/groupsContext";
import SessionsContext from "../../../context/sessionContext";
import TableContainer from "../../../components/TableContainer/tableContainer";
import { getDate, getTime } from "../../../utils/formatTimeAndDate";
import { exportToExcel } from "../../../utils/exportData";
export default   ({id})=>{
    const { sessions,  fetchSessions} = useContext(GroupsContext)
    const {deleteSession } =
    useContext(SessionsContext);
    
    const [popup, setPopup] = useState(false);
    const [data,setData]=useState([])
    const [dataSearch,setDataSearch]=useState([])  
    useEffect(()=>{
      if(sessions.length===0){
        fetchSessions(id)
      }
      setData(sessions)
      setDataSearch(sessions) 
    } , [sessions])
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
    const formatSessions = (data) => {
      const mewData = structuredClone(data);
      getTime(mewData);
      getDate(mewData);
      return mewData;
    }; 

    const onChange=(e)=>{
      const value=e.target.value
      const NewData=dataSearch.filter( s=>s.status.includes(value)  || s.location.includes(value))
      setData(NewData)  
      if(value==='' || value.includes(' ')) setData(dataSearch)                                 
    }
    
    return  <div  >
   
   <TableContainer
          data={[tableHeader, ...formatSessions(sessions)]}
          width="1400px"
          pupup={popup}
          setPopup={setPopup}
          buttonValue="Export"
          onClickDelete={(id) => deleteSession(id)}
          dateFilter
          onChange={onChange} 
          onClick={exportToExcel} 
          ImporData={null}
        />
  
  
  {popup ? <div  >  export comme excel or something</div>  : null}
  </div>
   }
  