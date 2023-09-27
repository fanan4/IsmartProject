import { useContext, useEffect, useState } from "react";

import UsersContext from "../../../context/usersContext";
import NewGroupMember from "../../../components/NewGroupMember/NewGroupMember";
import TableContainer from "../../../components/TableContainer/tableContainer";
import GroupsContext from "../../../context/groupsContext";
export default   ({id})=>{
    const {members ,fetchMembers,deleteMember } = useContext(GroupsContext)
    useEffect(()=>{
      if(members.length===0){
        fetchMembers(id)
      }
      setData(members)
      setDataSearch(members) 
    },[members])
    const tableHeader = {
      _id: "Member Id",
      name: "Member Name",
      email: "Member Email",
      RFID: "Member RFID",
      phoneNumber: "Phone Number",
      role: "Member Role"
    };
     
  
    const [popup, setPopup] = useState(false);
    const [data,setData]=useState([])
    const [dataSearch,setDataSearch]=useState([])  
    const { users, deleteUser } = useContext(UsersContext);


    const onChange=(e)=>{
      const value=e.target.value
      console.log('hello from user search the value to search is : ',e) 
      const NewData=dataSearch.filter(u=>u.name.includes(value) || u.email.includes(value) || u.RFID.includes(value)) 
      setData(NewData) 
      if(value==='' || value.includes(' ')) setData(dataSearch)     
    }
  const deleteMemberEvent=(MemberId)=>{
    deleteUser(MemberId)
    fetchMembers(id)  
  }

   return (
    <div  > 
         
        
     
      {popup ? <NewGroupMember popup={popup} id = {id} setPopup={setPopup} /> :  <TableContainer
            data={[tableHeader, ...data]}
            width="100%"
            pupup={popup}
            setPopup={setPopup}
            buttonValue="Add User"
            onClickDelete={deleteMemberEvent}  
            detailsRoute="users"
            onChange={onChange}
            ImporData={null}
          />}
    </div>
  );
   }