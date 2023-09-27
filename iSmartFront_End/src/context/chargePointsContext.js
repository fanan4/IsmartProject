import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";
// import GlobalContext from "./globalContext";

const ChargePointsContext = createContext();

export const ChargePointProvider = ({ children }) => {
  const [chargePoints, setChargePoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cordinates, setCordinates] = useState([]);
  const [statusStats, setstatusStats] = useState({
    available: 0,
    charging: 0,
    offline: 0,
    total: 0,
  });

  const fetchChargePoints = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("api/chargePoints", {});
      setChargePoints(res.data.data.chargePoints);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchCordinates = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("api/chargePoints/cordinates", {});
      setCordinates(res.data.data.cordinates);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchStatusStats = async () => {
    setIsLoading(true);
    try {
      const res = await http.get("api/chargePoints/StatusStats", {});
      setstatusStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getChargePointById = async (id, setChargePoint) => {
    setIsLoading(true);
    try {
      const res = await http.get(`/api/chargePoints/${id}`);
      console.log('get charge point by id is succedddddddddd: ',res.status)
      setChargePoint(res.data.data.chargePoint); 
    } catch (error) {
      
      console.log(error);
    }
    setIsLoading(false);
  };
  const getChargePointByStatus=(status)=>{
       return chargePoints.filter(ch=>ch.status===status)
  } 
  const addChargePoint = async (chargePoint) => {
    setIsLoading(true);
    try {
      const res = await http.post("/api/chargePoints/", chargePoint);    
      console.log(res.data);
      fetchChargePoints();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateChargePoint = async (id, chargePoint, setChargePoint) => {
    setIsLoading(true);
    console.log("updating...");
    try {
      const res = await http.patch(`/api/chargePoints/${id}`, chargePoint);
      console.log(res.data);
      setChargePoint(res.data.data.chargePoint);
      fetchChargePoints();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteChargePoint = async (id) => {
    setIsLoading(true);
    try {
      const res = await http.delete(`/api/chargePoints/${id}`);
      console.log(res.data);
      fetchChargePoints();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
   useEffect(()=>{
    fetchChargePoints()
   },[])
  
   const addManyChargePoints=async(cchargePoints)=>{
    console.log('hello to add many charge points :',cchargePoints)     
     setIsLoading(true);
     try {
       const res =await http.post(`/api/chargePoints/addMany`,cchargePoints)  
       if(res.status===201){
          fetchChargePoints();  
       } 
  
     } catch (error) {
      console.log(error); 
     }
     setIsLoading(false)          
   }  
   

  return (
    <ChargePointsContext.Provider
      value={{
        chargePoints,
        isLoading,
        cordinates,
        statusStats,
        fetchChargePoints,
        fetchCordinates,
        fetchStatusStats,
        setChargePoints,
        getChargePointById,
        addChargePoint,
        updateChargePoint,
        deleteChargePoint,
        getChargePointByStatus,
        addManyChargePoints
      }}
    >
      {children}
    </ChargePointsContext.Provider>
  );
};

export default ChargePointsContext;
