import React, { useState, useContext } from "react";
import "./newGroup.scss";

// local components
import CustomInput from "../CustomInput/customInput";
import Layer from "../Layer/layer";
import TextHeader from "../TextHeader/textHeader";
import CustomButton from "../CustomButton/customButton";
import UsersContext from "../../context/usersContext";
import GroupsContext from "../../context/groupsContext";

const cancelStyles = {
  backgroundColor: "white",
  color: "#777777",
  
};

function NewGroup({   setPopup }) {
 
  const [data, setData] = useState({
    name: "",
    contactEmail: "",
    financialEmail :"", 
    companyName : "" ,
    addressInformation:{ 
    address:"", 
    zip:"" , 
    city:"", 
    country : ""},
    phoneNumber: "",
  });
  const { addGroup, isLoading } = useContext(GroupsContext);
  const [page , setPage ] = useState(0) 
  const next=()=>{
    setPage(old => old + 1)
  }
  const  back = ()=>{
    setPage(old=> old -1 )
  }
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
const pages = [
    [ <CustomInput
        name="name"
        label="Group Name"
        value={data.name}
        onChange={handleChange}
      /> ,
      <CustomInput
        name="contactEmail"
        label="email"
        value={data.contactEmail}
        onChange={handleChange}
      />,
        <CustomInput
        name="financialEmail"
        label="financial mail"
        value={data.financialEmail}
        onChange={handleChange}
      /> , <CustomInput
      name="phoneNumber"
      label="Phone Number"
      value={data.phoneNumber}
      onChange={handleChange}
    /> ,
      <div className="buttons">
    <CustomButton
      value="next"
      onClick={next}
    />
  </div>
    ] ,  [
         <CustomInput
        name="companyName"
        label="Company Name"
        value={data.companyName}
        onChange={handleChange}
      /> ,
      <CustomInput
        name="adress"
        label="adress"
        value={data.addressInformation.address}
        onChange={(e)=>{e.preventDefault(); setData((old)=>{old.addressInformation.address = e.target.value ; console.log(old);return {...old} })}}
      />,
        <CustomInput
        name="city"
        label="city"
        value={data.addressInformation.city}
        onChange={(e)=>{e.preventDefault(); setData((old)=>{old.addressInformation.city = e.target.value ; return {...old} })}}
      /> ,
      <CustomInput
      name="zip"
      label="zip code "
      value={data.addressInformation.zip}
        onChange={(e)=>{e.preventDefault(); setData((old)=>{old.addressInformation.zip = e.target.value ; return {...old} })}}
      /> ,
      <CustomInput
      name="country"
      label="coutry "
      value={data.addressInformation.country}
        onChange={(e)=>{e.preventDefault(); setData((old)=>{old.addressInformation.country = e.target.value ; return {...old} })}}
      /> 
      
    ,   <div className="buttons">
    <CustomButton
      value="back"
      styles={cancelStyles}
      onClick={back}
    />
      <CustomButton
            value="Add"
            onClick={() => {
              addGroup(data);
              setPopup(false)
            }}
          />
  </div>
    ]

]
  return (
    <Layer
      onClick={(e) => {
        setPopup(false);
      }}
    >
      <form className="new-station" onClick={(e) => e.stopPropagation()}>
        <TextHeader
          level="small"
          value="Add new Group"
          styles={{ marginBottom: "0.8rem" }}
          onChange={handleChange}
        />
       
       {pages[page]}
       
      </form>
    </Layer>
  );
}

export default NewGroup;
