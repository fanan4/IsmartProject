import React, { useState, useContext } from "react";
import "./NewUser.scss";

// local components
import CustomInput from "../CustomInput/customInput";
import Layer from "../Layer/layer";
import TextHeader from "../TextHeader/textHeader";
import CustomButton from "../CustomButton/customButton";
import { HiUserPlus,HiUserGroup,HiUser,HiArrowDownCircle } from "react-icons/hi2"  
import { FaUserCircle } from 'react-icons/fa'; 
import UsersContext from "../../context/usersContext";
import AuthContext from "../../context/authContext";

const cancelStyles = {
  backgroundColor: "white",
  color: "#777777",
  border: "1px solid #777777",
};


function NewUser({   setPopup }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    RFID: "",
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [showMenu,setShowMenu]=useState(false)
  const { addUser, isLoading } = useContext(UsersContext); 

  const options = [
    { value: 'superadmin', label: 'SuperAdmin', icon: <FaUserCircle  /> },
    { value: 'client', label: 'Client', icon: <HiUserGroup /> }, 
  ];
 
  const handleChange = (e) => {
    // e.preventDefault();
    console.log('eeeeee is: ',e)
    const name = e.target.name;
    const value = e.target.value;
    console.log('name is :',name,' value is :',value)
    setData({ ...data, [name]: value })
  };

  const handleOptionChange = (option) => {
    console.log('handled option change with option :',option)
    setSelectedOption(option); 
    setShowMenu(!showMenu)   
  };

  const AddUserEvent=()=>{
      if(selectedOption==='') alert('you need to select a role !');
      else{
        data.role=selectedOption 
        console.log('the selecteeeeeeeeeeeeeed option is:::::',selectedOption)
        console.log('the user to be added is :',data)
        addUser(data)
    }
  }

  return (
    <Layer
      onClick={(e) => {
        setPopup(false);
      }}
    >
      <form className="new-station" onClick={(e) => e.stopPropagation()}>
        <TextHeader
          level="small"
          value="Add New User"
          styles={{ marginBottom: "0.8rem" }}
          onChange={handleChange}
        />
        <CustomInput
          name="name"
          label="Full Name"
          value={data.name}
          onChange={handleChange}
        />
        <CustomInput
          name="email"
          label="Gmail"
           value={data.email}
          onChange={handleChange}
        />
        <div className="role-options"  style={{marginTop:'5px'}}> 
             <div 
                className="SelectBtn"
                style={{ padding:'5px',width:'40%',borderRadius:'5px',fontSize:'16px',fontWeight:'500',border:'1px solid #040233',boxShadow:'0px 0px 8px #b3b3b5',display:'flex',alignItems:'center',justifyContent:'start',  }}
                onClick={()=>setShowMenu(!showMenu)}
             >
                 Select a role  <span style={{fontSize:'25px',paddingTop:'10px',marginLeft:'10px'}}><HiArrowDownCircle/></span>
              </div> 
               {
                showMenu? <div style={{backgroundColor:'white',marginTop:'2px',boxShadow:'0px 0px 8px #b3b3b5', padding:'5px',width:'50%',position:'absolute',zIndex:'10' }}>
                   {options.map((option) => (
                  <div className="roleOption" key={option.value} value={option.value}  onClick={()=>handleOptionChange(option.value)} style={{padding:'5px', fontSize:'16px' }}>
                   {option.icon}   {option.label}  

                  </div>  
                ))} 
             </div>:null
               }

        </div>
        <CustomInput
          name="phoneNumber"
          label="Phone Number"
          value={data.phoneNumber}
          onChange={handleChange}
        />
        <CustomInput
          name="password"
          label="Password"
          value={data.password}
          onChange={handleChange}
        />

        <CustomInput
          name="RFID"
          label="RFID"
          value={data.RFID}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton
            value="Cancel"
            styles={cancelStyles}
            onClick={() => setPopup(false)}
          />
          <CustomButton
            value="Add"
            onClick={() => {
              AddUserEvent(); 
              setPopup(false);
            }}
          />
        </div>
      </form>
    </Layer>
  );
}

export default NewUser;
