import React, { useContext, useState } from "react";
import "./customHeader.scss";

// external components
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

// local components
import TextHeader from "../TextHeader/textHeader";
import DropDown from "../DropDown/dropDown";
import UserContext from "../../context/userContext";
import AuthContext from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const dropDownStyles = {
  visibility: "visible",
  opacity: "1",
};

function CustomHeader({ value }) {
  const [hover, setHover] = useState(false);
  const { logout, } = useContext(AuthContext);
  const navigate=useNavigate()

  const handleLogout = () => {
    // setIsAuth(false);
    // localStorage.setItem("jwt", "");
    logout()
    navigate('/auth')  
  };

  return ( 
    <header className="header">
      <TextHeader level="mid" value={value} />
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        className="profile-icon"
      >
        <FaUserAlt />
        <DropDown styles={hover ? dropDownStyles : {}} top="3rem">
          <span className="child">
            <AiOutlineUser className="icon" />
            Profile
          </span>
          <span className="child">
            <AiOutlineSetting className="icon" />
            Settings
          </span>
          <span className="child" onClick={handleLogout}>
            <BiLogOutCircle className="icon" />
            Logout
          </span>
        </DropDown>
      </div>
    </header>
  );
}

export default CustomHeader;
