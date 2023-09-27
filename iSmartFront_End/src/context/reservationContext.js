import React, { createContext, useState } from 'react'

import http from '../utils/axiosConfig'
const ReservationContext=createContext();

export const ReservationProvider=({children}) =>{
const [reservations,setReservations]=useState([])
const [loading,setLoading]=useState(false)
const fetchReservations=async()=>{
    setLoading(true)
    try {
      const res=await http.get('api/reservations')  
      if(res.status==200){
        setReservations(res.data)
        console.log('get succefley all the reservations ',res.data)
      } 
    } catch (error) {
        console.log(error) 
    }
    setLoading(false)
}

  return (
    <ReservationContext.Provider
      value={{
        loading,
        reservations,
        fetchReservations
      }}
    >   
        { children }
    </ReservationContext.Provider>
  )
}

export default ReservationContext;