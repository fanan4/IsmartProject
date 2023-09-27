import React, { useContext, useEffect, useState } from "react";
import "./tableRow.scss";

// external components
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";

// local components
import DropDown from "../DropDown/dropDown";

const dropDownStyles = {
  visibility: "visible",
  opacity: "1",
};

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const getTransactionTime = (timestamp, status, setDuration) => {
  if (
    status?.toLowerCase() === "charging" ||
    status?.toLowerCase() === "active"
  ) {
    const date = new Date(timestamp);
    const now = new Date();
    const timeDiff = (now - date) / 1000;
    setDuration(formatTime(Math.round(timeDiff)));   
  }
};

function TableRow({
  data,
  header,
  width,
  last,
  remove,
  onClickDelete,
  itemwidth,
  excludedKeys,
  detailsRoute,
}) {
  const [hover, setHover] = useState(false);
  const [duration, setDuration] = useState(data["duration"]);
  const dataKeys = Object.keys(data);
  const filtered = dataKeys.filter((key) => !excludedKeys?.includes(key));

  useEffect(() => {
    setInterval(() => {
      getTransactionTime(data["timestamp"], data["status"], setDuration);
    }, 1000);
  }, []);

  return (
    <div
      className={header ? "table-header table-row" : "table-row"}
    >
      {filtered.map((item, idx) => {
        if (
          item === "duration" &&
          !header &&
          (data["status"]?.toLowerCase() === "charging" ||
            data["status"]?.toLowerCase() === "active")
        ) {
          return (
            <span className="table-data" key={idx}>
              {duration}
            </span>
          );
        } else if (item === "status" && !header) {
          return (
            <span className="table-data" key={idx}>
              <span className={`status ${data[item]?.toLowerCase()}`}>
                <RxDotFilled size={16} />
                {data[item]}
              </span>
            </span>
          );
        } else if (item === "chargerId" && !header) {
          return (
            <span className="table-data" key={idx} style={{width : itemwidth}}>
              <Link className="link" to={`/charge-points/${data[item]}`}>
                #{data[item]}
              </Link>
            </span>
          );
        } else if (item === "userId" && !header) {
          return (
            <span className="table-data" key={idx}>
              <Link className="link" to={`/users/${data[item]}`}>
                #{data[item]}
              </Link>
            </span>
          );
        } else {
          return (
            <span className="table-data" key={idx}>
              {data[item]}
            </span>
          );
        }
      })}
 <div style={{width: "2rem"}}> </div>
      {header ? null : !remove ? (
        <BsThreeDotsVertical
          className="icon"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      ) : (
        <RiDeleteBinLine
          size={16}
          className="icon delete"
          onClick={() => onClickDelete(data._id)}
        />
      )}

      <DropDown
        top={last ? "-3.5rem" : "2rem"}
        styles={hover ? dropDownStyles : null}
      >
         <Link to={`/${detailsRoute}/${data._id}`} className="child">
           Details
         </Link>
         <span onClick={() => onClickDelete(data._id)} className="child delete">
           Delete
         </span>
      </DropDown> 
    </div>
  );
}

export default TableRow;
