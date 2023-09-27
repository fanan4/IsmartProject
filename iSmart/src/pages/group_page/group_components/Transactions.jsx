import { useContext, useEffect, useState } from "react";

import GroupsContext from "../../../context/groupsContext";
import TransactionsContext from "../../../context/transactionContext";
import TableContainer from "../../../components/TableContainer/tableContainer";
import NewGroupChargePoint from "../../../components/NewGroupChargePoint/NewGroupChargePoint";
import { getDate, getTime } from "../../../utils/formatTimeAndDate";
import { exportToExcel } from "../../../utils/exportData";

const  Transactions = ({id})=>{
    const { transactions,  fetchTransactions} = useContext(GroupsContext)
    const {deleteTransaction } =
    useContext(TransactionsContext);
  
    const [popup, setPopup] = useState(false);
    const [data,setData]=useState([])
    const [dataSearch,setDataSearch]=useState([])   

    useEffect(()=>{
      if(transactions.length===0){
         fetchTransactions(id)
      }
       setData(transactions)
       setDataSearch(transactions) 
      
    } , [transactions])  

    const tableHeader = {
      _id: "Transaction Id",
      userId: "User Id",
      chargerId: "Charger Id",
      status: "Status",
      duration: "Duration",
      klwCharged: "Klw Charged",
      date: "Date",
    };
    const formatTransactions = (data) => {
      const mewData = structuredClone(data);
      getTime(mewData);
      getDate(mewData);
      return mewData;
    };
    
    const onChange=(e)=>{
      const value=e.target.value
      console.log('value isss:',value)
      const NewData=dataSearch.filter( f=>f.status.includes(value)  )  
      setData(NewData)  
      if(value==='' || value.includes(' ')) setData(dataSearch)                                  
    }
    return  <div  >
   
   <TableContainer
        data={[tableHeader, ...formatTransactions(transactions)]}
        width="1070px"
        pupup={popup}
        setPopup={setPopup}
        buttonValue="Export"
        onClickDelete={(id) => deleteTransaction(id)}
        remove
        dateFilter
        onChange={onChange} 
        onClick={exportToExcel}
        ImporData={null}
      />
  
  
  {popup ? <NewGroupChargePoint popup={popup} setPopup={setPopup} /> : null}
  </div>
   }
   export default  Transactions;