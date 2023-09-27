import React, { useContext, useState } from "react";
import "./sign_in.scss";

// import external components
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

// import local components
import CustomInput from "../../components/CustomInput/customInput";
import CustomButton from "../../components/CustomButton/customButton";
import TextHeader from "../../components/TextHeader/textHeader";
import UserContext from "../../context/userContext";
import colors from "../../utils/colors";

// input custom styles
const inputStyles = {
  backgroundColor: "transparent",
  paddingLeft: "2rem",
  color: "white",
  border: "1px solid white",
};

// icon styles
const iconStyle = {
  position: "absolute",
  marginLeft: "0.5rem",
  marginTop: "0.8rem",
};

// eye icon styles
const eyeIconStyle = {
  position: "absolute",
  right: "0.8rem",
  marginTop: "0.8rem",
  cursor: "pointer",
};

// button custom styles
const btnStyles = {
  width: "100%",
  border: "1px solid white",
  backgroundColor: "white",
  color: "#AFC759",
};

// header custom styles
const headerStyles = {
  textAlign: "center",
};

function SignIn() {
  const [visible, SetVisibility] = useState(true);
  const { isAuth, signin, isLoading } = useContext(UserContext);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //if (isAuth) navigate("/");

  const handleClick = () => {
    SetVisibility(!visible);
  };

  const handleSubmit = () => {
    signin({
      email: data.email,
      password: data.password,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="sign-in-page">
      <form className="sign-in">
        <TextHeader level="mid" value="Log In" styles={headerStyles} />
        <CustomInput
          name="email"
          placeholder="Email"
          inputStyles={inputStyles}
          value={data.email}
          onChange={handleChange}
          noLabel
        >
          <AiOutlineMail style={iconStyle} />
        </CustomInput>
        <CustomInput
          name="password"
          placeholder="Password"
          inputStyles={inputStyles}
          noLabel
          pass={visible}
          value={data.password}
          onChange={handleChange}
        >
          <RiLockPasswordLine style={iconStyle} />
          {visible ? (
            <AiOutlineEyeInvisible style={eyeIconStyle} onClick={handleClick} />
          ) : (
            <AiOutlineEye style={eyeIconStyle} onClick={handleClick} />
          )}
        </CustomInput>

        {!isLoading ? (
          <CustomButton
            className="btn"
            value="Log in"
            onClick={handleSubmit}
            styles={btnStyles}
          />
        ) : (
          <div className="loader">
            <PulseLoader
              color={colors.mainColor}
              loading={true}
              size={12}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <Link to="/signup" className="forget-password">
          Forget Password?
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
