import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";
import { yearsFrom2020 } from "../utils/formatTimeAndDate";
import { useError } from "./errorContext";
// import GlobalContext from "./globalContext";
const ChargePointsGraphContext = createContext();
export const ChargePointsGraphProvider = ({ children }) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const [datatypeindex, setDatatypeindex] = useState(0);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const { setErrorMessage } = useError();
  const [dataOfCharePoint, setDataOfChargePoint] = useState([]);
  const [timeobject, setTimeobject] = useState({
    year: currentYear,
    month: -1,
    day: -1,
  });
  const fetchByChargePoint = async (type, id) => {
    try {
      console.log("this is the id " + id);
      const res = await http.get("/api/chargePoints/chartStats/" + id, {
        params: {
          ...timeobject,
          type,
          time: true,
        },
      });
      setDataOfChargePoint(res.data.data);

      console.log(res.data.data);
    } catch (error) {
      setErrorMessage("can't fetch stats");
    }
  };
  const list = [
    { value: "transactions", counting: 1, label: "transactions", color: "c-3" },
    { value: "sessions", label: "sessions", counting: 1, color: "c-1" },
  ];
  const years = yearsFrom2020();
  const reFetchByChargePoint = async (type, time, id) => {
    console.log("ites refetching ");
    try {
      const res = await http.get("/api/chargePoints/chartStats/" + id, {
        params: {
          ...time,
          type,
          time: true,
        },
      });
      setDataOfChargePoint(res.data.data);
      console.log("normaly it should refresh here ");
      console.log(res.data.data);
    } catch (error) {
      setError(error);
    }
  };

  const onSelectDate = async (value, time, id) => {
    console.log("changing date to " + time);
    switch (time) {
      case "y":
        setTimeobject((old) => {
          old.year = value;
          reFetchByChargePoint(list[datatypeindex].value, old, id);
          console.log(old);
          return old;
        });
        break;
      case "m":
        setTimeobject((old) => {
          old.month = value;
          reFetchByChargePoint(list[datatypeindex].value, old, id);
          return old;
        });

        break;
      case "d":
        setTimeobject((old) => {
          old.day = value;
          reFetchByChargePoint(list[datatypeindex].value, old, id);
          return old;
        });
        break;

      default:
        break;
    }
  };

  return (
    <ChargePointsGraphContext.Provider
      value={{
        datatypeindex,
        currentYear,
        error,
        list,
        years,
        timeobject,
        dataOfCharePoint,
        fetchByChargePoint,
        onSelectDate,
      }}
    >
      {children}
    </ChargePointsGraphContext.Provider>
  );
};

export default ChargePointsGraphContext;
