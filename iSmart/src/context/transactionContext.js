import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchTransactions = async (chargerId) => {
    setIsLoading(true);
    try {
      const res = await http.get(
        `api/transactions?chargerId=${chargerId || ""}`,
        {}
      );
      setTransactions(res.data.data.transactions);
    } catch (err) {
      setTransactions([]);
      console.log(err);
    }
    setIsLoading(false);
  };

  const getTransactionsById = async (id, setTransactions) => {
    setIsLoading(true);
    try {
      const res = await http.get(`/api/transactions/${id}`);
      setTransactions(res.data.data.transaction);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addTransaction = async (transaction) => {
    setIsLoading(true);
    try {
      const res = await http.post("/api/transactions/", transaction);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateTransaction = async (id, transaction, setTransactions) => {
    setIsLoading(true);
    try {
      const res = await http.patch(`/api/transactions/${id}`, transaction);
      setTransactions(res.data.data.transaction);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteTransaction = async (id) => {
    setIsLoading(true);
    try {
      const res = await http.delete(`/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getTransactionStatus=(status)=>{   
      return transactions.filter((f)=>f.status===status)                                           
  }
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoading,
        fetchTransactions,
        setTransactions,
        getTransactionsById,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionStatus
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
