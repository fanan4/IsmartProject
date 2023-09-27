import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";
import { yearsFrom2020 } from "../utils/formatTimeAndDate";
// import GlobalContext from "./globalContext";
const graphContext = createContext();
export const GraphProvider = ({ children }) => {
    const now = new Date()
    const currentYear = now.getFullYear() 
    const [datatypeindex, setDatatypeindex] = useState(0);
    const [data, setData] = useState([]);
  //  const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]); 
    const [timeobject, setTimeobject] = useState({   
        year: currentYear,
        month: -1,
        day:-1,
      });
    const list  = [
        { value: "transactions", counting : 1 , label:"transactions" , color: "c-3" },
        { value: "sessions",label : "sessions" , counting : 1 ,   color: "c-1" },
        {value : "transactions" , label:"Energy" ,  counting :"$klwCharged" ,color: "c-4"}
         ];
         const years = yearsFrom2020();
         const fetchData = async () => {
    
          try {
            const res = await http.get("api/" + list[datatypeindex].value, {
              params: {
                ...timeobject,
                time: true ,
              },
            });
                console.log('data isss : ',res.data.data);
            setData(res.data.data);
          } catch (error) {
            setError(error);
          }
   
        };
        useEffect(() => { 
        fetchData();
      }, []);
  

      const onSelectDate = async (value, time) => {
        switch (time) {
          case "y":
            setTimeobject((old) => {
              old.year = value;
               reFetch(  list[datatypeindex].value, old);
              console.log(old);
              return old;
            });
            break;
          case "m":
            setTimeobject((old) => {
              old.month =  value ;
              reFetch(  list[datatypeindex].value, old);
              return old;
            });
            console.log("normaly it should refrech");
            console.log(data);
            break;
          case "d":
            setTimeobject((old) => {
              old.day = value;
              reFetch(  list[datatypeindex].value, old);
              return old;
            });
            break;
    
          default:
            break;
        }
      };
    
 
      const reFetch = async (type, time) => {
   
        try {
          const res = await http.get("api/" + type, 
         {  params: {
            ...time,
            time: true ,
          }},);
          setData(res.data.data);
        } catch (error) {
          setError(error);
        }
 
      };
 
      const handelChangeData = (index)=>{
        setDatatypeindex(index)
        reFetch( 
          list[index].value,
         timeobject)
      }
  return (
    <graphContext.Provider
      value={{
        data,
        list,
        datatypeindex ,
        currentYear,
        
        error,
        years,
        timeobject,
        onSelectDate,
        handelChangeData,
        setTimeobject,
        reFetch,
      }}
    >
      {children}
    </graphContext.Provider>
  );
};

export default graphContext;
