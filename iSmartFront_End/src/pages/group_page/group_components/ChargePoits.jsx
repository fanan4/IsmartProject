import { useContext, useEffect, useState } from "react";
import GroupsContext from "../../../context/groupsContext";
import ChargePointsContext from "../../../context/chargePointsContext";
import TableContainer from "../../../components/TableContainer/tableContainer";
import NewGroupChargePoint from "../../../components/NewGroupChargePoint/NewGroupChargePoint";
import AuthContext from "../../../context/authContext";
export default   ({id})=>{
    const [data,setData]=useState([]);
    const [dataSearch,setDataSearch]=useState([])
    const { chargepoints,  fetchChargePoints} = useContext(GroupsContext)
    const {deleteChargePoint } = useContext(ChargePointsContext);
    const { user }=useContext(AuthContext)
    useEffect(()=>{
      if(chargepoints.length===0){
        fetchChargePoints(id)
      }
      setData(chargepoints)
      setDataSearch(chargepoints) 
      
    } , [chargepoints])
    const [popup, setPopup] = useState(false);
    const tableHeader = {
      _id: "Charger Id",
      chargerName: "Charger Name",
      location: "Charger Location",
      status: "Status",
      chargerModel: "Charger Model",
      supportNumber: "Support Number",
    };
    const onChange=(e)=>{
      const value=e.target.value 
      const NewData=dataSearch.filter(ch=>ch.chargerName.includes(value)  || ch.status.includes(value)  || ch.location.includes(value))
      setData(NewData)  
      if(value==='' || value.includes(' ')) setData(dataSearch)          
    }


    return  <div>
   <TableContainer
     data={[tableHeader, ...data]}
     width="975px"
     popup={user.role==='Superadmin' ? popup: null}   
     setPopup={setPopup}
     buttonValue="Add Station" 
     onClickDelete={(id) => deleteChargePoint(id)}
     detailsRoute="charge-points" 
     onChange={onChange} 
     ImporData={null}
  /> 
  
  
  <div className="popup">
  {popup ? <NewGroupChargePoint popup={popup} id = {id} setPopup={setPopup} /> : null}
  </div> 
  </div>
   }