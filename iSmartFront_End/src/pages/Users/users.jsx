import React, { useState, useContext, useEffect } from "react";
import "./users.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import TableContainer from "../../components/TableContainer/tableContainer";
import NewUser from "../../components/NewUser/NewUser";
import UsersContext from "../../context/usersContext";
import Dropzone from 'react-dropzone';
import { handleFileUpload } from "../../utils/import";
const tableHeader = {
  _id: "User Id",
  name: "User Name",
  email: "User Email",
  RFID: "User RFID",
  phoneNumber: "Phone Number",
};

function Users() {
  const [popup, setPopup] = useState(false);
  const [data,setData]=useState([]); 
  const [dataSearch,setDataSearch]=useState([]); 
  const [active,setActive]=useState(false);  
  const excludedKeys='role'
  const { users, deleteUser,fetchUsers,getUserByRole,add,addManyUsers } = useContext(UsersContext);      
    useEffect(()=>{
      if(users.length===0){  
        fetchUsers()
      }
       changeData('All')
    },[users])
  const changeData=(status)=>{
    switch(status){
      case 'All':  
          setData(users)  
          setDataSearch(users) 
         break;
       case 'Super Admins':
          const superAdmins=getUserByRole('Superadmin')
           setData(superAdmins)
           setDataSearch(superAdmins)
         break;
       case 'Admins': 
         const admins=getUserByRole('admin')
            setData(admins) 
            setDataSearch(admins)   
         break;  
      case 'Clients': 
         const clients=getUserByRole('client')  
            setData(clients) 
            setDataSearch(clients)  
         break;    
         case 'Members': 
         const Members=getUserByRole('member')  
            setData(Members) 
            setDataSearch(Members)   
         break;    
    }
  } 
  

    const onChange=(e)=>{
      const value=e.target.value 
      const NewData=dataSearch.filter(u=>u.name.includes(value) || u.email.includes(value) || u.RFID.includes(value)) 
      setData(NewData) 
      if(value==='' || e.includes(' ')) setData(dataSearch)     
    }
    const requiredProperties = ['name','email', 'password', 'RFID','phoneNumber','role']; 
    const ImportBtn= <Dropzone onDrop={(f)=>handleFileUpload(f,setData,data,requiredProperties,addManyUsers)}>  
       {({ getRootProps, getInputProps }) => (
           <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag & drop an Excel file </p>
            </div>  
     )}  
     </Dropzone>      
  return (
    <div className="cntr">
      <SideBar active="users" />
      <div className="page-cntr">
        <CustomHeader value="Users" />
        <div className="charge-points">
          <OptionsNav options="All,Super Admins,Admins,Clients,Members" active={active} setActive={setActive} onClick={changeData}/>
          <TableContainer
            data={[tableHeader, ...data]}
            width="100%"
            pupup={popup}
            setPopup={setPopup}
            buttonValue="Add User"
            onClickDelete={deleteUser}
            detailsRoute="users"
            onChange={onChange} 
            excludedKeys={excludedKeys}
            ImporData={ImportBtn}
          />
        </div>
      </div>
      {popup ? <NewUser popup={popup} setPopup={setPopup} /> : null}
    </div>
  );
}

export default Users;
