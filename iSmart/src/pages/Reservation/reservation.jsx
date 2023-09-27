import React, { useContext, useEffect, useState } from "react";
import "./reservation.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import TableContainer from "../../components/TableContainer/tableContainer";
import NewStation from "../../components/NewStation/newStation";
import testData from "../../data/reservation.json";
import Layer from "../../components/Layer/layer";
import TextHeader from "../../components/TextHeader/textHeader";
import ReservationContext from "../../context/reservationContext";
import { exportToExcel } from "../../utils/exportData";   

// external components

// const testData = JSON.stringify("");

function Reservation() {
  const [popup, setPopup] = useState(false);
  const { loading, reservations,fetchReservations }=useContext( ReservationContext )
  useEffect(()=>{
      fetchReservations()
  },[])

  return (
    <div className="cntr">
      <SideBar active="reservation" />
      <div className="page-cntr">
        <CustomHeader value="Reservation" />
        <div className="charge-points">
          <OptionsNav options="all" active="all" />
          <TableContainer
            data={reservations }
            width="125%"
            pupup={popup}
            setPopup={setPopup}
            buttonValue="Export"
            dateFilter
            remove
            onClick={exportToExcel} 
            ImporData={null}
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

export default Reservation;
