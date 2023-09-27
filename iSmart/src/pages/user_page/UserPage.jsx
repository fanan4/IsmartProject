import React, { useContext, useEffect, useState } from "react";
import "./UserPage.scss";

// external components
import { useParams } from "react-router-dom";

// local components
import CustomHeader from "../../components/CustomHeader/customHeader";
import OptionsNav from "../../components/OptionsNav/optionsNav";
import SideBar from "../../components/SideBar/sideBar";
import Spinner from "../../components/Spinner/Spinner";
import UsersContext from "../../context/usersContext";
import Profile from "../../components/Profile/Profile";
import AuthContext from "../../context/authContext";

const switchOptions = (active, user, setUser, id) => {
  switch (active) {
    case "Profile":
      return <Profile user={user} id={id} setUser={setUser} />;
    case "Sessions":
      return <div className="detail">Sessions</div>;
    case "Transactions":
      return <div className="detail">Transactions</div>;
    case "Reservations":
      return <div className="detail">Reservations</div>;
    default:
      return <div>default</div>;
  }
};

function UserPage() {
  const [User, setUser] = useState(null);
  const [active, setActive] = useState("Profile");
  const { isLoading, getUserById } = useContext(UsersContext);
  const { user,isAuthenticated }=useContext( AuthContext )
  const { id } = useParams();

  useEffect(() => {
    getUserById(id, setUser);
  }, []);

  return (
    <div className="cntr" >    
      {user.role=='Superadmin'?<SideBar active="users" />:null } 
      <div className="page-cntr user-details" style={{width:user.role=="admin"?"100%":null}}>
        <CustomHeader value="User Details" />
        <OptionsNav
          options="Profile,Sessions,Transactions,Reservations"
          active={active}
          setActive={setActive}
        />
        {!isLoading && User ? (
          switchOptions(active, User, setUser, id)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default UserPage;
