import React, { useContext, useState } from "react";
import "./sign_up.scss";

// import external components
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";

// import local components
import CustomInput from "../../components/CustomInput/customInput";
import CustomButton from "../../components/CustomButton/customButton";
import TextHeader from "../../components/TextHeader/textHeader";
import userContext from "../../context/userContext";
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

function SingUp() {
  const [password, setPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isAuth, signup, isLoading } = useContext(userContext);
  const navigate = useNavigate();

  if (isAuth) navigate("/");

  const handlePassword = (e) => {
    setPassword(!password);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(!confirmPassword);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword,
      role: "user",
    });
  };

  return (
    <div className="sign-up-page">
      <form className="sign-up">
        <TextHeader level="mid" value="Sign up" styles={headerStyles} />

        <CustomInput
          name="name"
          placeholder="Full Name"
          inputStyles={inputStyles}
          value={data.name}
          onChange={handleChange}
          noLabel
        >
          <AiOutlineUser style={iconStyle} />
        </CustomInput>

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
          value={data.password}
          onChange={handleChange}
          noLabel
          pass={password}
        >
          <RiLockPasswordLine style={iconStyle} />
          {password ? (
            <AiOutlineEyeInvisible
              style={eyeIconStyle}
              onClick={handlePassword}
            />
          ) : (
            <AiOutlineEye style={eyeIconStyle} onClick={handlePassword} />
          )}
        </CustomInput>

        <CustomInput
          name="confirmPassword"
          placeholder="Password Confirm"
          inputStyles={inputStyles}
          value={data.confirmPassword}
          onChange={handleChange}
          noLabel
          pass={confirmPassword}
        >
          <RiLockPasswordLine style={iconStyle} />
          {confirmPassword ? (
            <AiOutlineEyeInvisible
              style={eyeIconStyle}
              onClick={handleConfirmPassword}
            />
          ) : (
            <AiOutlineEye
              style={eyeIconStyle}
              onClick={handleConfirmPassword}
            />
          )}
        </CustomInput>

        {!isLoading ? (
          <CustomButton
            value="Sign up"
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

        <Link to="/login" className="sign-in-instead">
          Sign in instead
        </Link>
      </form>
    </div>
  );
}

export default SingUp;
