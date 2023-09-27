import React, { useContext, useState } from "react";
import "./Profile.scss";

// local component
import CustomInput from "../../components/CustomInput/customInput";
import UsersContext from "../../context/usersContext";
import CustomButton from "../CustomButton/customButton";

function Profile({ user, id, setUser }) {
  const [data, setData] = useState({
    fullName: user.name || "",
    email: user.email || "",
    RFID: user.RFID || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
  });
  const { updateUser } = useContext(UsersContext);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="general-detail">
      <div className="section">
        <CustomInput
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
        />
        <CustomInput
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <CustomInput
          label="RFID"
          name="RFID"
          value={data.RFID}
          onChange={handleChange}
        />
        <CustomInput
          label="Phone Number"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
        />
        <CustomInput
          label="Address"
          name="address"
          value={data.address}
          onChange={handleChange}
        />
        <div className="buttons">
          <CustomButton
            onClick={() => updateUser(id, data, setUser)}
            value="Save Changes"
          />
        </div>
      </div>
      <div className="section"></div>
    </div>
  );
}

export default Profile;
