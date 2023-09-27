import React, { createContext, useState } from "react";
import http from "../utils/axiosConfig";
import { yearsFrom2020 } from "../utils/formatTimeAndDate";
import { useError } from "./errorContext";

const GlobalGraphContext = createContext();
const { setErrorMessage } = useError();

export const GlobalGraphProvider = ({ children }) => {
  // General graph-related state and functions
  const now = new Date();
  const currentYear = now.getFullYear();
  const [datatypeindex, setDatatypeindex] = useState(0);
  const [data, setData] = useState([]);
  // ... (other graph-related states and functions)
  const [timeobject, setTimeobject] = useState({
    year: currentYear,
    month: -1,
    day: -1,
  });
  const list = [
    { value: "transactions", counting: 1, label: "transactions", color: "c-3" },
    { value: "sessions", label: "sessions", counting: 1, color: "c-1" },
    {
      value: "transactions",
      label: "Energy",
      counting: "$klwCharged",
      color: "c-4",
    },
  ];
  // Charge points related state and functions
  const [chargePoints, setChargePoints] = useState([]);
  // ... (other charge points related states and functions)

  const years = yearsFrom2020();
  const onSelectDate = async (value, time) => {
    switch (time) {
      case "y":
        setTimeobject((old) => {
          old.year = value;
          reFetch(list[datatypeindex].value, old);
          console.log(old);
          return old;
        });
        break;
      case "m":
        setTimeobject((old) => {
          old.month = value;
          reFetch(list[datatypeindex].value, old);
          return old;
        });
        console.log("normaly it should refrech");
        console.log(data);
        break;
      case "d":
        setTimeobject((old) => {
          old.day = value;
          reFetch(list[datatypeindex].value, old);
          return old;
        });
        break;

      default:
        break;
    }
  };
  // General fetch data function
  const fetchData = async (url, datatypeindex) => {
    try {
      const res = await http.get(url, {
        params: {
          ...timeobject,
          type: list[datatypeindex],
          time: true,
        },
      });
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      setErrorMessage("   can't fetch data  :  Network Error ");
    }

    // ... (your existing fetch data logic)
  };

  // General re-fetch function
  const reFetch = async (type, time) => {
    // ... (your existing re-fetch logic)
  };

  // ... (other general functions)

  return (
    <GlobalGraphContext.Provider
      value={{
        // General graph-related states and functions
        data,
        datatypeindex,
        currentYear,
        years,
        fetchData,
        reFetch,
        // Charge points related states and functions
        chargePoints,
        setChargePoints,
        // ... (other states and functions)
      }}
    >
      {children}
    </GlobalGraphContext.Provider>
  );
};

export default GlobalGraphContext;
