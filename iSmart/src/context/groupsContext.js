import React, { createContext, useState, useEffect, useContext } from "react";
import { useError } from "./errorContext.js";
import http from "../utils/axiosConfig";
// import GlobalContext from "./globalContext";

const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const { setErrorMessage } = useError();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [chargepoints, setChargePoints] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [cordonates, setCordonates] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [statistics, setStatistics] = useState({
    totalEnergyUsed: 0,
    totalDuration: 0,
    totalActiveSession: 0,
    totalSessions: 0,
    cordinates: [],
  });
  const [group, setGroup] = useState({});

  const fetchData = async (endpoint, setDataFunction, errMsg, params) => {
    try {
      const res = await http.get(endpoint, { params: params });
      setDataFunction(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };
  const fetChReservations = (groupId) => {
    fetchData(
      `api/groups/reservations/${groupId}`,
      setReservations,
      "can't fetch reservations "
    );
  };
  const fetchGroups = () => {
    fetchData("api/groups", setGroups, "can't fetch groups ");
  };

  const fetchMembers = async (groupId) => {
    await fetchData(
      `api/groups/GroupMembers/${groupId}`,
      setMembers,
      "can't fetch members "
    );
  };

  const fetchChargePoints = async (groupId) => {
    fetchData(
      `api/groups/chargepoints/${groupId}`,
      setChargePoints,
      "can't fetch chargepoints  "
    );
  };

  const fetchTransactions = (groupId) => {
    fetchData(
      `api/groups/transactions/${groupId}`,
      setTransactions,
      "can't fetch transacctions  "
    );
  };

  const fetchSessions = (groupId) => {
    fetchData(
      `api/groups/sessions/${groupId}`,
      setSessions,
      "can't fetch sessions  "
    );
  };

  const fetchStatistics = async (groupId) => {
    await fetchData(
      `api/groups/getGroupStatistics/${groupId}`,
      setStatistics,
      "can't fetch statistics  "
    );
    await fetchChargePoints(groupId);
    setIsLoading(true);
    setCordonates(
      chargepoints.map((item) => {
        return { longitude: item.longitude, latitude: item.latitude };
      })
    );
    console.log("this is coronate ", cordonates);
    setIsLoading(false);
  };

  const addGroup = async (group) => {
    setIsLoading(true);
    try {
      const res = await http.post("/api/groups", group);
      console.log(res.data);
      fetchGroups();
    } catch (error) {
      setErrorMessage(" Error While Creating  Group  :  Network Error ");
    }
    setIsLoading(false);
  };

  const getGroupById = async (id) => {
    setIsLoading(true);
    try {
      const res = await http.get(`/api/groups/${id}`);
      setGroup(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(` We Can't Fetch group :  Network Error ${error.msg} `);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const updateGroup = async (id, group) => {
    setIsLoading(true);
    try {
      const res = await http.put(`/api/groups/${id}`, group);
    } catch (error) {
      setErrorMessage(
        ` We Can't update group :  Network Error ${error.message} `
      );
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const deleteMember = async (id, group, setGroup) => {
    setIsLoading(true); 
    try {
      const res = await http.delete(`/api/groups/GroupMembers/${id}/?memberId=${id}`, group);
      await fetchMembers(id);
      setGroup(res.data.data.group);
  
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteGroup = async (id) => {
    setIsLoading(true);
    try {
      await http.delete(`/api/groups/${id}`);
      fetchGroups();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const addMember = async (id, member) => {
    setIsLoading(true);
    try {
      await http.post(`/api/groups/GroupMembers/${id}`, member);
      fetchMembers(id);  
    } catch (error) {
      setErrorMessage("can't add member");
    }
    setIsLoading(false);
  };

  const addGroupChargePoint = async (id, chargepoint) => {
    console.log(id);
    console.log(chargepoint);
    setIsLoading(true);
    const charegepointbeta = {
      chargerName: "ch20",
      location: "Benguerir",
      longitude: 54,
      latitude: 30,
      chargerModel: "chargerModel",
      chargerVendor: "chargerVendor",
      supportNumber: "12",
      address: "Benguerir_Marrakeck GEP",
    };
    try {
      await http.post(`/api/groups/Chargepoints/${id}`, chargepoint);
      fetchGroups();
    } catch (error) {
      console.log(error);
      setErrorMessage("can't add chargepoint");
    }
    setIsLoading(false);
  };
  return (
    <GroupsContext.Provider
      value={{
        groups,
        setGroup,
        isLoading,
        members,
        chargepoints,
        transactions,
        sessions,
        cordonates,
        statistics,
        reservations,
        group,
        addMember,
        addGroupChargePoint,
        deleteMember,
        fetChReservations,
        setGroups,
        getGroupById,
        fetchGroups,
        addGroup,
        fetchMembers,
        fetchStatistics,
        fetchChargePoints,
        fetchTransactions,
        fetchSessions,
        updateGroup,
        deleteGroup,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export default GroupsContext;
