import React, { useState, useContext, useEffect } from "react";
import "./Groups.scss";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import SideBar from "../../components/SideBar/sideBar"; 
import TableContainer from "../../components/TableContainer/tableContainer";
import GroupsContext from "../../context/groupsContext";
import NewGroup from "../../components/NewGroup/NewGroup";

const tableHeader = {
  _id: "Group Id",
  name: "Group Name",
  companyName :"Company Name" , 
  contactEmail: "contactEmail",
  members: "Members",
  chargePoints: "Charge Points",
  numberOfAdmins: "Admins",
}; 

/*
        _id: group._id,
         name: group.name,
         companyName:group.companyName,
         contactEmail:group.contactEmail,
         members:group.members && group.members.length,
         chargePoints: group.chargePoints && group.chargePoints.length,
         numberOfAdmins:group.admins && group.admins.length,
*/

function Groups() {
  
  const [popup, setPopup] = useState(false);
  const [data,setData]=useState([])
  const [dataSearch,setDataSearch]=useState([])
  const { groups, fetchGroups ,deleteGroup } = useContext(GroupsContext);
  useEffect
  (() => {
     if(groups.length===0){
       fetchGroups();
     }
     setData(groups)
     setDataSearch(groups)  
           
  }, [groups]);
  const onChange=(e)=>{
    const value=e.target.value
    const NewData=dataSearch.filter( s=>s.name.includes(value)  || s.contactEmail.includes(value)) 
    setData(NewData)  
    if(value==='' || value.includes(' ')) setData(dataSearch)                                 
  }
  return (
    <div className="cntr">
      <SideBar active="groups" />
      <div className="page-cntr">
        <CustomHeader value="Groups" />
        <div className="charge-points">
           <TableContainer
              data={[tableHeader, ...data]}     
              width="100%"
              pupup={popup}
              setPopup={setPopup}
              buttonValue="Add Group"
              onClickDelete={deleteGroup}
              detailsRoute="groups"
              onChange={onChange}
              ImporData={null}
          />
        </div>
      </div>
      {popup ? <NewGroup   setPopup={setPopup} /> : null}
    </div>
  );
}

export default Groups;
