

import * as XLSX from 'xlsx';

export const handleFileUpload = (files,setData,data,requiredProperties,addMany) => { 
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
          headerRow.reduce((obj, key, index) => (row[index]!==undefined && { ...obj, [key]: row[index] } ), {}) 
        );
        const validData = formattedData.filter((obj) => obj && isValidObject(obj,requiredProperties));
        //setColumns(headerRow.map((key) => ({ Header: key, accessor: key })));
        setData([...data,...validData])     
        //setData([...data,...formattedData]) 
        console.log('valid data isss :',validData)
        console.log('excel data isss :',formattedData)
        addMany(validData) 

        //console.log('columns data ',columns)  
      }
    };
    
    reader.readAsBinaryString(file);
  };

  const isValidObject = (dataObject,requiredProperties) => { 
    // Define the required properties that each object should have
    //const requiredProperties = ['_id','userId', 'chargerId', 'status','duration','location','totalKlwCharged','revenue','timestamp'];
  
    // Check if all required properties exist in the object 
    return requiredProperties.every((property) => dataObject.hasOwnProperty(property));
  };