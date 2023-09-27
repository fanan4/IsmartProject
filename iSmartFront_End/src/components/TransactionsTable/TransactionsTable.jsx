import React, { useContext, useEffect, useState } from "react";

//local components
import TableContainer from "../TableContainer/tableContainer";
import TransactionsContext from "../../context/transactionContext";
import { getTime, getDate } from "../../utils/formatTimeAndDate";
import { exportToExcel } from "../../utils/exportData"; 
const tableHeader = {
  _id: "Transaction Id",
  userId: "User Id",
  chargerId: "Charger Id", 
  status: "Status",
  duration: "Duration",
  klwCharged: "Klw Charged",
  date: "Date",
 
};

const excludedKeys = ["timestamp"];

const formatTransactions = (data) => {
  const mewData = structuredClone(data);
  getTime(mewData);
  getDate(mewData);
  return mewData;
};

function TransactionsTable({ popup, setPopup, chargerId,data,dataSearch,setData }) {
  const { transactions, fetchTransactions, deleteTransaction } =
    useContext(TransactionsContext);

  useEffect(() => {
    if(transactions.length===0){
      if (chargerId) fetchTransactions(chargerId);
      else fetchTransactions();
    }
  
  }, [transactions]);

  const onChange=(e)=>{
    const value=e.target.value
    const NewData=dataSearch.filter( f=>f.status.includes(value)  )  
    setData(NewData)  
    if(value==='' || value.includes(' ')) setData(dataSearch)                                  
  }
  
  return (
    <TableContainer
      data={[tableHeader, ...formatTransactions(data ? data : transactions)]} 
      width="1070px"
      pupup={popup}
      setPopup={setPopup}
      buttonValue="Export"
      excludedKeys={excludedKeys}
      onClickDelete={(id) => deleteTransaction(id)}
      remove
      dateFilter
      onChange={onChange}
      onClick={exportToExcel} 
      ImporData={null}
    />
  );
}

export default TransactionsTable;
