import { useContext, useEffect, useState } from "react";

import GroupsContext from "../../../context/groupsContext";
import CustomInput from "../../../components/CustomInput/customInput";
import CustomButton from "../../../components/CustomButton/customButton";

export default    (  {id})=>{
    const { group ,updateGroup,setGroup } = useContext(GroupsContext)
   
    const handleChange = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      setGroup({ ...group, [name]: value });
    };
   /*
   *_id: "64d518bb32c7d5c397f36fd6"
  addressInformation: Object { address: "hay Essalam El Jadid 975 Bis", zip: " 975 Bis", city: "Ouarzazate", … }
  *_id: "64d518bb32c7d5c397f36fd7"​​
  address: "hay Essalam El Jadid 975 Bis"​​
  city: "Ouarzazate"​​
  country: "Maroc"​​
  zip: " 975 Bis"​​
  <prototype>: Object { … }​
  *companyName: "DigitalFan"​
  *contactEmail: "abdelouhfanan@gmail.com"​
  *financialEmail: "abdeouahedfanan@gmail.com"​
  *name: "abdelouahedGroup"
   */
    return <div className="gourp-details-container">
    {console.log(group)}
    <form className="group-form" onClick={(e) => e.stopPropagation()}>
    <div className="group-details">
  
    <div  className="left">
    
        <CustomInput
           name="name"
           label="Charger Name"
           value={group.name}
           onChange={handleChange}
           />
  
        <CustomInput
           name="companyName"
           label="companyName "
           value={group.companyName}
           onChange={handleChange}
           />
         <CustomInput
           name="contactEmail"
           label="contactEmail "
           value={group.contactEmail}
           onChange={handleChange}
           />
    
    
         <CustomInput
           name="financialEmail"
           label="financialEmail"
           value={group.financialEmail}
           onChange={handleChange}
           />
           
    </div>
    <div  className="right">
    
          <CustomInput
           name="city"
           label="city"
           value={group.addressInformation.city}
           onChange={handleChange}
           />
           <CustomInput
             name="country"
             label="country"
             value={group.addressInformation.country}
             onChange={handleChange}
             />
             <CustomInput
               name="address"
               label="address  "
               value={group.addressInformation.address}
               onChange={handleChange}
               />
    
    <CustomInput
               name="zip"
               label="zip  "
               value={group.addressInformation.zip}
               onChange={handleChange}
               />
    
        
        
    </div>
       
         
    </div>
    <div className="buttons">
             
    <CustomButton
      value="update"
      onClick={() => {
        updateGroup(id,group);
      }}
    />
    </div>
       </form>
    
         </div>
   }