import React, { useContext, useState, useEffect } from "react";
import "./sessions.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import Layer from "../../components/Layer/layer";
import TextHeader from "../../components/TextHeader/textHeader";
import * as XLSX from 'xlsx';
import SessionsTable from "../../components/SessionsTable/SessionsTable";
import SessionsContext from "../../context/sessionContext";
import Dropzone from 'react-dropzone'; 
import { exportToExcel } from "../../utils/exportData"; 

function Sessions() {
  const [popup, setPopup] = useState(false);
  const [active,setActive]=useState('All Sessions')   
  const [data,setData]=useState([])
  const [dataSearch,setDataSearch]=useState([])  
  const [ExcelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]); 
  const {  sessions ,fetchSessions,getSessionsByStatus }=useContext(SessionsContext)
  useEffect(()=>{
    if(sessions.length===0){
      fetchSessions(); 
      console.log('sessions areeee :',sessions)
    }
    changeData('All Sessions')  
  },[sessions]) 
  const changeData=(Status)=>{
    console.log('hello in change data in session sisssions areee ',sessions)
    switch(Status){
      case 'All Sessions': 
          setData(sessions)  
          setDataSearch(sessions)
         break;
       case 'Active sessions':
          const activeSessions=getSessionsByStatus('active')
           setData(activeSessions)
           setDataSearch(activeSessions)
         break;
       case 'Finiched Sessions': 
         const compeletedSessions=getSessionsByStatus('completed')
            setData(compeletedSessions) 
            setDataSearch(compeletedSessions) 
         break;  
    }
}

const isValidObject = (dataObject) => {
  // Define the required properties that each object should have
  const requiredProperties = ['_id','userId', 'chargerId', 'status','duration','location','totalKlwCharged','revenue','timestamp'];

  // Check if all required properties exist in the object 
  return requiredProperties.every((property) => dataObject.hasOwnProperty(property));
};

  
const handleFileUpload = (files) => {
  const file = files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const binaryData = e.target.result;
    const workbook = XLSX.read(binaryData, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    if (parsedData.length > 0) {
      const headerRow = parsedData[0];
      const formattedData = parsedData.slice(1).map((row) =>
        headerRow.reduce((obj, key, index) => ({ ...obj, [key]: row[index] }), {})
      );
      const validData = formattedData.filter((obj) => isValidObject(obj));
      setColumns(headerRow.map((key) => ({ Header: key, accessor: key })));
      setExcelData(validData); 
      setData([...data,validData[0]])    
      //setData([...data,...formattedData]) 
      console.log('valid data isss :',validData)
      console.log('excel data isss :',formattedData)
      console.log('columns data ',columns)  
    }
  };
  
  reader.readAsBinaryString(file);
};





  return (
    <div className="cntr">
      <SideBar active="sessions" />
      <div className="page-cntr">
        <CustomHeader value="Sessions" />
        <div className="charge-points">
          <OptionsNav
            options="All Sessions,Active sessions,Finiched Sessions"
            active={active}
            setActive={setActive}
            onClick={changeData} 
    
          />
          <SessionsTable
              popup={popup} 
              setPopup={setPopup}
              active={active}
              setActive={setActive} 
              changeData={changeData}  
              data={data}
              setData={setData} 
              dataSearch={dataSearch} 
              onClick={exportToExcel} 
             /> 
        </div>
      </div>
      {popup ? (
        <Layer onClick={() =>{
          exportToExcel() 
          setPopup(false) 
        } }>
          {/* <TextHeader level="small" value="Export as Excel" /> */}
          {/* {<Dropzone onDrop={handleFileUpload}> 
          {({ getRootProps, getInputProps }) => (
             <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag & drop an Excel file here or click to select</p>
             </div> 
        )}
      </Dropzone> }      */}   

        </Layer>
      ) : null}
    </div>
  );
}

export default Sessions;
