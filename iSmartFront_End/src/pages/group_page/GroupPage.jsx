import React, { useContext, useEffect, useState } from "react";
import "./groupPage.scss";

// external components
import { Navigate, useParams } from "react-router-dom";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import SideBar from "../../components/SideBar/sideBar";
import Spinner from "../../components/Spinner/Spinner";
import GroupsContext from "../../context/groupsContext";
import SessionsContext from "../../context/sessionContext";
import  Details  from "./group_components/Details";
import  Sessions  from "./group_components/Sessions";
import  Members  from "./group_components/Members";
import  ChargePoits  from "./group_components/ChargePoits";
import  Transactions  from "./group_components/Transactions";
import  Reservations  from "./group_components/Reservations";
import  Insights  from "./group_components/Insights";
import AuthContext from "../../context/authContext";
 
 
const switchOptions = (active , id) => {
  switch (active) {
    case "Insight":
        return <Insights id ={id}/>
        case "Details":
          return <div className="page-container" >  <Details id = {id} /> </div>;
    case "Sessions":
      return <div className="page-container" > <Sessions id = {id}/></div>;
     case "Members":
      return <div className="page-container" > <Members id = {id}/> </div>;
    case "ChargePoints":
          return <div className="page-container" > <ChargePoits id = {id}/> </div>;
    case "Transactions":
      return <div className="page-container" > <Transactions id={id}/></div>;
    case "Reservations":
      return <div className="page-container" > <Reservations id = {id}/></div>;
    default:
      return <div>default</div>;
  }
};

function GroupPage() {
  const {
    fetchSessionsCount,
    fetchEnergyAndDuration,
  } = useContext(SessionsContext);
  const [active, setActive] = useState("Insight");
  const { isLoading, getGroupById,group, setGroup } = useContext(GroupsContext);
  const {user }=useContext(AuthContext)
  //const   user  =JSON.parse(localStorage.getItem('user'))
  
  const { id } = useParams();
  //console.log('the user rooooool isss ',user.role)
 
  useEffect(() => {
    fetchSessionsCount();
    fetchEnergyAndDuration();
    getGroupById(id);
  }, []);
  if(!user){
    return <Navigate to={'/auth'} />   
  }else{
  return      <div className="cntr">
      { user.role==="Superadmin"? <SideBar active="groups" />:'' }   
      { !isLoading && group ? (     
      <div className="page-cntr user-details" style={{width:user.role=="admin"?"100%":null}}> 
    
        <CustomHeader value={` ${group.companyName} / ${group.name}  `} />

        <OptionsNav
          options="Insight,Members,ChargePoints,Sessions,Transactions,Reservations,Details"
          active={active}
          setActive={setActive}
        />
          {switchOptions(active,  id)}
       
      </div>): (
      <div style={{height:"100vh" , width:"100%"}}>
        <Spinner />
      </div>
    )} 
    </div> 
    } 
}
 
export default GroupPage;

