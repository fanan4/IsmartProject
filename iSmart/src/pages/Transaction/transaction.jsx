import React, { useContext, useEffect, useState } from "react";
import "./transaction.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import Layer from "../../components/Layer/layer";
import TextHeader from "../../components/TextHeader/textHeader";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import TransactionsContext from "../../context/transactionContext";
import { exportToExcel } from "../../utils/exportData";

function Transaction() {
  const [popup, setPopup] = useState(false);
  const [data,setData]=useState([])
  const [dataSearch,setDataSearch]=useState([])
  const [active,setActive]=useState(false)  
  const { fetchTransactions,transactions,getTransactionStatus }=useContext( TransactionsContext )  
  useEffect(()=>{
    if(transactions.length===0){
      fetchTransactions()   
    }
    changeData('All')   
  },[transactions])

  const changeData=(Status)=>{
   // console.log('hello in change data in session sisssions areee ',sessions)
    switch(Status){
      case 'All': 
          setData(transactions)  
          setDataSearch(transactions)
         break;
       case 'Charging':
          const ChargingTransaction=getTransactionStatus('Charging')
           setData(ChargingTransaction)
           setDataSearch(ChargingTransaction)
         break;
       case 'Ended': 
         const EndedTransaction=getTransactionStatus('completed')
            setData(EndedTransaction) 
            setDataSearch(EndedTransaction)   
         break;  
      case 'Suspended': 
         const SuspendedTransaction=getTransactionStatus('suspended') 
            setData(SuspendedTransaction) 
            setDataSearch(SuspendedTransaction) 
         break;    
    }
} 


  return (
    <div className="cntr">
      <SideBar active="transaction" />
      <div className="page-cntr">
        <CustomHeader value="Transaction" />
        <div className="charge-points">
          <OptionsNav
             options="All,Charging,Ended,Suspended"
              active={active} 
              setActive={setActive}
              onClick={changeData} 
              />
          <TransactionsTable
             popup={popup} 
             setPopup={setPopup}
             onClick={changeData} 
             data={data}
             setData={setData} 
             dataSearch={dataSearch}
            
            />
        </div>
      </div>
      {popup ? (
        <Layer onClick={() => setPopup(false)}>
          <TextHeader level="small" value="Export as Excel" />
        </Layer>
      ) : null}
    </div>
  );
}

export default Transaction;
