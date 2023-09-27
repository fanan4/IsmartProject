import { useContext, useEffect, useState } from "react";


import GroupsContext from "../../../context/groupsContext";
import TransactionsContext from "../../../context/transactionContext";
import TableContainer from "../../../components/TableContainer/tableContainer";
import { exportToExcel } from "../../../utils/exportData";
const  Reservations = (  {id})=>{
    const { reservations,fetChReservations  } = useContext(GroupsContext)
    const {deleteTransaction } =
    useContext(TransactionsContext);
    useEffect(()=>{
      fetChReservations(id)
    } , [])
    const [popup, setPopup] = useState(false);
  
    const tableHeader = {
      _id: "Reservation Id",
      reservationId: "Reservation Id",
      userId: "User Id",
      chargerId: "Charger Id",
      time: "Time",
      status: "Status",
      connectorId: "Connector Id",
      sessionDuration: "Session Duration",
      location: "Location",
    };
   
    return  <div>
   
    <TableContainer
         data={[tableHeader, ... reservations]}
         width="1070px"
         pupup={popup}
         setPopup={setPopup}
         buttonValue="Export"
         onClickDelete={(id) => deleteTransaction(id)}
         remove
         dateFilter
         onClick={exportToExcel}
         ImporData={null}
       />
   
   
   
   </div>
   }
   export default  Reservations;