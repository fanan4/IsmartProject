import React, { useState, useEffect, useContext } from "react";
import "./charge_points.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import TableContainer from "../../components/TableContainer/tableContainer";
import NewStation from "../../components/NewStation/newStation";
import ChargePointsContext from "../../context/chargePointsContext";
import { handleFileUpload } from "../../utils/import";   
import Dropzone from 'react-dropzone';    
// external components

const tableHeader = {
  _id: "Charger Id",
  chargerName: "Charger Name",
  location: "Charger Location",
  status: "Status",
  chargerModel: "Charger Model",
  supportNumber: "Support Number",
};

function ChargePoints() {
  const [popup, setPopup] = useState(false);   
  const [data,setData]=useState([]);  
  const [active,setActive]=useState('All');  
  const [dataSearch,setDataSearch]=useState([])
  const { chargePoints, fetchChargePoints, deleteChargePoint ,getChargePointByStatus,addManyChargePoints } =
    useContext(ChargePointsContext);

  useEffect(() => {
    //console.log('hello in use effect ')
    if(chargePoints.length===0){
      fetchChargePoints(); 
    }
    changeData(active) 
    setDataSearch(chargePoints) 
  }, [chargePoints]);  
  const changeData=(status)=>{
    console.log('hello in change Data active is :',status)
      switch(status){
         case  'All':
            setData(chargePoints) 
            setDataSearch(chargePoints) 
           break;
          case 'Charging':
            setData(getChargePointByStatus('charging'))
            setDataSearch(getChargePointByStatus('charging')) 
             break;
          case 'Available':
            setData( getChargePointByStatus('available'))
            setDataSearch(getChargePointByStatus('available'))  
              break;
          case  'Offline':
            setData(getChargePointByStatus('offline')) 
            setDataSearch(getChargePointByStatus('offline')) 
              break;
              }
  }
  const onChange=(e)=>{
    const value=e.target.value 
    const NewData=dataSearch.filter(ch=>ch.chargerName.includes(value)  || ch.status.includes(value)  || ch.location.includes(value))
    setData(NewData)  
    if(value==='' || value.includes(' ')) setData(dataSearch)          
  }
  const requiredProperties = ['chargerName','location', 'connectors', 'longitude','latitude','chargerModel','chargerVendor','supportNumber','address'];
  const ImportBtn= <Dropzone onDrop={(f)=>handleFileUpload(f,setData,data,requiredProperties,addManyChargePoints)}>  
     {({ getRootProps, getInputProps }) => (
       <div className="dropzone" {...getRootProps()}>
         <input {...getInputProps()} />
         <p>Drag & drop an Excel file </p>
       </div>  
  )}  
</Dropzone>  

  return (
    <div className="cntr">
      <SideBar active="charge-points" /> 
      <div className="page-cntr">
        <CustomHeader value="Charge Points" />
        <div className="charge-points">
          <OptionsNav 
              options="All,Charging,Available,Offline"
              active={active}
              setActive={setActive}
              onClick={changeData}
              />
          {
            
            <TableContainer 
             data={[tableHeader, ...data]} 
             width="975px"
             pupup={popup}
             setPopup={setPopup}
             buttonValue="Add Station"
             onClickDelete={(id) => deleteChargePoint(id)}
             detailsRoute="charge-points"
             onChange={onChange} 
             ImporData={ImportBtn}
          />
          }
        </div>
      </div>
      {popup ? <NewStation popup={popup} setPopup={setPopup} /> : null}   
    </div>
  );
}

export default ChargePoints;
