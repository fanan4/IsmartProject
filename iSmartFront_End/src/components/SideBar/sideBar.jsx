import React from "react";
import "./sideBar.scss";

// local imports
import TextHeader from "../TextHeader/textHeader";
import ismart from "../../assets/images/iSmart.svg";

// external imports
import { Link } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { BsHourglassSplit } from "react-icons/bs";
import { BsFillEvStationFill } from "react-icons/bs";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { GiCash } from "react-icons/gi";
import { MdPayment } from "react-icons/md";

const iconStyles = {
  position: "absolute",
  left: "0.5rem",
  top: "0.9rem",
};

function SideBar({ active }) {
  return (
    <div className="side-bar">
      {/* <TextHeader level="big" value="iSmart" /> */}
      <img className="logo" src={ismart} alt="ismart logo" width="125px" />

      <ul className="side-bar-menu">
        <li>
          <Link className={active === "dashboard" ? "active" : ""} to="/">
            <RiDashboardFill style={iconStyles} />
            <span className="title">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            className={active === "charge-points" ? "active" : ""}
            to="/charge-points"
          >
            <BsFillEvStationFill style={iconStyles} />
            <span className="title">Charge Points</span>
          </Link>
        </li>
        <li>
          <Link
            className={active === "sessions" ? "active" : ""}
            to="/sessions"
          >
            <BsHourglassSplit style={iconStyles} />
            <span className="title">Sessions</span>
          </Link>
        </li>
        <li>
          <Link
            className={active === "transaction" ? "active" : ""}
            to="/transaction"
          >
            <AiOutlineTransaction style={iconStyles} />
            <span className="title">Transaction</span>
          </Link>
        </li>
        <li>
          <Link
            className={active === "reservation" ? "active" : ""}
            to="/reservation"
          >
            <BsFillCalendarCheckFill style={iconStyles} />
            <span className="title">Reservation</span>
          </Link>
        </li>
        <li>
          <Link className={active === "users" ? "active" : ""} to="/users">
            <HiUsers style={iconStyles} />
            <span className="title">Users</span>
          </Link>
        </li>
        <li>
          <Link className={active === "groups" ? "active" : ""} to="/groups">
            <HiUsers style={iconStyles} />
            <span className="title">Groups</span>
          </Link>
        </li>
        <li>
          <Link className={active === "tarrifs" ? "active" : ""} to="/tarrifs">
            <GiCash style={iconStyles} />
            <span className="title">Tarrifs</span>
          </Link>
        </li>
        <li>
          <Link
            className={active === "payment-methods" ? "active" : ""}
            to="/payment-methods"
          >
            <MdPayment style={iconStyles} />
            <span className="title">Payment Methods</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
