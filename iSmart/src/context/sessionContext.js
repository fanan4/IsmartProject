import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";
// import GlobalContext from "./globalContext";

const SessionsContext = createContext();

export const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [SessionsCount, setSessionsCount] = useState({
    totalEnergyUsed: 0,
    totalDuration: 0,
  });
  const [energyAndDuration, setEnergyAndDuration] = useState({
    activeSessions: 0,
    inactiveSessions: 0,
  });

  const fetchSessions = async (chargerId) => {
    setIsLoading(true);
    try {
      const res = await http.get(
        `api/sessions?chargerId=${chargerId || ""}`,
        {}
      );
      console.log('sessionssssss arreeeeee : ',res.data.data.sessions) 
      setSessions(res.data.data.sessions);
    } catch (err) {
      setSessions([]);
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchSessionsCount = async () =>{ 
    setIsLoading(true);
    try {
      const res = await http.get("api/sessions/sessionsCount", {});
      setSessionsCount(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const fetchEnergyAndDuration = async () => {      
    setIsLoading(true);
    try {
      const res = await http.get("api/sessions/totalEnergyAndDuration", {});
      setEnergyAndDuration(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getSessionsById = async (id, setSessions) => {
    setIsLoading(true);
    try {
      const res = await http.get(`/api/sessions/${id}`);
      setSessions(res.data.data.session);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addSession = async (session) => {
    setIsLoading(true);
    try {
      const res = await http.post("/api/sessions/", session);
      fetchSessions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateSession = async (id, session, setSessions) => {
    setIsLoading(true);
    try {
      const res = await http.patch(`/api/sessions/${id}`, session);
      setSessions(res.data.data.session);
      fetchSessions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteSession = async (id) => {
    setIsLoading(true);
    try {
      const res = await http.delete(`/api/sessions/${id}`);
      fetchSessions();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getSessionsByStatus=(status)=>{
    return sessions.filter(s=>s.status===status)
  }

  return (
    <SessionsContext.Provider
      value={{
        sessions,
        isLoading,
        SessionsCount,
        energyAndDuration,
        fetchSessions,
        fetchSessionsCount,
        fetchEnergyAndDuration,
        setSessions,
        getSessionsById,
        addSession,
        updateSession,
        deleteSession,
        getSessionsByStatus
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
};

export default SessionsContext;
